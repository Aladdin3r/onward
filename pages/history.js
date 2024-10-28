import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import { SideNavBar } from "@/styles/components/SideNav";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import Popup from "@/styles/components/Popup.js";
import ViewAllPopup from "@/styles/components/ViewAllPopup"; // Import the new ViewAllPopup component
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router'; // Import useRouter

export default function PracticeInterview() {
    const router = useRouter();

    return (
        <>
             <Head>
                <title>History — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.page}`}>
                <TopNav />
                <SideNavBar activeVariant="variant4" />
                <Box ml={"17.1875rem"}>
                    <ProgressBar/>
                </Box>

            </div>
        </>
    )
}