import { Box, Textarea, HStack, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Star } from "@phosphor-icons/react";
import React from "react";

const RatingBox = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (index) => {
    setRating(index + 1); // Sets the rating based on which star is clicked
  };

  let [value, setValue] = React.useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  return (
    <Box p={8} borderRadius="md" w={550}>
      <Text mb={35} fontWeight="bold" fontSize="sm">
        Leave us a review
      </Text>
      <HStack spacing={1}>
        <Textarea 
            placeholder="Type your review here" 
            fontSize="12pt"
            value={value}
            onChange={handleInputChange} 
            mb={4}
            h={150}
        />
      </HStack>
      <HStack spacing={2}>
        {Array(5)
          .fill("")
          .map((_, index) => (
            <Star
              key={index}
              size={24}
              weight={index < rating ? "fill" : "regular"}
              color={index < rating ? "#EA4A7D" : "brand.nightBlack"}
              cursor="pointer"
              onClick={() => handleRating(index)}
            />
          ))}
        <Button
                bg="brand.blushPink"
                color="brand.frostWhite"
                variant={'xsPrimary'}
                fontSize="12pt"
                px={4}
                py={6}
                ml={"225px"}
              >
                Submit
              </Button>
      </HStack>
    </Box>
  );
};

export default RatingBox;
