import { useEffect, useState } from "react";
import { Flex, Box, Heading, Text, Divider, Link } from "@chakra-ui/react";
import { supabase } from "@/lib/supabaseClient";
import NextLink from "next/link"; // For "View All" navigation

const HistoryContainer = ({ limit = 3 }) => {
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
    
            // Filter out unwanted files
            const filteredFileList = fileList
                .filter(file => !file.name.includes("emptyFolder") && !file.name.startsWith("."))
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by creation date, newest first
    
            // Map file data to video data
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
                    upload_date: file.created_at || new Date().toISOString().slice(0, 10), // Use file's `created_at` if available
                    video_url: data.publicUrl,
                };
            }));
    
            setVideos(videosData.filter(Boolean)); // Remove nulls from failed fetches
        };
    
        fetchVideos();
    }, []);
    

    const videosToShow = limit === 0 || limit === null ? videos : videos.slice(0, limit); // Show all if no limit

    return (
        <Flex
            flexDir="column"
            justify="center"
            align="center"
            width="100%"
            height="auto"
            py="4"
            overflow="hidden"
        >
            <Box
                width="100%"
                maxWidth={{ base: "100%", md: "80%", xl: "100%" }} // Makes the box responsive
                bg="white"
                boxShadow="md"
                borderRadius={15}
                p={6}
                mt={3}
            >
                <Heading fontSize="xs" mb={2}>
                    Practice Interview
                </Heading>
                <Divider mb={4} />

                {videosToShow.map((video, index) => (
                    <Box w="100%" key={index} mb={4}
                    bg="#FAFAFA"
                    >
                        <Flex
                            flexDir={{ base: "column", md: "row" }} // Stacks videos vertically on small screens
                            justify="flex-start"
                            alignItems="center"
                            gap={4}
                            mt={4}
                        >
                            <Box
                                width="100%"
                                maxWidth="200px"
                                height="auto"
                                position="relative"
                                margin={4}
                            >
                                <video
                                    width="100%"
                                    height="auto"
                                    controls
                                    style={{ objectFit: "cover" }}
                                >
                                    <source src={video.video_url} type="video/webm" />
                                    Your browser does not support the video tag.
                                </video>
                            </Box>

                            <Flex
                                flexDirection="column"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                gap={2}
                                width="100%"
                            >
                                <Text fontSize="20px" fontWeight="700">
                                    Name: <br />
                                    <Text as="span" fontWeight="400" lineHeight="27px" fontSize="20px">
                                        {video.file_name}
                                    </Text>
                                </Text>
                                <Text color="grey" fontSize="14px" fontWeight="400" mt="-2">
                                    Date: <t/>
                                    <Text as="span" fontWeight="400" lineHeight="27px" fontSize="14px">
                                        {new Date(video.upload_date).toLocaleDateString()}
                                    </Text>
                                </Text>
                                
                            </Flex>
                        </Flex>
                    </Box>
                ))}

                {limit !== 0 && videos.length > limit && (
                    <Box textAlign="center" mt={4}>
                        <NextLink href="/history" passHref>
                            <Link fontSize="sm" color="brand.blushPink" fontWeight="bold">
                                View All
                            </Link>
                        </NextLink>
                    </Box>
                )}
            </Box>
        </Flex>
    );
};

export default HistoryContainer;
