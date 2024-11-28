// HighlightFillerWords.js

import { Box, Text } from "@chakra-ui/react";

const HighlightFillerWords = ({ answer }) => {
  const fillerWords = ["Um", "uh", "like", "um"];
  const blushPink = "brand.blushPink";

  return (
    <Box as="p" display="inline" whiteSpace="pre-wrap">
      {answer.split(" ").map((word, index) => {
        // Strip commas and periods to check for filler words
        const sanitizedWord = word.replace(/[,.]/g, "");
        const isFiller = fillerWords.includes(sanitizedWord);

        return (
          <Text
            as="span"
            key={index}
            color={isFiller ? blushPink : "inherit"}
            fontWeight={isFiller ? "bold" : "normal"}
          >
            {word}
            {index < answer.split(" ").length - 1 && " "} {/* Add space between words */}
          </Text>
        );
      })}
    </Box>
  );
};

export default HighlightFillerWords;
