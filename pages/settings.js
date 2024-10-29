// pages/settings.js
import Head from "next/head";
import "@/styles/theme";
import TopNav from "@/styles/components/TopNav";
import Layout from "@/styles/components/Layout";
import SettingsMenu from "@/styles/components/SettingsMenu";
import { Box } from "@chakra-ui/react";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Layout>
            <SettingsMenu />
        </Layout>
      </div>
    </>
  );
}
