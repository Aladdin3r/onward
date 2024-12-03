import Head from "next/head";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router'; // Import useRouter
import { useState, useEffect } from "react";
import LayoutSim from "@/styles/components/LayoutSim";
import AnswerPractice from "@/styles/components/AnswerPractice";
import LoadingSpinner from "@/styles/components/LoadingSpinner";


export default function PracticeAnswer() {
    const [showVideo, setShowVideo] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [fileURLs, setFileURLs] = useState({ resumes: [], jobPosts: [] });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        const storedQuestions = localStorage.getItem("questions");
        if (storedQuestions) {
            try {
                const parsedQuestions = JSON.parse(storedQuestions);
                setQuestions(parsedQuestions);
                console.log("First Question Index: 0"); 
                if (parsedQuestions.length > 0) {
                    console.log("First Question:", parsedQuestions[0]); 
                } else {
                    console.warn("Questions array is empty.");
                }
            } catch (error) {
                console.error("Error parsing questions from localStorage:", error);
            }
        }
    }, []);
    
    const handleEndClick = () => {
        router.push({
            pathname: '/practice-interview',
        });
    };

    return (
        <>
                <Head>
                    <title>Practice Interview — Onward</title>
                    <meta
                    name="description"
                    content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews."
                    />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <LayoutSim>
                    <Flex flexDirection="column" height="86vh" width="100%">
                    {/* Answer cards */}
                    <Flex
                        flexDirection={"row"}
                        ml={"0rem"}
                        mt={"3rem"}
                        justifyContent={"center"}
                    >
                        {questions.length > 0 ? (
                        <AnswerPractice
                            questions={questions}
                            onShowVideoChange={setShowVideo}
                            setLoading={setLoading} // Pass setLoading to AnswerPractice
                        />
                        ) : (
                        <Text>No questions available. Please try again.</Text>
                        )}
                    </Flex>
                </Flex>
            </LayoutSim>
        </>
    );
}
