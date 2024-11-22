import React from "react";
import Lottie from "lottie-react"; // Default import, not named
import animationData from "@/public/loadingAnimationOnward.json"; // Adjust the path if necessary

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%", // Ensures the spinner container doesn't expand the Box
        height: "auto", // Removes the fixed height constraint
      }}
    >
      <Lottie
        animationData={animationData}
        loop
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default LoadingSpinner;
