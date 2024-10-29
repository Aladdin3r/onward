import { Box, Image, Flex, Button } from "@chakra-ui/react";

export default function Card() {
  return (
    <Box>
      <Flex bg="#F3F6FF" minW="750px" minH="435px" borderRadius="16" overflow="hidden">
        
        
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="6"
          width="60%"
        >
          <Image
            src="/images/dashboard-img.png"
            alt="Dashboard Start Card"
            width="411.47px"
            height="230.42px"
          />
          <Button
            mt="2"
            bg="#EA4A7D"
            color="#FFFFFF"
            width="100%"
            maxW="302px"
            fontWeight="semibold"
            fontSize="16px"
            borderRadius="full"
            px="6"
            mb="6"
            mt="10"
          >
            Start Practicing
          </Button>
        </Flex>

       
        <Flex
          alignItems="flex-end"  
          justifyContent="center"
          width="40%"
          // p="6"
        >
          <Image
            src="/images/nurse-img.png"
            alt="Nurse Image"
            width="300px"
            height="328px"
            objectFit="cover"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
