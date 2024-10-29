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

export default function QuestionPractice({ borderRad }) {

    const router = useRouter();
    const [currentCategoryIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Function to get the current question
    const currentQuestionText = interviewQuestions[currentCategoryIndex].questions[currentQuestionIndex];

    const handleNextQuestion = () => {
        // Move to the next question, looping back to the first if at the end
        setCurrentQuestionIndex((prevIndex) => 
            (prevIndex + 1) % interviewQuestions[currentCategoryIndex].questions.length
        );
    };

    return (
        <>
        <Box>
            <Card borderRadius={borderRad}>
                <CardBody textAlign={"left"}>
                    <Stack spacing='4' divider={<StackDivider />}>
                        <Box>
                            <Heading size='md'>
                                Situational Question
                                {/* {interviewQuestions[currentCategoryIndex].category} */}
                            </Heading>
                        </Box>
                        <Box>
                            <Text pt='2' fontSize='xxs'>
                                {/* placeholder */}
                                Can you describe a time when you were faced with an emergency situation and had to make a quick decision? 
                                How did you prioritize tasks, and what steps did you take to ensure the best possible outcome for the patient?
                                {/* {currentQuestionText} */}
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
        </>
    );
}
