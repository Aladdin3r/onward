'use client'
import { 
    Box,
    Flex, 
    useColorModeValue,
    IconButton,
    Image,
    Link,
} from "@chakra-ui/react";
import { User, Gear } from "@phosphor-icons/react";

export default function TopNav() {
    const bgColor = useColorModeValue('#fff', 'brand.nightBlack');

    return (
        <Box bg={bgColor} px={4} borderBottom="1px solid #E6EAF2">
            <Flex h={"104px"} alignItems={'center'} justifyContent={'space-between'}>
                <Box fontSize={{ base: 'md', md: 'lg' }}>
                    <Link href="/">
                        <Image src="logo.svg" boxSize="253px" alt="Onward Logo" style={{ padding: "30px" }} />
                    </Link>
                </Box>
                {/* <Flex alignItems={'center'}>
                    <Link href="/user">
                        <IconButton 
                            aria-label="User settings" 
                            icon={<User />}  
                            variant="ghost" 
                            mr="55px"
                        />
                    </Link>
                    <Link href="/settings">
                        <IconButton 
                            aria-label="Settings" 
                            icon={<Gear />} 
                            variant="ghost" 
                        />
                    </Link>
                </Flex> */}
            </Flex>
        </Box>
    );
}