
import { 
    Box,
    Flex,
    Text,
    Card, 
    CardBody, 
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

export default function QuestionTime({ selectedNumber, onNumberChange, selectedLength, onLengthChange }) {
    return(
        <>
        <Card 
            width={{ base: "30rem", sm:"32rem", lg:"40rem", xl: "20rem", "2xl":"30rem"}} 
            height={"16rem"}
            borderRadius="15px" 
            boxShadow="md"
            >
            <CardBody>
                <Flex direction={"column"} gap={5} p={3} alignItems={"center"} justifyContent={"center"}>

                    {/* number of questions */}
                    <Box>
                        <Text 
                            fontFamily="heading" 
                            fontSize={{ base: "xxs", md: "xxs", xl: "16pt" }} 
                            fontWeight="bold" 
                            textAlign="left"
                            pb="1em"
                        >
                            Number of Questions
                        </Text>
                        <Box>
                            <NumberInput defaultValue={5} min={1} max={30}
                                w={{ base: "25rem", sm:"27rem", lg:"35rem", xl: "15rem", "2xl":"25rem"}}
                                value={selectedNumber}
                                onChange={(valueString, valueNumber) => onNumberChange(valueNumber)}
                            >
                                <NumberInputField fontSize={{base: "xxs", md: "xxs", xl: "16pt"}} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Box>
                    </Box>

                    {/* time / length */}
                    <Box>
                        <Text 
                            fontFamily="heading" 
                            fontSize={{ base: "xxs", md: "xxs", xl: "16pt" }} 
                            fontWeight="bold" 
                            textAlign="left"
                        >
                            Length of Interview
                        </Text>
                            <Box>
                                <NumberInput defaultValue={10} min={1} max={30}
                                    w={{ base: "25rem", sm:"27rem", lg:"35rem", xl: "15rem", "2xl":"25rem"}}
                                    value={selectedLength}
                                    onChange={(valueString, valueNumber) => onLengthChange(valueNumber)}
                                >
                                    <NumberInputField fontSize={{base: "xxs", md: "xxs", xl: "16pt"}} />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Box>
                    </Box>
                </Flex>
            </CardBody>
        </Card>
        </>
    )
}