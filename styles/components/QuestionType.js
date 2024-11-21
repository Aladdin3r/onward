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

export default function QuestionType({ selectedQuestionType, setSelectedQuestionType }) {
    return(
        <>
        <Card 
            width={{ base: "30rem", sm:"32rem", lg:"40rem", xl: "38rem", "2xl":"50rem"}} 
            borderRadius="15px" 
            boxShadow="md"
        >
            <CardBody>
                <Flex direction={"column"} p={3}>
                    <Text 
                        fontFamily="heading" 
                        fontWeight="bold" 
                        fontSize={{ base: "xxs", md: "xxxs", lg:"xxs", xl: "16pt" }} 
                        textAlign="left"
                    >
                        Type of Questions
                    </Text>
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
                                <Checkbox size={"lg"} my={3} value="Behavioural">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} value="Behavioural">Behavioural Questions</Text>
                                </Checkbox>
                                <Checkbox size={"lg"} my={3} value="Situational">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} >Situational Questions</Text>
                                </Checkbox>
                                <Checkbox size={"lg"} my={3} value="Technical">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} >Technical Questions</Text>
                                </Checkbox>
                                <Checkbox size={"lg"} my={3} value="Competency">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} >Competency Questions</Text>
                                </Checkbox>
                            </Box>
                            <Box flex="1">
                                <Checkbox size={"lg"} my={3} value="Cultural">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}}>Cultural Questions</Text>
                                </Checkbox>
                                <Checkbox size={"lg"} my={3} value="Career Goals">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} >Career Goals Questions</Text>
                                </Checkbox>
                                <Checkbox size={"lg"} my={3} value="Regulations">
                                    <Text fontSize={{base: "xxxs", "2xl":"xs"}} >Legal / Regulation Questions</Text>
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