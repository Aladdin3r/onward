import { Box, Heading, Text, VStack, Link } from "@chakra-ui/react";
import PDFCard from "@/styles/components/PDFCard";

export default function MyResumesCard() {
    return (
        <Box bg="white" shadow="sm" borderRadius="lg" p={5} display="flex" flexDirection="column">
                <Heading size="md" mb={3}>My Resumes</Heading>
                <Text fontSize="xs" color="gray.500" mt="5">Default</Text>
                <VStack align="start" spacing={3}>
                  <PDFCard size={"92kb of 92kb"} title={"Burnaby Hosp. Nurse"} />
                  <Text fontSize="xs" color="gray.500">Recently Added</Text>
                  <PDFCard size={"99kb of 99kb"} title={"Nurse Aide Resume"} />
                  <PDFCard size={"66kb of 66kb"} title={"NewWest Hosp. Nurse"} />
                </VStack>
                <Link color="pink.500" fontSize="sm" mt="auto" display="inline-block">View All</Link>
              </Box>
    )
}

