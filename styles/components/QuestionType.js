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
        <Card width="45vw" borderRadius="15px" boxShadow="md">
            <CardBody>
                <Flex direction={"column"}>
                    <Text fontFamily="heading" fontSize="x" fontWeight="bold" textAlign="left">
                        Type of Questions
                    </Text>
                    <Flex 
                        direction={{ base: "row"}}
                        padding={4}
                        gap={4} 
                        justify={"center"}
                    >
                        <Box flex="1">
                            <Checkbox size={"sm"}>
                                <Text fontSize={"xxs"}>Behavioural Questions</Text>
                            </Checkbox>
                            <Checkbox size={"sm"}>
                                <Text fontSize={"xxs"}>Situational Questions</Text>
                            </Checkbox>
                            <Checkbox size={"sm"}>
                                <Text fontSize={"xxs"}>Technical Questions</Text>
                            </Checkbox>
                            <Checkbox size={"sm"}>
                                <Text fontSize={"xxs"}>Competency Questions</Text>
                            </Checkbox>
                        </Box>
                        <Box flex="1">
                            <Checkbox size={"sm"}>
                                <Text fontSize={"xxs"}>Cultural Questions</Text>
                            </Checkbox>
                            <Checkbox size={"sm"}>
                                <Text fontSize={"xxs"}>Career Goals Questions</Text>
                            </Checkbox>
                            <Checkbox size={"sm"}>
                                <Text fontSize={"xxs"}>Legal / Regulation Questions</Text>
                            </Checkbox>

                        </Box>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
        </>
    )
}