import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme"
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";
import { Text } from "@chakra-ui/react";


export default function Home() {
  return (
    <>
      <Head>
        <title>Onward</title>
        <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page}`}
      >
        <main className={styles.main}>
          <Text fontFamily="heading">The quick brown fox jumps over the lazy dog</Text>
        </main>
      </div>
    </>
  );
}
