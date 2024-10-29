import Head from "next/head";
import { Box, Heading, Flex, SimpleGrid } from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import Footer from "@/styles/components/Footer";
import OverlappingCard from "@/styles/components/DashBoardStartCard";
import MyResumesCard from "@/styles/components/MyResumesCard";
import HistoryContainer from "@/styles/components/HistoryContainer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Onward</title>
        <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout showTopNav={false}>
        <Flex flexDirection="row" justifyContent="center" alignItems="center" width="100%">
          <main style={{ position: "relative", width: "100%" }}>
            <Flex flexDirection="column" alignItems="center">
              <Box mt={6} mr={300} width="100%" maxWidth="1200px">
                <Heading fontFamily="heading" color="black" fontWeight="bold" fontSize="32pt">
                  <span style={{ color: "#EA4A7D" }}>Welcome back,</span> Onwarder!
                </Heading>
                <SimpleGrid columns={1} spacing={6} mt={7} width="100%">
                  <Box display="flex" justifyContent="space-between" gap={6}>
                    <OverlappingCard />
                    <MyResumesCard />
                  </Box>
                  <HistoryContainer />
                </SimpleGrid>
              </Box>
              <Footer />
            </Flex>
          </main>
        </Flex>
      </Layout>
    </>
  );
}