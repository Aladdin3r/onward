
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
        <Card width="25vw" borderRadius="15px" boxShadow="md">
            <CardBody>
                <Flex direction={"column"} gap={5} justifyContent={"flex-start"}>
                    <Box>
                        <Text fontFamily="heading" fontSize="xxs" fontWeight="bold" textAlign="left">
                            Number of Questions
                        </Text>
                        <Select placeholder='Select option' size={"sm"} fontSize={"xs"}>
                            <option value='option1'>5</option>
                            <option value='option2'>8</option>
                            <option value='option3'>10</option>
                        </Select>
                    </Box>
                    <Box>
                        <Text fontFamily="heading" fontSize="xxs" fontWeight="bold" textAlign="left">
                            Length of Interview
                        </Text>
                        <Select placeholder='Select option' size={"sm"} fontSize={"xs"}>
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