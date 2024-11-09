import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex, Button } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import { SideNavBar } from "@/styles/components/SideNav";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router'; // Import useRouter
import Layout from "@/styles/components/Layout";
import VideoWQuestionCard from "@/styles/components/VideoWQuestionCard";
import MyResumesCard from "@/styles/components/MyResumesCard";
import UploadedFiles from "@/styles/components/UploadedFiles";
import ArrowControls from "@/styles/components/ArrowControls";


// right now using drop down for question number and length of interview

export default function PracticeOverview() {
   return(
    <>
        <ArrowControls/>
    </>
   
   )
}
