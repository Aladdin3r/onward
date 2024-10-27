import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";
import { Heading, Box, CardBody, Text, Stack, Card, Link } from "@chakra-ui/react";
import AppTopNav from "@/styles/components/AppTopNav";
import ProgressBar from "@/styles/components/ProgressBar"; 
import { SideNavBar } from "@/styles/components/sidenav";
import Layout from "@/styles/components/Layout"; // Import the Layout component

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
            <main className={styles.main} style={{ position: "relative" }}>
                <SideNavBar property1="variant-3" />
                {/* container for interview */}
                <Box ml={"17.1875rem"}>
                    <AppTopNav title="Practice Overview" />
                    <ProgressBar/>
                </Box>
            </main>
        </Layout>
        </>
    );
}