import { 
    Box,
    Flex,
    Text,
    Card, 
    CardBody, 
    CardFooter,
    Stack,
    StackDivider,
    Heading,
    Button,
    Image
} from '@chakra-ui/react';

export default function VideoContainer() {
    return(
        <Card width="40%" maxH={"25rem"}>
            <CardBody>
                <Box boxSize='sm' bg={"brand.pastelBlue"} width={"28rem"} height={"20rem"}>
                    <Image  
                    borderRadius='full'
                    boxSize='150px'
                    src="/practice-analysis-images/videoPlaceholder.jpg"
                    alt='Dan Abramov'/>
                </Box>
                <Flex flexDirection={"row"} gap={"1rem"} justify={"center"} mt={"0.5rem"}>
                    <Button size="xxs">Video</Button>
                    <Button size="xxs">Stop</Button>
                    <Button size="xxs">Pause</Button>
                </Flex>
            </CardBody>
        </Card>
    )
}
