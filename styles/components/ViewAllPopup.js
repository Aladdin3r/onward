import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Stack, Text } from '@chakra-ui/react';

export default function ViewAllPopup({ isOpen, onClose, heading }) {
    return (
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
                                    {/* Content for all resumes or job postings */}
                                    <Text>Your detailed content goes here.</Text>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}