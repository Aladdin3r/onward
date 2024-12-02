// pages/api/roughlyai.js
export default async function handler(req, res) {
    if (req.method === "POST") {
      const { handlerType, key, upload_data, fn, question, numsimular, api_key } = req.body;
  
      try {
        // determining handler type
        const body = handlerType === "api_upload"
          ? {
              handler: "api_upload",
              key,
              upload_data,
              fn,
              api_key,
            }
          : {
              handler: "api_call",
              key,
              api_key,
              question,
              numsimular,
            };
  
        // send request to api
        const response = await fetch("https://api.roughlyai.com/ttfiles/api/prompt_response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
  
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to process request");
        }
  
        // send response back to client
        res.status(200).json(data);
      } catch (error) {
        console.error("Error in API route:", error.message);
        res.status(500).json({ error: error.message });
      }
    } else {
      // handle unsupported method
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
  