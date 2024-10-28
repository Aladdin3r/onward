"use client"
import { 
    Box,
    Flex,
    Text,
    Card, 
    CardBody, 
    CardFooter,
    Stack,
    StackDivider,
    Heading,
    Button
} from '@chakra-ui/react';
import interviewQuestions from '@/data/interviewQuestions'; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import VideoContainer from './VideoContainer';

export default function QuestionPractice() {

    const router = useRouter();
    const [currentCategoryIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Function to get the current question
    const currentQuestionText = interviewQuestions[currentCategoryIndex].questions[currentQuestionIndex];

    // handle video box display
    const [showVideo, setShowVideo] = useState(false) // default is text

    const handleVoiceClick = () => {
        setShowVideo(true);
    };

    const handleTextClick = () => {
        setShowVideo(false);
    };

    const handleNextQuestion = () => {
        // Move to the next question, looping back to the first if at the end
        setCurrentQuestionIndex((prevIndex) => 
            (prevIndex + 1) % interviewQuestions[currentCategoryIndex].questions.length
        );
    };

    return (
        <>
            <Card  bg="brand.blueberryCreme"
                // changes width depends on if video shows or not
                maxW={showVideo ? '60%' : '100%'} // Adjust width based on showVideo
                transition="width 0.3s ease" // Optional transition for smoothness
            >
                <CardBody textAlign={"left"} >
                    <Stack spacing='3' divider={<StackDivider />}>
                        <Box>
                            <Heading size='xxs'>
                                {interviewQuestions[currentCategoryIndex].category}
                            </Heading>
                        </Box>
                        <Box>
                            <Text pt='2' fontSize='xxs'>
                                {currentQuestionText}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xxs'>
                                 Response Type
                            </Heading>
                            <Flex gap={"2rem"}>
                                <Button size={"xxs"} onClick={handleVoiceClick}>Voice</Button>
                                <Button size={"xxs"} onClick={handleTextClick}>Text</Button>
                            </Flex>
                        </Box>
                        <Box>
                            <Card width="100%" maxW="40rem" mx="auto">
                                <CardBody>
                                    <Stack spacing='4' divider={<StackDivider />}>
                                        <Box>
                                            <Heading size='xxs'>
                                                Transcript:
                                            </Heading>
                                        </Box>

                                        {/* Answer Box */}
                                        <Box overflowY="auto" maxH={"10rem"}>
                                            <Text pt='2' fontSize='xxs'>
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
                                        <Box>
                                            
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>

        {showVideo && <VideoContainer />}
        </>
    );
}