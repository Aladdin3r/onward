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
    HStack,
    Select
} from '@chakra-ui/react';
import interviewQuestions from '@/data/interviewQuestions'; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function QuestionPractice({ questions = [], questionTypes = [], question, borderTopRadius, borderBottomRadius, questionWidth }) {

    // Speak the question when it is displayed
    useEffect(() => {
        if (question && 'speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(question.question || question);
            speechSynthesis.speak(speech);
        }
    }, [question]);

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
                            <Stack spacing="4" divider={<StackDivider />}>
                                {/* Handle single question or multiple questions */}
                                {question ? (
                                    /* Single question display */
                                    <Box>
                                        <Heading size={{ base:"12pt", md: "16pt", "2xl": "18pt" }}>
                                            {question.category || "General Question"}
                                        </Heading>
                                        <Text pt="2" fontSize="18pt">
                                            {question.question || "No question text available"}
                                        </Text>
                                    </Box>
                                ) : questions && questions.length > 0 ? (
                                    questions.map((q, index) => (
                                        <Box key={index}>
                                            {/* Display question type */}
                                            <Heading size="18pt">
                                                {q.category || questionTypes[index] || "General Question"}
                                            </Heading>
                                            {/* Display question */}
                                            <Text pt="2" fontSize="18pt">
                                                {q.question || q} {/* Handles both string and object cases */}
                                            </Text>
                                        </Box>
                                    ))
                                ) : (
                                    <Text pt="2" fontSize="18pt">No questions available. Please try again.</Text>
                                )}
                            </Stack>
                        </CardBody>
                </Card>

                {/* conditionally show the arrow buttons so can be hidden in answer page */}
                {/* {showArrows && (
                    <Flex alignItems={"center"} py={5}>
                        <Button onClick={handlePreviousQ} backgroundColor={"transparent"} size={"sm"}>{`<`}</Button>
                        <Text mx={"3rem"}>{`${currentQuestionIndex + 1}/${totalQuestions}`}</Text>
                        <Button onClick={handleNextQ} backgroundColor={"transparent"} size={"sm"}>{`>`}</Button>
                    </Flex>
                )} */}
            </Flex>
        </>
    );
}
