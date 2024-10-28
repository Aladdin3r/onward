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
    Button
} from '@chakra-ui/react';
import interviewQuestions from '@/data/interviewQuestions'; 
import { useState } from 'react';

export default function QuestionPractice() {

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const currentCategoryIndex = Math.floor(Math.random() * interviewQuestions.length);
    const currentQuestionText = interviewQuestions[currentCategoryIndex].questions[currentQuestion];

    // randomized question for now
    const getRandomQuestion = () => {
        const randomCategoryIndex = Math.floor(Math.random() * interviewQuestions.length);
        const randomQuestionIndex = Math.floor(Math.random() * interviewQuestions[randomCategoryIndex].questions.length);
        
        setCurrentQuestion(randomQuestionIndex);
    };

    return (
        <>
            <Card width="100%" maxW="400px" mx="auto">
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xxs'>
                                {interviewQuestions[currentCategoryIndex].category}
                            </Heading>
                        </Box>
                        <Box>
                            <Text pt='2' fontSize='xxs'>
                                {currentQuestionText}
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            <Button size="small" onClick={getRandomQuestion}>Next Question</Button>
            </Card>
        </>
    );
}
