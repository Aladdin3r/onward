import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";
import { Heading, Box, CardBody, Text, Stack, Card, Link } from "@chakra-ui/react";
import ProgressBar from "@/styles/components/ProgressBar"; 
import Layout from "@/styles/components/Layout";

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
                {/* container for interview */}
                <ProgressBar/>
        </Layout>
        </>
    );
}