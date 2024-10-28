import { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import "@/styles/theme";


export default function LanguageToggle() {
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    return (
        <Flex 
            borderRadius="full" 
            boxShadow="md" 
            overflow="hidden" 
            maxW="200px" 
            bg="gray.100"
        >
            <Button
                flex="1"
                fontWeight="bold"
                fontSize="xs"
                bg={selectedLanguage === "English" ? "brand.pastelBlue" : "transparent"}
                color={selectedLanguage === "English" ? "black" : "gray.600"}
                onClick={() => setSelectedLanguage("English")}
                _hover={{ bg: selectedLanguage === "English" ? "brand.pastelBlue" : "gray.200" }}
                borderRadius="0" // Remove rounded corners on inner buttons
                borderLeftRadius="full" // Rounded corner on the left
                boxShadow={selectedLanguage === "English" ? "sm" : "none"}
            >
                English
            </Button>
            <Button
                flex="1"
                fontWeight="bold"
                fontSize="xs"
                bg={selectedLanguage === "Tagalog" ? "brand.pastelBlue" : "transparent"}
                color={selectedLanguage === "Tagalog" ? "black" : "gray.600"}
                onClick={() => setSelectedLanguage("Tagalog")}
                _hover={{ bg: selectedLanguage === "Tagalog" ? "brand.pastelBlue" : "gray.200" }}
                borderRadius="0" // Remove rounded corners on inner buttons
                borderRightRadius="full" // Rounded corner on the right
                boxShadow={selectedLanguage === "Tagalog" ? "sm" : "none"}
            >
                Tagalog
            </Button>
        </Flex>
    );
}
