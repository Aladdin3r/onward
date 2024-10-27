import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Stack } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

export default function VerticallyCenter({ title, heading }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="mdPrimary" fontSize="20pt" onClick={onOpen}>{title}</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay />
        <ModalContent textAlign="center">
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Box flex="1" marginRight="2" mb={6}>
                <Stack spacing={4}>
                  <Box bg="brand.blueberryCreme" boxShadow={"0px 0px 10px 0px rgba(0, 0, 0, 0.10)"} p={7} borderRadius="md" display="flex" flexDir="column" alignItems="center">
                    Practice a realistic interview scenario in a simulated environment
                    <Button variant="smPrimary" fontSize="12pt" display="flex" mt={5}>Mock Interview</Button>
                  </Box>
                </Stack>
              </Box>
              <Box flex="1" marginLeft="2">
                <Stack spacing={4}>
                  <Box bg="brand.blueberryCreme" boxShadow={"0px 0px 10px 0px rgba(0, 0, 0, 0.10)"} p={7} borderRadius="md" display="flex" flexDir="column" alignItems="center">
                    Focus on refining your answers and building confidence
                    <Button variant="smPrimary" fontSize="12pt" display="flex" mt={5}>Practice Interview</Button>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
