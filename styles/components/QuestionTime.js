
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
    Checkbox,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'

export default function QuestionTime({ selectedNumber, onNumberChange, selectedLength, onLengthChange }) {
    return(
        <>
        <Card 
            width={{ base: "30rem", sm:"32rem", lg:"40rem", xl: "20rem", "2xl":"30rem"}} 
            height={"18rem"}
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
                                    <NumberInput 
                                        defaultValue={10} 
                                        min={1} 
                                        max={30}
                                        w={{ base: "25rem", sm:"27rem", lg:"35rem", xl:"15rem", "2xl":"25rem" }}
                                        value={selectedLength}
                                        onChange={(valueString, valueNumber) => onLengthChange(valueNumber)}
                                    >
                                        <InputGroup position="relative">
                                            <NumberInputField fontSize={{ base: "xxs", md: "xxs", xl: "16pt" }} />
                                            <InputRightElement 
                                            // width="auto" 
                                            h="100%" 
                                            position="absolute" 
                                            left={68} 
                                            >
                                                <Text fontSize={{ base: "xxxs", "2xl": "xs" }} color="gray.500">
                                                    minutes
                                                </Text>
                                            </InputRightElement>
                                            </InputGroup>
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Box>

                            <Checkbox size={"lg"} mt={4} py={2} value="No Timer">
                                <Text
                                fontSize={{ base: "xxxs", "2xl": "xs" }}
                                value="No Timer"
                                >
                                No Timer
                                </Text>
                            </Checkbox>
                        </Box>
                    </Flex>
                </CardBody>
            </Card>
        </>
    )
}