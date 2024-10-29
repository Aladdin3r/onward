// components/SettingsContent.js
import { Box, VStack, HStack, Text, Switch, Select } from "@chakra-ui/react";

const SettingsContent = ({ activeSection }) => {
  const renderContent = () => {
    if (activeSection === "App Settings") {
      return (
        <VStack align="start" spacing={4}>
          <Text fontWeight="bold" fontSize="md">App Settings</Text>
          <HStack mt="5" w="100%" justifyContent="space-between">
            <Text fontSize="sm" fontWeight="semibold">Theme:</Text>
            <Select fontSize="sm" w="60%" defaultValue="Match System">
              <option value="Match System">Match System</option>
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </Select>
          </HStack>
          <HStack mt="5" w="100%" justifyContent="space-between">
            <Text fontSize="sm" fontWeight="semibold">Text size:</Text>
            <Select w="60%" defaultValue="Default">
              <option value="Default">Default</option>
              <option value="Large">Large</option>
              <option value="Small">Small</option>
            </Select>
          </HStack>
          <HStack mt="5" w="100%" justifyContent="space-between">
            <Text fontSize="sm" fontWeight="semibold">Auto save videos:</Text>
            <Switch mt={5} colorScheme="pink" />
          </HStack>
        </VStack>
      );
    } else {
      return <Text fontWeight="bold" fontSize="md">{activeSection}</Text>;
    }
  };

  return (
    <Box bg="white" shadow="sm" borderRadius="lg" p={6} minW="280px" minH="300px">
      {renderContent()}
    </Box>
  );
};

export default SettingsContent;
