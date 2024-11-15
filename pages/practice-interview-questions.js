// import Head from "next/head";
// import styles from "@/styles/Home.module.css";
// import "@/styles/theme";
// import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex, Button } from "@chakra-ui/react";
// import TopNav from "@/styles/components/TopNav";
// import { SideNavBar } from "@/styles/components/SideNav";
// import ProgressBar from "@/styles/components/ProgressBar";
// import Footer from "@/styles/components/Footer";
// import Popup from "@/styles/components/Popup.js";
// import ViewAllPopup from "@/styles/components/ViewAllPopup"; // Import the new ViewAllPopup component
// import { useDisclosure } from '@chakra-ui/react';
// import { useRouter } from 'next/router'; // Import useRouter
// import Layout from "@/styles/components/Layout";
// import QuestionPractice from "@/styles/components/QuestionPractice";
// import VideoPlayer from '@/styles/components/VideoPlayer'
// import LayoutSim from "@/styles/components/LayoutSim";

// export default function PracticeInterviewQuestion() {
//     const router = useRouter();
//     const { question } = router.query;

//     const handleAnswerPage = () => {
//         router.push({
//             pathname: '/practice-interview-answer',
//         });
//     };
   
//     const handleEndClick = () => {
//         router.push({
//             pathname: '/'
//         });
//     };

//     const handleSimulation = () => {
//         router.push({
//             pathname: '/practice-interview-answer'
//         })
//     }


//     return (
//         <>
//             <Head>
//                 <title>Practice Interview — Onward</title>
//                 <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
//                 <meta name="viewport" content="width=device-width, initial-scale=1" />
//                 <link rel="icon" href="/favicon.ico" />
//             </Head>
//             <LayoutSim>
//                     <div className={styles.page} style={{ position: "relative" }}>
//                     <Flex 
//                         flexDirection="column"
//                         minH={{ base: "60vh", md: "65vh", xl: "60vh", "2xl": "60vh" }} 
//                         maxH="1080px" // Add max height constraint
//                         width={{ base: "85%", md: "85%", lg: "100%" }} 
//                         mt="2rem"
//                     >
//                         <Box mx="auto">
//                             <QuestionPractice 
//                             showArrows={"true"} 
//                             borderRadius={"15"}
//                             questionWidth={"80%"}/>
//                         </Box>

//                         {/* bottom buttons */}
//                         <Flex 
//                             flexDirection="row" 
//                             justifyContent="space-between" 
//                             // mx={"2rem"} 
//                             // mt={{ base: "5rem", xl: "3rem", "2xl":"5rem"}}
//                             mt="auto"
//                         >
                            // <Button bg={"brand.blushPink"} size="xs" color={"white"} py={"1.5rem"} px={"5rem"} boxShadow={"md"}
                            //     onClick={handleEndClick}
                            //     _hover={{
                            //         bg: "white",
                            //         color: "brand.blushPink",
                            //         border: "1px",
                            //         boxShadow:"md"
                            //     }}
                            // >
                            //         Back
                            //     </Button>
                            // <Button bg={"brand.blushPink"} size="xs" color={"white"} py={"1.5rem"} px={"5rem"} boxShadow={"md"}
                            //     onClick={handleSimulation}
                            //     _hover={{
                            //         bg: "white",
                            //         color: "brand.blushPink",
                            //         border: "1px",
                            //         boxShadow:"md"
                            //     }}
                            // >
                            //         Start Simulation
                            // </Button>
//                         </Flex>
//                     </Flex>
//                 </div>
//             </LayoutSim>
            
           
//         </>
//     )
// }


import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex, Button } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import { SideNavBar } from "@/styles/components/SideNav";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import Popup from "@/styles/components/Popup.js";
import ViewAllPopup from "@/styles/components/ViewAllPopup"; // Import the new ViewAllPopup component
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router'; // Import useRouter
import Layout from "@/styles/components/Layout";
import QuestionPractice from "@/styles/components/QuestionPractice";
import VideoPlayer from '@/styles/components/VideoPlayer'
import LayoutSim from "@/styles/components/LayoutSim";

export default function PracticeInterviewQuestion() {
    const router = useRouter();
    const { question } = router.query;

    const handleAnswerPage = () => {
        router.push({
            pathname: '/practice-interview-answer',
        });
    };
   
    const handleEndClick = () => {
        router.push({
            pathname: '/'
        });
    };

    const handleSimulation = () => {
        router.push({
            pathname: '/practice-interview-answer'
        })
    }

    return (
        <>
            <Head>
                <title>Practice Interview — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LayoutSim>
                <Flex
                    flexDirection="column"
                    height="86vh"
                    width="100%"
                >
                    {/* Top Container */}
                    <Flex
                        flex="1"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box>
                            <QuestionPractice
                                showArrows={"true"}
                                borderRadius={"15"}
                                questionWidth={"80%"}
                            />
                        </Box>
                    </Flex>

                    {/* Bottom Container */}
                    <Flex 
                        flexDirection={"row"} 
                        justify={"space-between"} 
                        mt={"auto"} 
                        px="4em"
                        mb="20px"
                    >
                    <Button bg={"brand.blushPink"} size="xs" color={"white"} py={"1.5rem"} px={"5rem"} boxShadow={"md"} 
                        onClick={handleEndClick}
                        _hover={{
                            bg: "white",
                            color: "brand.blushPink",
                            border: "1px",
                            boxShadow:"md"
                        }}
                    >
                        Back
                    </Button>
                        
                    <Button bg={"brand.blushPink"} size="xs" color={"white"} py={"1.5rem"} px={"5rem"} boxShadow={"md"}
                        onClick={handleSimulation}
                        _hover={{
                            bg: "white",
                            color: "brand.blushPink",
                            border: "1px",
                            boxShadow:"md"
                        }}
                    >
                        Answer
                    </Button>
                    </Flex>
                </Flex>
            </LayoutSim>
        </>
    );
}
