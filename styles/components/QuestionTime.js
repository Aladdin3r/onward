
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
                <Flex direction={"column"}>
                    <Box>
                        <Text fontFamily="heading" fontSize="xs" fontWeight="bold" textAlign="left">
                            Number of Questions
                        </Text>
                        <Select placeholder='Select option' size={"sm"} fontSize={"xs"}>
                            <option value='option1'>Option 1</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </Select>
                    </Box>
                    <Box>
                        <Text fontFamily="heading" fontSize="xs" fontWeight="bold" textAlign="left">
                            Length of Interview
                        </Text>
                        <Select placeholder='Select option' size={"sm"} fontSize={"xs"}>
                            <option value='option1'>Option 1</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </Select>
                    </Box>
                </Flex>
            </CardBody>
        </Card>
        </>
    )
}