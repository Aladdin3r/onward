import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";

export const jakarta = Plus_Jakarta_Sans({
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
  variable: '--jakarta',
})
export const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--dm-sans',
}) 

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
        className={`${styles.page} ${dm_sans.variable} ${jakarta.variable}`}
      >
        <main className={styles.main}>
          <p> testing 1</p>
        </main>
      </div>
    </>
  );
}
