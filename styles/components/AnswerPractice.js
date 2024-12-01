import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Divider,
  Heading,
  Button,
  Textarea,
} from "@chakra-ui/react";
import QuestionPractice from "./QuestionPractice";
import RecordCamera from "./Camera";
import Transcriber from "./Transcriber";
import { supabase } from "@/lib/supabaseClient";
import { saveRecordingToSupabase } from "@/src/utils/actions";

export default function AnswerPractice({ questions, onShowVideoChange }) {
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false); // Video response
    const [activeButton, setActiveButton] = useState('text'); // Default is text response
    const [isRecording, setIsRecording] = useState(false);
    const [editableTranscription, setEditableTranscription] = useState('');
    const [transcription, setTranscription] = useState('');
    const [savedVideoUrl, setSavedVideoUrl] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [answerAnalysis, setAnswerAnalysis] = useState([]);

    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        // Initialize the default voice as "Google US English"
        const voicesList = speechSynthesis.getVoices();
        const googleUSVoice = voicesList.find(voice => voice.name === "Google US");
        if (googleUSVoice) {
            setDefaultVoice(googleUSVoice);
        }
    }, []);

    const handleSaveAnswer = (responseText) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestionIndex] = {
                questionId: currentQuestionIndex + 1, // 1-based index
                question: currentQuestion?.question || "",
                response: responseText,
            };
            return updatedAnswers;
        });
        console.log("Saved answer:", { questionId: currentQuestionIndex + 1, responseText });
    };    

    // save answer array to supabase with session ID
    const saveAllAnswersToFile = async () => {
        try {
            const sessionId = localStorage.getItem("sessionId");
            if (!sessionId) {
                console.error("Session ID not found.");
                return;
            }
            
            const currentDate = new Date().toISOString().split("T")[0];

            const bucketName = "onward-responses";
            const fileName = `all-answers-${sessionId}.txt`;
            const filePath = `uploads/${currentDate}/${fileName}`;

            // formatting answers
            const textContent = answers
            .map(
                (answer) =>
                    `Question ${answer.questionId}:\n${answer.question}\n\nAnswer:\n${answer.response}\n`
            )
            .join("\n==========\n");

            const answersFile = new Blob([textContent], { type: "text/plain" });
    
            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, answersFile, { upsert: true });
    
            if (uploadError) throw new Error(uploadError.message);
    
            console.log("All answers saved successfully to a single file.");
    
            // Fetch the public URL for the uploaded file
            const { data: publicUrlData, error: publicUrlError } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);
    
            if (publicUrlError) throw new Error(publicUrlError.message);

            const answersFileUrl = publicUrlData.publicUrl;
            console.log("Answers File Details:", { url: answersFileUrl, name: fileName });
            localStorage.setItem("answersPublicUrl", answersFileUrl);
    
            return { url: answersFileUrl, name: fileName };
        } catch (err) {
            console.error("Error saving all answers:", err.message);
        }
    };
    
    // API stuff
    const UploadFiles = async (resumes, answers) => {
        try {
          const uploadPromises = [];
      
          // Upload Resumes
          if (resumes.length > 0) {
            uploadPromises.push(
              fetch("https://api.roughlyai.com/ttfiles/api/prompt_response", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  handler: "api_upload",
                  key: "Onward/Resumes/",
                  upload_data: resumes.map((file) => file.url),
                  fn: resumes.map((file) => file.name),
                  api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
                }),
              })
            );
          }
      
          // Upload Answers
          if (answers.length > 0) {
            uploadPromises.push(
              fetch("https://api.roughlyai.com/ttfiles/api/prompt_response", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  handler: "api_upload",
                  key: "Onward/Answers/",
                  upload_data: answers.map((file) => file.url),
                  fn: answers.map((file) => file.name),
                  api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
                }),
              })
            );
          }
      
          const responses = await Promise.all(uploadPromises);
      
          const pollingResults = await Promise.all(
            responses.map(async (resp) => {
              if (!resp.ok) {
                const errorDetails = await resp.text();
                throw new Error(`Upload failed with details: ${errorDetails}`);
              }
              const { data: _url } = await resp.json();
              return await PollingResponse(_url);
            })
          );
      
          return pollingResults;
        } catch (error) {
          console.error("Error uploading files:", error);
          throw error;
        }
      };      

    // const UploadFiles = async (resumes, answers)=>{
    //     const _resp = await fetch("https://api.roughlyai.com/ttfiles/api/prompt_response", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         handler: "api_upload",
    //         key: "Onward/Analysis/",
    //         upload_data: [resumes.map((file) => file.url),
    //           answers.map((file) => file.url)],
    //         fn:[resumes.map((file) => file.name),
    //             answers.map((file) => file.name)],
    //         api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY
    //       })
    //     }) 
    //     const {data:_url} = await _resp.json();
    //     const prog = await PollingResponse(_url);
    //   }

    const GenerateAnalysis = async (
        answersUrl, 
        resumeUrl
      ) => {
        try {
          console.log("Sending API request with:", {
            answersUrl, 
            resumeUrl
          });
          const analysisPrompt = `You are an AI interview coach helping immigrant nurses refine their answers. 
          Compare their answers to their resume and provide actionable, clear, and constructive feedback.

            ### Focus Areas:
            - For each answer:
                - Suggest professional language for casual terms (e.g., "help patients" → "facilitate patient care").
                - Explain Canadian healthcare norms and highlight transferable skills.
                - Encourage confidence and offer language support for English challenges.

            ### Each object should follow this structure:
            - **question**: The question.
            - **answer**: User's answer with filler words wrapped as <span style="color:red;">word</span> and power words bolded as <b>word</b>.
            - **expectation**: What the question assesses.
            - **overallFeedback**: Positive encouragement with improvement tips.
            - **detailedFeedback**:
            - clarity, relevance, effectiveness, grammarAndSyntax.
            - fillerAndPowerWords: { "fillerWords": [...], "powerWords": [...] }.
            - languageRefinement, starMethod, whatWorkedWell, roomForImprovements, nextStepsToSuccess.

            ### Constraints:
            - Use a friendly, supportive tone.
            - Provide actionable feedback tailored to immigrant nurses.
            - Return valid JSON only, no extra formatting. Do not include backticks JSON`
          console.log("Analysis Prompt:", analysisPrompt);
    
          // Make API call
          const analysisResponse = await fetch(
            "https://api.roughlyai.com/ttfiles/api/prompt_response",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                handler: "api_call",
                key: "Onward/Analysis/",
                api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
                question: analysisPrompt,
                numsimular: 5,
              }),
            }
          );
    
          const answerAnalysis = await PollingResponse(
            (
              await analysisResponse.json()
            ).data
          );
    
          return { answerAnalysis };
        } catch (error) {
          console.error("Error generating analysis:", error);
          throw error;
        }
      };

    // const Prompt = async ()=>{
    //     const _resp = await fetch("https://api.roughlyai.com/ttfiles/api/prompt_response", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         handler: "api_call",
    //         key: "Onward/Test/",
    //         api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
    //         question:`You are an AI interview coach helping immigrant nurses refine their answers. 
    //           Compare their answers to their resume and provide actionable, clear, and constructive feedback.
    
    //             ### Focus Areas:
    //             - For each answer:
    //                 - Suggest professional language for casual terms (e.g., "help patients" → "facilitate patient care").
    //                 - Explain Canadian healthcare norms and highlight transferable skills.
    //                 - Encourage confidence and offer language support for English challenges.
    
    //             ### Each object in the analysis array should follow this structure:
    //             - **question**: The question.
    //             - **answer**: User's answer with filler words wrapped as <span style="color:red;">word</span> and power words bolded as <b>word</b>.
    //             - **expectation**: What the question assesses.
    //             - **overallFeedback**: Positive encouragement with improvement tips.
    //             - **detailedFeedback**:
    //             - clarity, relevance, effectiveness, grammarAndSyntax.
    //             - fillerAndPowerWords: { "fillerWords": [...], "powerWords": [...] }.
    //             - languageRefinement, starMethod, whatWorkedWell, roomForImprovements, nextStepsToSuccess.
    
    //             ### Constraints:
    //             - Use a friendly, supportive tone.
    //             - Provide actionable feedback tailored to immigrant nurses.
    //             - Return valid JSON only, no extra formatting. Do not include backticks JSON`,
    //         numsimular:10
    //       })
    //     });
    //     const { data: _url } = await _resp.json();
    //     const analysis_response = await PollingResponse(_url);

    //     try {
    //         const parsedAnalysis = JSON.parse(analysis_response);
    //         setAnswerAnalysis(parsedAnalysis.answers || []);
    //     } catch (error) {
    //         console.error("Error parsing AI response:", error);
    //     }
    //   }


    const handleVideoSave = async (url) => {
      try {
        console.log("Video URL to save:", url); // Debugging log
        
        // Save video and get public URL
        const { data, error } = await saveRecordingToSupabase(url);
        if (error) {
          console.error("Error saving video to Supabase:", error);
          return;
        }
    
        const publicUrl = data.publicUrl; // Get the public URL from the response
        setSavedVideoUrl(publicUrl); // Update the state with the public URL
        console.log("Video successfully saved to Supabase:", publicUrl);
    
        // You can also save the URL to a database or perform other actions here
      } catch (error) {
        console.error("Error in handleVideoSave:", error);
      }
    };
    
  
    // button handlers
    const handleEndClick = () => {
        router.push({
            pathname: '/practice-interview'
        });
    };


    const handleNextClick = async () => {
        const responseText = activeButton === "text" ? editableTranscription : transcription;
    
        // save current answer
        handleSaveAnswer(responseText);
    
        if (currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
    
            // update typed responses for the next question
            const nextAnswer = answers[nextIndex]?.response || "";
            setEditableTranscription(nextAnswer);
        } else {
            console.log("All questions answered. Saving all answers...");
            await saveAllAnswersToFile(); // save all answers to a single file
            router.push("/practiceOverview");
        }
    };
    
    const handlePrevClick = () => {
        if (currentQuestionIndex > 0) {
            const prevIndex = currentQuestionIndex - 1;
            setCurrentQuestionIndex(prevIndex);
    
            // Update editable transcription for the previous question
            const prevAnswer = answers[prevIndex]?.response || "";
            setEditableTranscription(prevAnswer);
        }
    };    
    

    const handleVoiceClick = () => {
        setShowVideo(true);
        setActiveButton("voice");
        setIsRecording(!isRecording); // Toggle recording state
        onShowVideoChange(true);
    };

    const handleTextClick = () => {
        setShowVideo(false);
        setActiveButton("text");
        setEditableTranscription(transcription); // Switch to editable transcription
        onShowVideoChange(false);
    };

    // Handle typing
    const handleEditableChange = (event) => {
        const updatedText = event.target.value;
        setEditableTranscription(updatedText);
    
        handleSaveAnswer(updatedText);
    };
    
    const handleTranscription = (transcribedText) => {
        setTranscription(transcribedText);
    
        handleSaveAnswer(transcribedText);
    };

    const handleAnalysisClick = async () => {
        try {
            const videoURL = savedVideoUrl;
            const transcriptionText = transcription;
    
            // Save transcription to Supabase
            const transcriptionEntry = { text: transcriptionText, video_id: videoURL };
            const { error } = await supabase.from("transcriptions").insert(transcriptionEntry);
            if (error) throw error;
    
            // Save answers file and get its public URL and name
            const answersFile = await saveAllAnswersToFile();
            const answersUrl = answersFile.url;
            console.log("Answers File URL:", answersUrl);

            // Get selected resumes from localStorage
            const storedFiles = JSON.parse(localStorage.getItem("selectedFileURLs"));
            if (!storedFiles || !storedFiles.resumes || storedFiles.resumes.length === 0) {
            throw new Error("No resume files found in selected files.");
            }

            const resumes = storedFiles.resumes;
            const answers = [{ name: answersFile.name, url: answersUrl }];

            // Upload resumes and answers
            const uploadProgress = await UploadFiles(resumes, answers);
            console.log("Upload progress:", uploadProgress);

            // Generate analysis using the uploaded files
            const { answerAnalysis } = await GenerateAnalysis(answersUrl, resumes[0].url);
            console.log("Generated Analysis (Raw):", answerAnalysis);

            // Ensure the `answer` field is parsed
            if (typeof answerAnalysis.answer === "string") {
                try {
                    answerAnalysis.answer = JSON.parse(answerAnalysis.answer);
                } catch (parseError) {
                    console.error("Error parsing `answer` field:", parseError);
                }
            }

            // Store the corrected `answerAnalysis` in localStorage
            localStorage.setItem("answerAnalysis", JSON.stringify({ answer: answerAnalysis.answer }));

            // Navigate to the practice overview page
            router.push({ pathname: "/practiceOverview" });
        } catch (error) {
            console.error("Error in handleAnalysisClick:", error);
        }
    };    

  return (
    <>
        <Flex
            flexDirection="column"
            justifyContent="center"
        >
            <Flex flexDirection="row"
                gap="2rem"
                mx="auto"
                justifyContent="center"
                width="100%"
                maxWidth={showVideo ? "100%" : "60%"}
            >
                {/* Question and Answer Section */}
                <Box
                    width="100%"
                    maxW={showVideo ? "60%" : "100%"}
                    transition="width 0.5s ease"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    {/* Display Question */}
                    <QuestionPractice question={questions[currentQuestionIndex]}/>
                    <Flex
                        gap="1.1rem"
                        p="4"
                        bg="brand.pureWhite"
                        borderRadiusBottom={15}
                        boxShadow="md"
                        flexDirection="column"
                        divider={<StackDivider />}
                        width="100%"
                    >
                        <Heading size="18pt" textAlign="left">
                            Response Type:
                        </Heading>
                        <Divider orientation="horizontal" mb={4} />


                        {/* Response Type Buttons */}
                        <Flex flexDirection="row" gap="2rem">
                            <Button
                                width={isRecording ? "10rem%" : "7rem"}
                                onClick={handleVoiceClick}
                                bg={
                                activeButton === "voice"
                                    ? "brand.oceanBlue"
                                    : "brand.pureWhite"
                                }
                                color={
                                activeButton === "voice"
                                    ? "brand.pureWhite"
                                    : "brand.oceanBlue"
                                }
                                borderColor="brand.oceanBlue"
                                border="1px"
                                _hover={{
                                boxShadow:
                                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                                }}
                            >
                                <Text fontSize="xxs">
                                {isRecording ? "Stop Recording" : "Voice"}
                                </Text>
                            </Button>
                            <Button
                                width="7rem"
                                onClick={handleTextClick}
                                bg={
                                activeButton === "text"
                                    ? "brand.oceanBlue"
                                    : "brand.pureWhite"
                                }
                                color={
                                activeButton === "text"
                                    ? "brand.pureWhite"
                                    : "brand.oceanBlue"
                                }
                                borderColor="brand.oceanBlue"
                                border="1px"
                                _hover={{
                                boxShadow:
                                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                                }}
                            >
                                <Text fontSize="xxs">Text</Text>
                            </Button>
                            <Transcriber
                                isRecording={isRecording}
                                setTranscription={setTranscription}
                                setEditableTranscription={setEditableTranscription}
                            />
                        </Flex>
                    </Flex>
                    {/* Answer Section */}
                        <Box
                            p="4"
                            bg="brand.blueberryCreme"
                            boxShadow="md"
                            borderBottomRadius={15}
                            maxH="35rem"
                            width="100%"
                        >
                            <Card borderRadius="15" textAlign="left">
                                <CardBody>
                                    <Stack spacing="4" divider={<StackDivider />}>
                                        <Box>
                                            <Heading size="18pt">Your Response:</Heading>
                                        </Box>
                                        {/* Answer Box */}
                                        <Box overflowY="auto" height="10rem" w="100%">
                                            {activeButton === "text" ? (
                                            <Textarea
                                                value={editableTranscription}
                                                onChange={handleEditableChange}
                                                placeholder="Type your answer here"
                                                size="sm"
                                                height="10rem"
                                                resize="vertical"
                                            />
                                            ) : (
                                            <Text pt="2" fontSize="14pt">
                                                {transcription}
                                            </Text>
                                            )}
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                        </Box>
                    </Box>

                    {/* Video Section */}
                    {showVideo && (
                        <Flex
                            flexDirection="column"
                            width="60%"
                            py="2rem"

                            boxShadow="md"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius={15}
                        >
                            {/* <RecordCamera setSavedVideoUrl={setSavedVideoUrl} /> */}
                            <RecordCamera isRecordingAvailable={true} setSavedVideoUrl={setSavedVideoUrl} />
                        </Flex>
                    )}
                </Flex>
        
                {/* Buttons Container */}
                <Flex
                    justifyContent={"space-between"}
                    my={{base: "5rem", xl: "3rem", "2xl":"5rem"}}
                >
                    <Button bg={"white"} size="xs" color={"red"} py={"1.5rem"} px={"5rem"} boxShadow={"md"} borderColor={"red"} borderWidth={"1px"}
                        onClick={handleEndClick}
                        _hover={{
                            bg: "red",
                            color: "white",
                            boxShadow:"md"
                        }}
                    >
                        End
                    </Button>
                    {/* Conditionally show Start Analysis or Next Question */}
                    {currentQuestionIndex === questions.length - 1 ? (
                        <Button
                        bg="brand.blushPink"
                        size="xs"
                        color="white"
                        py="1.5rem"
                        px="5rem"
                        boxShadow="md"
                        onClick={handleAnalysisClick}
                        _hover={{
                            bg: "white",
                            color: "brand.blushPink",
                            border: "1px",
                            boxShadow: "md",
                        }}
                        >
                        Start Analysis
                        </Button>

                    ) : (
                        <Button
                        bg="brand.blushPink"
                        size="xs"
                        color="white"
                        py="1.5rem"
                        px="5rem"
                        boxShadow="md"
                        onClick={handleNextClick}
                        _hover={{
                            bg: "white",
                            color: "brand.blushPink",
                            border: "1px",
                            boxShadow: "md",
                        }}
                        >
                        Next Question
                        </Button>
                    )}
                </Flex>

            </Flex>
        </>
    );
}

const PollingResponse = async (_url) => {
    const _response = await new Promise((resolve) => {
      const GetProgress = async (tries = 0) => {
        if (tries === 20) {
          console.log("too long");
          resolve(false);
        }
        const _progress = await fetch(_url);
        const _progJson = await _progress.json();
        console.log("progress in json", _progJson);
        if (_progJson.progress === 2) {
          resolve(_progJson);
        } else {
          //try again
          await setTimeout(() => GetProgress(tries + 1), 2000);
        }
      };
  
      GetProgress();
    });
  
    return _response;
  };
  
