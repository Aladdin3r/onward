import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";
import { Box, Flex, Heading } from "@chakra-ui/react";
import ProgressBar from "@/styles/components/ProgressBar"; 
import Layout from "@/styles/components/Layout";
import UploadFile from "@/styles/components/UploadFile";

export default function Practice() {

    const router = useRouter();
    const activeVariant = "variant3";

    return (
        <>
        <Layout>
        <Head>
                <title>Onward | Practice</title>
                    <meta
                    name="description"
                    content="Practice Questions with Onward"
                    />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex flexDirection={"column"} >
                <ProgressBar/>
                <Flex flexDirection={"row"}>
                    <Flex flexDirection={"column"}>
                        <Heading as='h2' size='md'>
                            Upload Resume
                        </Heading>
                        <UploadFile/>
                    </Flex>
                    <Flex flexDirection={"column"}>
                        <Heading as='h2' size='md'>
                            Upload Job Posting
                        </Heading>
                        <UploadFile/>
                    </Flex>
                </Flex>
            </Flex>
        </Layout>
        </>
    );
}