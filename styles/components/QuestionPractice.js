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

    // return (
    //     <>
    //         <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
    //             <Card 
    //                 borderTopRadius={borderTopRadius}
    //                 borderBottomRadius={borderBottomRadius}
    //                 w={questionWidth}
    //                 m={0}
    //                 p={0}>
    //                 <CardBody textAlign={"left"}>
    //                     <Stack spacing='4' divider={<StackDivider />}>
    //                         <Box>
    //                             <Heading size='18pt'>
    //                                 {questionType[currentQuestionIndex % questionType.length]} 
    //                             </Heading>
    //                         </Box>
    //                         <Box>
    //                             <Text pt='2' fontSize='18pt'>
    //                                 {questions[currentQuestionIndex]}
    //                             </Text>
    //                         </Box>
    //                     </Stack>
    //                 </CardBody>
    //             </Card>

    //             {/* conditionally show the arrow buttons so can be hidden in answer page */}
    //             {showArrows && (
    //                 <Flex alignItems={"center"} py={5}>
    //                     <Button onClick={handlePreviousQ} backgroundColor={"transparent"} size={"sm"}>{`<`}</Button>
    //                     <Text mx={"3rem"}>{`${currentQuestionIndex + 1}/${totalQuestions}`}</Text>
    //                     <Button onClick={handleNextQ} backgroundColor={"transparent"} size={"sm"}>{`>`}</Button>
    //                 </Flex>
    //             )}
    //         </Flex>
    //     </>

    return (
        <>
            <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <Card 
                    borderRadius="15px"
                    w={questionWidth}
                    m={0}
                    p={0}>
                    <CardBody textAlign={"left"}>
                        <Stack spacing='4'>
                            <Box>
                            <Select size="sm" width="400px" height="50px">
                                <option value="Situational">Situational Question</option>
                                <option value="Behavioral">Behavioral Questions</option>
                                <option value="Technical">Technical Questions</option>
                                <option value="Competency">Competency Questions</option>
                                <option value="Cultural">Cultural Questions</option>
                                <option value="Career Goals">Career Goals Questions</option>
                                <option value="Legal / Regulation">Legal / Regulation Questions</option>
                            </Select>
                            </Box>
                            <Box>
                                <Text pt='2' fontSize='18pt'>
                                    {questions[currentQuestionIndex]}
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                    <Box 
                        bg="#EBEFFF"
                        height="70px"
                        display="flex" 
                        alignItems="center" 
                        justifyContent="flex-end" 
                        paddingRight="16px"
                        borderBottomRadius="15px"
                        >
                            <Button bg="#E6EAF2" width="172px" height="50px" borderRadius="5px">Next</Button>
                    </Box>
                </Card>
            </Flex>
        </>
    );
}
