
import { 
    Checkbox, 
    CheckboxGroup,
    Box,
    Flex,
    Text,
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
    Select
} from '@chakra-ui/react'

export default function QuestionTime() {
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
                        <Select 
                            placeholder='Select option' 
                            width={{ base: "18rem", sm: "28rem", lg:"35rem", xl:"18rem", "2xl": "25rem" }}  
                            fontSize={{ base: "xxxs", "2xl": "xxs" }}>
                            <option value='option1'>5</option>
                            <option value='option2'>8</option>
                            <option value='option3'>10</option>
                        </Select>
                    </Box>
                    <Box>
                        <Text 
                            fontFamily="heading" 
                            fontSize={{ base: "xxs", md: "xxs", xl: "16pt" }} 
                            fontWeight="bold" 
                            textAlign="left"
                        >
                            Length of Interview
                        </Text>
                        <Select 
                            placeholder='Select option' 
                            width={{ base: "18rem", sm: "28rem", lg:"35rem", xl:"18rem", "2xl": "25rem" }} 
                            fontSize={{ base: "xxxs", "2xl": "xxs" }}
                        >
                            <option value='option1'>10 Minutes</option>
                            <option value='option2'>15 Minutes</option>
                            <option value='option3'>20 Minutes</option>
                        </Select>
                    </Box>
                </Flex>
            </CardBody>
        </Card>
        </>
    )
}