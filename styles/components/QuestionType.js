import { 
    Checkbox, 
    CheckboxGroup,
    Box,
    Flex,
    Text,
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';

export default function QuestionType({ selectedQuestionType, setSelectedQuestionType }) {

    const [isAllSelected, setIsAllSelected] = useState(false); 
    const allOptions = [ 
        "Behavioural",
        "Situational",
        "Technical",
        "Competency",
        "Cultural",
        "Career Goals",
        "Regulations",
        "General Interview"
    ];

    useEffect(() => { 
        if (selectedQuestionType.length === allOptions.length) {
            setIsAllSelected(true);
        } else {
            setIsAllSelected(false);
        }
    }, [selectedQuestionType]);

    const handleAllChange = () => {
        if (isAllSelected) {
           
            setSelectedQuestionType([]);
        } else {
            setSelectedQuestionType(allOptions);
        }
        setIsAllSelected(!isAllSelected);
    };


    return(
        <>
        <Card 
            width={{ base: "30rem", sm:"32rem", lg:"40rem", xl: "38rem", "2xl":"50rem"}} 
            borderRadius="15px" 
            boxShadow="md"
        >
            <CardBody>
                <Flex direction={"column"} p={3}>
                    <Flex
                        direction={{ base: "row"}}
                        padding={4}
                        gap={4} 
                        >
                        <Text 
                            fontFamily="heading" 
                            fontWeight="bold" 
                            fontSize={{ base: "xxs", md: "xxxs", lg:"xxs", xl: "16pt" }} 
                            textAlign="left"
                            flex={1}
                        >
                            Type of Questions
                        </Text>
                        <Checkbox size={"md"} my={3} value="All" 
                            isChecked={isAllSelected}
                            onChange={handleAllChange}
                            variant={"subtle"}>
                            <Text fontSize={{base: "xxxs", "2xl":"xxxs"}} value="All">
                                All
                            </Text>
                        </Checkbox>
                    </Flex>
                    <CheckboxGroup
                        value={selectedQuestionType}
                        onChange={(values) => {
                            console.log("Selected Question Types:", values);
                            setSelectedQuestionType(values);
                        }}
                    >
                        <Flex 
                            direction={{ base: "row"}}
                            padding={4}
                            gap={4} 
                            justify={"center"}
                        >
                            <Box flex="1" >
                                <Checkbox size={"lg"} my={3} value="Behavioural Question">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} value="Behavioural">Behavioural Questions</Text>
                                </Checkbox>
                                <Checkbox size={"lg"} my={3} value="Situational Question">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} >Situational Questions</Text>
                                </Checkbox>
                                <Checkbox size={"lg"} my={3} value="Technical Question">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} >Technical Questions</Text>
                                </Checkbox>
                                <Checkbox size={"lg"} my={3} value="Competency Question">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} >Competency Questions</Text>
                                </Checkbox>
                            </Box>
                            <Box flex="1">
                                <Checkbox size={"lg"} my={3} value="Cultural Question">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}}>Cultural Questions</Text>
                                </Checkbox>
                                <Checkbox size={"lg"} my={3} value="Career Goals Question">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} >Career Goals Questions</Text>
                                </Checkbox>
                                <Checkbox size={"lg"} my={3} value="Regulations Question">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} >Legal / Regulation Questions</Text>
                                </Checkbox>
                                <Checkbox size={"lg"} my={3} value="Common Interview Question">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} >Common Interview Questions</Text>
                                </Checkbox>
                            </Box>
                        </Flex>
                    </CheckboxGroup>
                </Flex>
            </CardBody>
        </Card>
        </>
    )
}