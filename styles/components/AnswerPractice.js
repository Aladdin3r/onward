"use client";
import { 
    Box,
    Flex,
    Text,
    Card, 
    CardBody, 
    Stack,
    StackDivider,
    Heading,
    Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import interviewQuestions from '@/data/interviewQuestions'; 
import VideoPlayer from './VideoPlayer';
import QuestionPractice from './QuestionPractice';

export default function AnswerPractice() {
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false); // Default is text
    const [activeButton, setActiveButton] = useState('');

    const handleVoiceClick = () => {
        setShowVideo(true);
        setActiveButton('voice');
    };

    const handleTextClick = () => {
        setShowVideo(false);
        setActiveButton('text');
    };

    // const handleNextQuestion = () => {
    //     // Move to the next question, looping back to the first if at the end
    //     setCurrentQuestionIndex((prevIndex) => 
    //         (prevIndex + 1) % interviewQuestions[currentCategoryIndex].questions.length
    //     );
    // };

    return (
        <>
            <Flex mx="auto" flexDirection="row" gap="2rem">
                <Box maxW={showVideo ? '60%' : '100%'} transition="width 0.3s ease" borderRadiusTop={15} mx="auto">
                    <QuestionPractice />
                    <Flex 
                        gap="1.1rem" 
                        p="4" 
                        bg="brand.pureWhite" 
                        borderRadiusBottom={15} 
                        boxShadow="md" 
                        mb={0} 
                        position="relative" 
                        zIndex={1}
                        flexDirection={"column"}
                    >
                        <Heading size="md" textAlign={"left"}>Response Type:</Heading>
                        <Flex flexDirection={"row"} gap="2rem">
                            <Button 
                                width="7rem" 
                                onClick={handleVoiceClick}
                                bg={activeButton === 'voice' ? 'brand.oceanBlue' : 'brand.pureWhite'}
                                color={activeButton === 'voice' ? 'brand.pureWhite' : 'brand.oceanBlue'}
                                borderColor="brand.oceanBlue" 
                                border="1px" 
                                _hover={{ boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)' }}
                            >
                                <Text fontSize="xxs">Voice</Text>
                            </Button>
                            <Button 
                                width="7rem" 
                                onClick={handleTextClick}
                                bg={activeButton === 'text' ? 'brand.oceanBlue' : 'brand.pureWhite'}
                                color={activeButton === 'text' ? 'brand.pureWhite' : 'brand.oceanBlue'}
                                borderColor="brand.oceanBlue" 
                                border="1px" 
                                _hover={{ boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)' }}
                            >
                                <Text fontSize="xxs">Text</Text>
                            </Button>
                        </Flex>
                    </Flex>
                    
                    <Box
                        p="4"
                        bg="brand.blueberryCreme"
                        boxShadow="md"
                        mb={0}
                        position="relative"
                        zIndex={1}
                        borderBottomRadius={15}
                        maxH="15rem"
                    >
                        {/* Answer section */}
                        <Card borderRadius="15" textAlign="left">
                            <CardBody>
                                <Stack spacing="4" divider={<StackDivider />}>
                                    <Box>
                                        <Heading size="md" height="2rem">Transcript:</Heading>
                                    </Box>
                                    
                                    {/* Answer Box */}
                                    <Box overflowY="auto" maxH="5rem" w="100%">
                                        <Text pt="2" fontSize="xxs">
                                            Um, in my previous role as a nurse in the ER, there was this one time when, 
                                            like, a patient came in with chest pain, and we thought it might be a heart attack. 
                                            At the same time, uh, another patient had a severe allergic reaction. So, I had to, like, 
                                            figure out who needed help faster.
                                            I quickly checked the chest pain patient and told the doctor to start treatment while I, uh,
                                            helped the allergic reaction patient by giving them epinephrine and, like, monitoring their breathing. 
                                            I stayed with them until they were stable.
                                            <br/>
                                            I, um, made sure to communicate with my team, and, uh, even though it was urgent, I stayed calm. 
                                            In the end, both patients got the care they needed, so, uh, yeah, it worked out okay.
                                        </Text>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Box>
                </Box>
                
                <Box width="45%">
                    {showVideo && <VideoPlayer />}
                </Box>
            </Flex>
        </>
    );
}
