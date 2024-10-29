import Head from "next/head";
import { Box, Heading, Flex } from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import Footer from "@/styles/components/Footer";
import OverlappingCard from "@/styles/components/DashBoardStartCard";

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
        <Flex flexDirection="row">
          <main style={{ position: "relative", width: "100%" }}>
            <Flex flexDirection="column">
              <Box m={6}>
                <Heading fontFamily="heading" color="black" fontWeight="bold" fontSize="32pt">
                  <span style={{ color: "#EA4A7D" }}>Welcome back,</span> Onwarder!
                </Heading>

                <Box display="flex" justifyContent="space-between" gap={6} mt={7}>
                  <OverlappingCard />
                </Box>
              </Box>
              <Footer />
            </Flex>
          </main>
        </Flex>
      </Layout>
    </>
  );
}
