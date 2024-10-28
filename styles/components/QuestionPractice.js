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

export default function QuestionPractice() {

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
            <Card width="70%" mx="auto">
                <CardBody textAlign={"left"}>
                    <Stack spacing='4' divider={<StackDivider />}>
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
                    </Stack>
                </CardBody>
            </Card>
        </>
    );
}
