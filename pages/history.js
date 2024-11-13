import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, Flex, Divider, Text } from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import { useRouter } from 'next/router';
import HistoryContainer from "./practiceOverview";

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
            <Layout showTopNav={true} pageTitle={"History"}>
                <HistoryContainer limit={0} mb={3} />
               
            </Layout>
        </>
    )
}
