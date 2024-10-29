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
