import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function Card() {
  return (
    <Box>
        <Flex bg="#F3F6FF" minW="750"  borderRadius="16">
        <Flex display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Box>
                <Flex flexDirection="column" alignItems="center">
                <Image
                    src="/images/dashboard-img.png"
                    alt="Dashboard Start Card"
                    width={411.47}
                    height={230.42}
                    p="6"
                />
                </Flex>
                <Flex flexDirection="column" alignItems="flex-end">
                <Button
                    mt="2"  // Adjust to control spacing between image and button
                    bg="#EA4A7D"
                    color="#FFFFFF"
                    width="100%"
                    fontWeight="semibold"
                    fontSize={16}
                    borderRadius="full"
                    px="6"
                    maxW="302"
                    mb="6"
                    // marginleft="10"
                >
                    Start Practicing
                </Button>
                </Flex>
            </Box>
        </Flex>
        <Box position="absolute" bottom="0" right="60px" top="77px"> {/* Adjust top value for overlap */}
            <Image
              src="/images/nurse-img.png"
              alt="Nurse Image"
              width="300px"
              height="328px"
            />
          </Box>
        </Flex>
    </Box>
  );
}
