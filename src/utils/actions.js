import { supabase } from "@/lib/supabaseClient";

// Save Recording
export const saveRecordingToSupabase = async (recordedChunks) => {
  // Validate `recordedChunks`
  if (!Array.isArray(recordedChunks) || recordedChunks.length === 0) {
    console.error("No valid recorded chunks available to save.");
    return { error: "No recording data found" }; // Return an error object
  }

  try {
    // Create a Blob from the chunks
    const blob = new Blob(recordedChunks, { type: "video/webm" });

    // Create a File from the Blob
    const file = new File([blob], `recorded-video-${Date.now()}.webm`, {
      type: "video/webm",
    });

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from("onward-video")
      .upload(`videos/${Date.now()}-recorded-video.webm`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    // Fetch the public URL of the uploaded video
    const { data: urlData, error: urlError } = await supabase.storage
      .from("onward-video")
      .getPublicUrl(data.path);

    if (urlError) {
      throw new Error(urlError.message);
    }

    // Return the URL and data from Supabase
    return { data: urlData, error: null };

  } catch (error) {
    console.error("Error saving recording:", error.message);
    return { error: error.message }; // Return the error message
  }
};
