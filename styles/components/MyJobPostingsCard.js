import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabaseClient"; // Make sure to import your Supabase client
import PDFCard from './PDFCard'; // Import PDFCard component

export default function MyJobPostingsCard() {
    const [uploadedFiles, setUploadedFiles] = useState([]); // State to hold fetched files

    useEffect(() => {
        // Fetch files from the "job-postings" folder in the "onward-files" bucket
        const fetchJobPostings = async () => {
            const { data: fileList, error } = await supabase
                .storage
                .from("onward-job-posting") // Your bucket name
                .list("uploads", { limit: 100 }); // Folder path and limit for the files to fetch

            if (error) {
                console.error("Error fetching job postings:", error);
                return;
            }

            // Filter out unwanted files (e.g., hidden files, empty folders)
            const filteredFileList = fileList.filter(file => !file.name.includes("emptyFolder") && !file.name.startsWith("."));

            // Optionally, map the files to add more data, like a public URL and file size
            const filesData = filteredFileList.map(file => ({
                id: file.id,
                name: file.name,
                // If you want a public URL to the file
                url: supabase.storage.from("onward-job-posting").getPublicUrl(`uploads/${file.name}`).publicURL,
                size: file.metadata?.size || 0,
            }));

            // Set the files in state
            setUploadedFiles(filesData);
        };

        fetchJobPostings(); // Call the function to fetch files
    }, []); // Empty dependency array to fetch once when the component mounts

    // Handle file deletion logic
    const handleDeleteFile = async (fileName) => {
        try {
            const { error } = await supabase
                .storage
                .from("onward-job-posting")
                .remove([`uploads/${fileName}`]); // Remove the file from the bucket

            if (error) {
                console.error("Error deleting file:", error);
            } else {
                // Remove the deleted file from the state
                setUploadedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
            }
        } catch (error) {
            console.error("Error handling file deletion:", error);
        }
    };

    return (
        <Box 
            w={{ base: "32rem", lg:"14rem", xl: "30rem", "2xl":"38rem" }}
            h={{ base: "60%", lg: "100%", xl: "18rem", "2xl":"24rem" }}
            borderRadius="15px" 
            overflow="hidden"
            boxShadow="md"
            backgroundColor="brand.pureWhite"
            px={{ base: "4", xl: "10", "2xl":"12" }}
            py={{ base: "4", xl: "6" }}
            display="flex"
            flexDirection="column"
        >
            <Text 
                // fontSize={{ base: "xs", lg: "xxs", xl: "sm", "2xl":"md" }}
                fontSize="xs"
                fontWeight="bold" 
                mb={2}
            >
                My Job Postings:
            </Text>
            <Box
            display="flex"
            flexDirection="column"
            rowGap="0.6rem"
            >
                {uploadedFiles.length === 0 ? (
                    <Text>No job postings.</Text> // Message if no files are found
                ) : (
                    uploadedFiles.map((file) => (
                        <box
                        >
                        <PDFCard 
                            key={file.id}
                            title={file.name}
                            size={`${(file.size / 1024).toFixed(2)} KB`} // Convert size to KB
                            handleDeleteFile={handleDeleteFile} 
                        />
                        </box>
                    ))
                )}
            </Box>
        </Box>
    );
}
