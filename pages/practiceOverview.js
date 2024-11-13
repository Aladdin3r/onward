import { useEffect, useState } from "react";
import { Flex, Box, Heading, Text, Divider } from "@chakra-ui/react";
import { supabase } from "@/lib/supabaseClient";

const HistoryContainer = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const { data: fileList, error } = await supabase
                .storage
                .from("onward-video")
                .list("videos", { limit: 100 });
            
            if (error) {
                console.error("Error fetching video list:", error);
                return;
            }

            // Filter out any placeholder files such as "emptyFolderPlaceholder"
            const filteredFileList = fileList.filter(file => file.name !== ".emptyFolderPlaceholder");

            const videosData = await Promise.all(filteredFileList.map(async (file) => {
                const { data, error } = supabase
                    .storage
                    .from("onward-video")
                    .getPublicUrl(`videos/${file.name}`);

                if (error || !data.publicUrl) {
                    console.error("Error fetching video URL:", error);
                    return null;
                }

                return {
                    file_name: file.name,
                    upload_date: new Date().toISOString().slice(0, 10), // Placeholder date
                    video_url: data.publicUrl,
                };
            }));

            setVideos(videosData.filter(Boolean)); // Remove nulls from failed fetches
        };

        fetchVideos();
    }, []);

    return (
        <Flex flexDir="row" justify="center" height={{ base: "auto", md: "300px", lg: "400px", xl: "70%", "2xl": "100%" }}>
            <Box
                width={{ base: "30rem", md: "50rem", xl: "78rem", "2xl": "96rem" }}
                height={"auto"}
                bg="white"
                boxShadow="md"
                borderRadius={15}
                p={{ base: 4, md: 6 }}
                m="auto"
                mt={3}
            >
                <Heading fontSize={{ base: "auto", md: "sm", lg: "sm", xl: "sm", "2xl": "lg" }} mb={2}>
                    Practice Interview
                </Heading>
                <Divider mb={4} />
                
                {videos.map((video, index) => (
                    <Box key={index} mb={4}>
                        <Flex width="100%" justifyContent="flex-start" alignItems="center" gap={4} mt={4}>
                            <Box width="200px" height="110px" position="relative" margin={4}>
                                <video 
                                    width="100%" 
                                    height="100%" 
                                    controls 
                                    style={{ objectFit: "cover" }}
                                >
                                    <source src={video.video_url} type="video/webm" />
                                    Your browser does not support the video tag.
                                </video>
                            </Box>

                            <Flex flexDirection="column" justifyContent="flex-start" alignItems="flex-start" gap={2}>
                                <Text fontSize="20px" fontWeight="700">
                                    Name: <br />
                                    <Text as="span" fontWeight="400" lineHeight="27px" fontSize="20px">
                                        {video.file_name}
                                    </Text>
                                </Text>
                                <Text fontSize="20px" fontWeight="700">
                                    Date: 
                                    <Text as="span" fontWeight="400" lineHeight="27px" fontSize="20px">
                                        {new Date(video.upload_date).toLocaleDateString()}
                                    </Text>
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </Box>
        </Flex>
    );
};

export default HistoryContainer;
