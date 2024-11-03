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
    Button,
    HStack
} from '@chakra-ui/react';
import interviewQuestions from '@/data/interviewQuestions'; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function QuestionPractice({ showArrows, borderTopRadius, borderBottomRadius, questionWidth }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const questionType = [
        "Situational Question",
        "Technical Question"
    ];

    const questions = [
        "Can you describe a time when you were faced with an emergency situation and had to make a quick decision? How did you prioritize tasks, and what steps did you take to ensure the best possible outcome for the patient?",
        "Can you explain the process you would follow when a patient arrives in the emergency department with chest pain? What assessments and interventions would you prioritize?"
    ];

    const totalQuestions = questions.length;

    const handleNextQ = () => {
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    const handlePreviousQ = () => {
        setCurrentQuestionIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
    };

    return (
        <>
            <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <Card 
                    borderTopRadius={borderTopRadius}
                    borderBottomRadius={borderBottomRadius}
                    w={questionWidth}
                    m={0}
                    p={0}>
                    <CardBody textAlign={"left"}>
                        <Stack spacing='4' divider={<StackDivider />}>
                            <Box>
                                <Heading size='md'>
                                    {questionType[currentQuestionIndex % questionType.length]} 
                                </Heading>
                            </Box>
                            <Box>
                                <Text pt='2' fontSize='sm'>
                                    {questions[currentQuestionIndex]}
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>

                {/* conditionally show the arrow buttons so can be hidden in answer page */}
                {showArrows && (
                    <Flex alignItems={"center"} py={5}>
                        <Button onClick={handlePreviousQ} backgroundColor={"transparent"} size={"sm"}>{`<`}</Button>
                        <Text mx={"3rem"}>{`${currentQuestionIndex + 1}/${totalQuestions}`}</Text>
                        <Button onClick={handleNextQ} backgroundColor={"transparent"} size={"sm"}>{`>`}</Button>
                    </Flex>
                )}
            </Flex>
        </>
    );
}
