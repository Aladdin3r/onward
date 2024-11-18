import Head from "next/head";
import { Box } from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import HistoryContainer from "@/styles/components/HistoryContainer";

export default function HistoryPage() {
  return (
    <>
      <Head>
        <title>History — Onward</title>
        <meta
          name="description"
          content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout showTopNav={true} pageTitle={"History"}>
        <HistoryContainer limit={0} mb={3} />
      </Layout>
    </>
  ); 
}
