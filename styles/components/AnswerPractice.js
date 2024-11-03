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
    Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import VideoPlayer from './VideoPlayer';
import QuestionPractice from './QuestionPractice';
import { Stop, Record, Pause } from '@phosphor-icons/react';

export default function AnswerPractice({ videoSrc, thumbnail}) {
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false); // default is text
    const [activeButton, setActiveButton] = useState('');

    const handleVoiceClick = () => {
        setShowVideo(true);
        setActiveButton('voice');
    };

    const handleTextClick = () => {
        setShowVideo(false);
        setActiveButton('text');
    };

    return (
        <>
            <Flex 
                flexDirection="row" 
                gap="2rem" 
                mx="auto" 
                maxH={"80%"}
                justifyContent="center" 
                alignItems="flex-start" 
                width="100%"
                maxWidth={showVideo ? "100%" : "60%"} 
            >
                {/* question and answer section */}
                <Box 
                    width="100%"
                    maxW={showVideo ? '60%' : '100%'} 
                    transition="width 0.3s ease"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <QuestionPractice 
                        showArrows={false}
                        borderTopRadius={15}
                        borderBottomRadius={0}
                        width="100%"
                    />
                    <Flex 
                        gap="1.1rem" 
                        p="4" 
                        bg="brand.pureWhite" 
                        borderRadiusBottom={15} 
                        boxShadow="md" 
                        mb={0} 
                        position="relative" 
                        zIndex={1}
                        flexDirection="column"
                        divider={<StackDivider />}
                        width={"100%"}
                    >
                        <Heading size="md" textAlign="left">Response Type:</Heading>
                        <Divider orientation="horizontal" mb={4} />
                        
                        <Flex flexDirection="row" gap="2rem">
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
                        maxH="35rem"
                        width="100%"
                    >
                        {/* Answer section */}
                        <Card borderRadius="15" textAlign="left">
                            <CardBody>
                                <Stack spacing="4" divider={<StackDivider />}>
                                    <Box>
                                        <Heading size="md" height="2rem">Transcript:</Heading>
                                    </Box>
                                    
                                    {/* Answer Box */}
                                    <Box overflowY="auto" height="10rem" w="100%">
                                        <Text pt="2" fontSize="xs">
                                            Um, in my previous role as a nurse in the ER, there was this one time when, 
                                            like, a patient came in with chest pain, and we thought it might be a heart attack. 
                                            At the same time, uh, another patient had a severe allergic reaction. So, I had to, like, 
                                            figure out who needed help faster.
                                            <br/>
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
                
                {/* video Section */}
                {showVideo && (
                    <Flex 
                        flexDirection={"column"}
                        width="40%" 
                        py={"2rem"}
                        boxShadow="md" 
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderRadius={15}
                    >
                        <VideoPlayer 
                            videoSrc={videoSrc} 
                            thumbnail="/images/smiling-girl.png" 
                        />
                        <Flex>
                            <Button><Record size={24} /></Button>
                            <Button><Stop size={24} /></Button>
                            <Button><Pause size={24} /></Button>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </>
    );
}
