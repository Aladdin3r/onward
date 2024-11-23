import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Flex,
    Text,
    Card,
    CardBody,
    Stack,
    StackDivider,
    Divider,
    Heading,
    Button,
    Textarea,
} from '@chakra-ui/react';
import QuestionPractice from './QuestionPractice';
import RecordCamera from './Camera';
import Transcriber from './Transcriber';
import { supabase } from '@/lib/supabaseClient';

export default function AnswerPractice({ onShowVideoChange, question }) {
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false); // Video response
    const [activeButton, setActiveButton] = useState('text'); // Default is text response
    const [isRecording, setIsRecording] = useState(false);
    const [editableTranscription, setEditableTranscription] = useState('');
    const [transcription, setTranscription] = useState('');
    const [savedVideoUrl, setSavedVideoUrl] = useState(null);
    const [defaultVoice, setDefaultVoice] = useState(null);

    useEffect(() => {
        // Initialize the default voice as "Google US English"
        const voicesList = speechSynthesis.getVoices();
        const googleUSVoice = voicesList.find(voice => voice.name === "Google US");
        if (googleUSVoice) {
            setDefaultVoice(googleUSVoice);
        }
    }, []);

    const handleVoiceClick = () => {
        setShowVideo(true);
        setActiveButton('voice');
        setIsRecording(!isRecording); // Toggle recording state
        onShowVideoChange(true);
    };

    const handleTextClick = () => {
        setShowVideo(false);
        setActiveButton('text');
        setEditableTranscription(transcription); // Switch to editable transcription
        onShowVideoChange(false);
    };

    const handleEditableChange = (event) => {
        setEditableTranscription(event.target.value); // Update text area content
    };

    const handleAnalysisClick = async () => {
        const videoURL = savedVideoUrl;
        const transcriptionText = transcription;

        const transcriptionEntry = { text: transcriptionText, video_id: videoURL };
        const { error } = await supabase.from('transcriptions').insert(transcriptionEntry);

        if (error) throw error;

        router.push({ pathname: '/practiceOverview' });
    };

    return (
        <>
            <Flex
                flexDirection="row"
                gap="2rem"
                mx="auto"
                justifyContent="center"
                alignItems="flex-start"
                width="100%"
                maxWidth={showVideo ? '100%' : '60%'}
            >
                {/* Question and Answer Section */}
                <Box
                    width="100%"
                    maxW={showVideo ? '60%' : '100%'}
                    transition="width 0.3s ease"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    {/* Display Question */}
                    <QuestionPractice question={question} />
                    <Flex
                        gap="1.1rem"
                        p="4"
                        bg="brand.pureWhite"
                        borderRadiusBottom={15}
                        boxShadow="md"
                        flexDirection="column"
                        divider={<StackDivider />}
                        width="100%"
                    >
                        <Heading size="18pt" textAlign="left">Response Type:</Heading>
                        <Divider orientation="horizontal" mb={4} />

                        {/* Response Type Buttons */}
                        <Flex flexDirection="row" gap="2rem">
                            <Button
                                width={isRecording ? '10rem%' : '7rem'}
                                onClick={handleVoiceClick}
                                bg={activeButton === 'voice' ? 'brand.oceanBlue' : 'brand.pureWhite'}
                                color={activeButton === 'voice' ? 'brand.pureWhite' : 'brand.oceanBlue'}
                                borderColor="brand.oceanBlue"
                                border="1px"
                                _hover={{
                                    boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                                }}
                            >
                                <Text fontSize="xxs">
                                    {isRecording ? 'Stop Recording' : 'Voice'}
                                </Text>
                            </Button>
                            <Button
                                width="7rem"
                                onClick={handleTextClick}
                                bg={activeButton === 'text' ? 'brand.oceanBlue' : 'brand.pureWhite'}
                                color={activeButton === 'text' ? 'brand.pureWhite' : 'brand.oceanBlue'}
                                borderColor="brand.oceanBlue"
                                border="1px"
                                _hover={{
                                    boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                                }}
                            >
                                <Text fontSize="xxs">Text</Text>
                            </Button>
                            <Transcriber
                                isRecording={isRecording}
                                setTranscription={setTranscription}
                                setEditableTranscription={setEditableTranscription}
                                defaultVoice={defaultVoice} // Pass default voice to Transcriber
                            />
                        </Flex>
                    </Flex>

                    {/* Answer Section */}
                    <Box
                        p="4"
                        bg="brand.blueberryCreme"
                        boxShadow="md"
                        borderBottomRadius={15}
                        maxH="35rem"
                        width="100%"
                    >
                        <Card borderRadius="15" textAlign="left">
                            <CardBody>
                                <Stack spacing="4" divider={<StackDivider />}>
                                    <Box>
                                        <Heading size="18pt">Your Response:</Heading>
                                    </Box>
                                    {/* Answer Box */}
                                    <Box overflowY="auto" height="10rem" w="100%">
                                        {activeButton === 'text' ? (
                                            <Textarea
                                                value={editableTranscription}
                                                onChange={handleEditableChange}
                                                placeholder="Type your answer here"
                                                size="sm"
                                                height="10rem"
                                                resize="vertical"
                                            />
                                        ) : (
                                            <Text pt="2" fontSize="14pt">
                                                {transcription}
                                            </Text>
                                        )}
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Box>
                </Box>

                {/* Video Section */}
                {showVideo && (
                    <Flex
                        flexDirection="column"
                        width="60%"
                        py="2rem"
                        boxShadow="md"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius={15}
                    >
                        <RecordCamera setSavedVideoUrl={setSavedVideoUrl} />
                        <Button
                            bg="brand.blushPink"
                            size="xs"
                            color="white"
                            py="1.5rem"
                            px="5rem"
                            boxShadow="md"
                            onClick={handleAnalysisClick}
                            _hover={{
                                bg: 'white',
                                color: 'brand.blushPink',
                                border: '1px',
                                boxShadow: 'md',
                            }}
                        >
                            Start Analysis
                        </Button>
                    </Flex>
                )}
            </Flex>
        </>
    );
}
