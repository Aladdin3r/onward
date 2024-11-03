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
        <Card width="40vw" borderRadius="15px" boxShadow="md">
            <CardBody>
                <Flex direction={"column"}>
                    <Text fontFamily="heading" fontWeight="bold" fontSize={"sm"} textAlign="left">
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
                                <Text fontSize={"xs"}>Behavioural Questions</Text>
                            </Checkbox>
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={"xs"}>Situational Questions</Text>
                            </Checkbox>
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={"xs"}>Technical Questions</Text>
                            </Checkbox>
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={"xs"}>Competency Questions</Text>
                            </Checkbox>
                        </Box>
                        <Box flex="1">
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={"xs"}>Cultural Questions</Text>
                            </Checkbox>
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={"xs"}>Career Goals Questions</Text>
                            </Checkbox>
                            <Checkbox size={"lg"} my={3}>
                                <Text fontSize={"xs"}>Legal / Regulation Questions</Text>
                            </Checkbox>
                        </Box>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
        </>
    )
}