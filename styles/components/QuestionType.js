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

export default function QuestionType() {
    return(
        <>
        <Card 
            width={{ base: "30rem", sm:"32rem", lg:"40rem", xl: "38rem", "2xl":"55rem"}} 
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
                    <Flex 
                        direction={{ base: "row"}}
                        padding={4}
                        gap={4} 
                        justify={"center"}
                    >
                        <Box flex="1" >
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={{base: "xxxs", "2xl":"xs"}}>Behavioural Questions</Text>
                            </Checkbox>
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={{base: "xxxs", "2xl":"xs"}}>Situational Questions</Text>
                            </Checkbox>
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={{base: "xxxs", "2xl":"xs"}}>Technical Questions</Text>
                            </Checkbox>
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={{base: "xxxs", "2xl":"xs"}}>Competency Questions</Text>
                            </Checkbox>
                        </Box>
                        <Box flex="1">
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={{base: "xxxs", "2xl":"xs"}}>Cultural Questions</Text>
                            </Checkbox>
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={{base: "xxxs", "2xl":"xs"}}>Career Goals Questions</Text>
                            </Checkbox>
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={{base: "xxxs", "2xl":"xs"}}>Legal / Regulation Questions</Text>
                            </Checkbox>
                        </Box>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
        </>
    )
}