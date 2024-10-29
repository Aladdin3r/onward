const HistoryContainer = () => {
    return (
        <Flex flexDir="row" justify="center">
                            <Box
                                width="90%"
                                height={{ base: "auto", md: "300px", lg: "400px" }}
                                bg="white"
                                boxShadow="0px 0px 10px rgba(0, 0, 0, 0.10)"
                                borderRadius="15px"
                                p={{ base: 4, md: 6 }}
                                m="auto"
                            >
                                <Heading size="lg" mb={2}>
                                    Practice Interview
                                </Heading>
                                <Divider mb={4} />
                                <Text>Oct. 20th, 2024</Text>
                                <Flex 
                                    width="100%"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={4} // Spacing between items
                                    mt={4} // Margin top for spacing
                                >
                                    <Box 
                                        width="200px" 
                                        height="110px" 
                                        position="relative"
                                    >
                                        <img 
                                            style={{ 
                                                width: "100%", 
                                                height: "100%", 
                                                position: 'absolute', 
                                                left: 0, 
                                                top: 0 
                                            }} 
                                            src="video-picture.png" 
                                            alt="Placeholder" 
                                        />
                                        <Box 
                                            width="100%" 
                                            height="100%" 
                                            position="absolute" 
                                            background="rgba(0, 0, 0, 0.40)" 
                                            borderRadius="15px" // Optional: to match the style
                                        />
                                        <Box 
                                            width="30px" 
                                            height="30px" 
                                            position="absolute" 
                                            left="85%" 
                                            top="35%"
                                        >
                                            <Box 
                                                width="100%" 
                                                height="100%" 
                                                background="black" 
                                                opacity="0.60" 
                                                borderRadius="9999px" // Circle shape
                                            />
                                        </Box>
                                    </Box>
                                    
                                    <Flex 
                                        flexDirection="column" 
                                        justifyContent="flex-start" 
                                        alignItems="flex-start" 
                                        gap={2} // Space between text elements
                                    >
                                        <Text 
                                            fontSize="20px" 
                                            fontFamily="body" 
                                            fontWeight="700"
                                        >
                                            Name: <br />
                                            <Text 
                                                as="span" 
                                                fontWeight="400"
                                                lineHeight="27px" 
                                                fontSize="20px"
                                            >
                                                Burnaby General Practice Interview
                                            </Text>
                                        </Text>
                                        <Text 
                                            fontSize="20px" 
                                            fontFamily="DM Sans" 
                                            fontWeight="700"
                                        >
                                            Length: 
                                            <Text 
                                                as="span" 
                                                fontWeight="400" 
                                                lineHeight="27px" 
                                                fontSize="20px"
                                            >
                                                8:53
                                            </Text>
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Text>Oct. 20th, 2024</Text>
                                <Flex 
                                    width="100%"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={4} // Spacing between items
                                    mt={4} // Margin top for spacing
                                >
                                    <Box 
                                        width="200px" 
                                        height="110px" 
                                        position="relative"
                                    >
                                        <img 
                                            style={{ 
                                                width: "100%", 
                                                height: "100%", 
                                                position: 'absolute', 
                                                left: 0, 
                                                top: 0 
                                            }} 
                                            src="video-picture.png" 
                                            alt="Placeholder" 
                                        />
                                        <Box 
                                            width="100%" 
                                            height="100%" 
                                            position="absolute" 
                                            background="rgba(0, 0, 0, 0.40)" 
                                            borderRadius="15px" // Optional: to match the style
                                        />
                                        <Box 
                                            width="30px" 
                                            height="30px" 
                                            position="absolute" 
                                            left="85%" 
                                            top="35%"
                                        >
                                            <Box 
                                                width="100%" 
                                                height="100%" 
                                                background="black" 
                                                opacity="0.60" 
                                                borderRadius="9999px" // Circle shape
                                            />
                                        </Box>
                                    </Box>
                                    
                                    <Flex 
                                        flexDirection="column" 
                                        justifyContent="flex-start" 
                                        alignItems="flex-start" 
                                        gap={2} // Space between text elements
                                    >
                                        <Text 
                                            fontSize="20px" 
                                            fontFamily="body" 
                                            fontWeight="700"
                                        >
                                            Name: <br />
                                            <Text 
                                                as="span" 
                                                fontWeight="400"
                                                lineHeight="27px" 
                                                fontSize="20px"
                                            >
                                                Burnaby General Practice Interview
                                            </Text>
                                        </Text>
                                        <Text 
                                            fontSize="20px" 
                                            fontFamily="DM Sans" 
                                            fontWeight="700"
                                        >
                                            Length: 
                                            <Text 
                                                as="span" 
                                                fontWeight="400" 
                                                lineHeight="27px" 
                                                fontSize="20px"
                                            >
                                                8:53
                                            </Text>
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Flex>
    );
};

export default HistoryContainer;