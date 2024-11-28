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
    const [responseURLs, setResponseURLs] = useState({ resumes: [], answers: [] })


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
    
            const file = new Blob([JSON.stringify(answers, null, 2)], { type: "text/plain" });
    
            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file, { upsert: true });
    
            if (uploadError) throw new Error(uploadError.message);
    
            console.log("All answers saved successfully to a single file.");
    
            // Fetch the public URL for the uploaded file
            const { data: publicUrlData, error: publicUrlError } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);
    
            if (publicUrlError) throw new Error(publicUrlError.message);

            const publicUrl = publicUrlData.publicUrl;
            localStorage.setItem("allAnswersPublicUrl", publicUrl);
            console.log("Public URL saved to local storage:", publicUrl);
    
            return publicUrl;
        } catch (err) {
            console.error("Error saving all answers:", err.message);
        }
    };
    
    // API stuff
    const UploadFiles = async (resumes = [], answers = []) => {
        try {
          const uploadPromises = [];
    
          if (resumes.length > 0) {
            console.log("Uploading resumes:", resumes.map((file) => file.name));
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

          if (answers.length > 0) {
            console.log("Uploading answers:", answers.map((file) => file.name));
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
    
    // API prompts
    const GenerateTalkingPoints = async (resumes) => {
        try {
            const savedQuestions = JSON.parse(localStorage.getItem("questions"));

            if (!savedQuestions || savedQuestions.length === 0) {
                throw new Error("No questions found. Please refresh or generate questions before analyzing.");
            }

            const talkingPointsPrompt = `Generate an array of talking points that align resume to the job description in valid JSON format. 
            Include the following interview questions: ${JSON.stringify(savedQuestions)}. 
            Return only a JSON array. Avoid any additional text, formatting, or line breaks outside of the JSON array. 
            The JSON must be valid and parsable where each object follows this structure:
                - "talkingPoints": A talking point relevant to aligning resumes with the job description.
                - "category": Behavioral Question, Situational Question, Technical Question, etc.
                Do not include \`\`\`json`;

            console.log("Talking Points Prompt:", talkingPointsPrompt);

            // make API call
            const resumeResponse = await fetch("https://api.roughlyai.com/ttfiles/api/prompt_response", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    handler: "api_call",
                    key: "Onward/Resumes/",
                    api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
                    question: talkingPointsPrompt,
                    numsimular: 5, 
                }),
            });

            const resumeTalkingPoints = await PollingResponse(
                (
                    await resumeResponse.json()
                ).data
            );
            console.log("Parsed Talking Points:", resumeTalkingPoints);

            return { resumeTalkingPoints };
        } catch (error) {
            console.error("Error generating talking points:", error);
            throw error;
        }
    };

    const GenerateAnalysis = async (answers) => {
        try {
            const savedQuestions = JSON.parse(localStorage.getItem("questions"));

            if (!savedQuestions || savedQuestions.length === 0) {
                throw new Error("No questions found. Please refresh or generate questions before analyzing.");
            }

            const analysisPrompt = `You will evaluate interview answers based on the following criteria:
                1. **Compare the Answer to the Question**:
                - Check if the answer sufficiently addresses the main focus and additional context/talking points of the question.
                - Highlight areas where the answer deviates from or fails to address the intent of the question.

                2. **Evaluate Based on the STAR Method**:
                - Ensure the answer includes all elements of the STAR method (Situation, Task, Action, Result).
                - Identify missing or underdeveloped STAR components and suggest how the answer could better incorporate them.

                3. **Keyword Highlighting**:
                - Highlight key words or phrases in the answer that are directly relevant to the question or demonstrate alignment with the talking points.

                4. **Filler Words**:
                - Identify and highlight filler words (e.g., "um," "uh," "like," "you know") or overly repetitive phrases that may detract from the clarity of the response.

                5. **Constructive Feedback**:
                - Provide specific feedback on how to improve the answer for greater efficiency and alignment with the question's intent.
                - Suggest ways to be more concise or impactful while still addressing the question thoroughly.

                **Input Format**:
                - **Question**: (Include any additional information or talking points)
                - **Answer**: (The interview response)
                - **Talking Points**: (List of specific points that the answer should ideally address)

                **Output Format**:
                - **Evaluation of Alignment with the Question**:
                - [Your Analysis Here]
                - **STAR Method Evaluation**:
                - **Situation**: [Present/Missing]
                - **Task**: [Present/Missing]
                - **Action**: [Present/Missing]
                - **Result**: [Present/Missing]
                - **Highlighted Key Words**:
                - [List of highlighted words/phrases]
                - **Highlighted Filler Words**:
                - [List of filler words/phrases]
                - **Constructive Feedback**:
                - [Your Feedback Here]

                **Example Input**:
                {
                "question": "Can you tell us about a time you resolved a conflict at work? Be sure to focus on the steps you took and the outcome.",
                "answer": "Um, well, there was this one time when, uh, two of my team members were arguing about a project deadline. I think I, like, stepped in and tried to mediate. I told them, you know, to focus on the client’s needs, and eventually, they sorted it out.",
                "talkingPoints": [
                    "Emphasis on conflict resolution skills.",
                    "Focus on specific actions taken.",
                    "Highlight positive outcomes."
                ]
                }

                **Example Output**:
                {
                "evaluationOfAlignment": "The answer touches on a conflict but lacks detail on the steps taken and the outcome.",
                "starMethodEvaluation": {
                    "situation": "Present but vague",
                    "task": "Missing",
                    "action": "Partially described but lacks detail",
                    "result": "Missing entirely"
                },
                "highlightedKeywords": ["conflict", "mediate", "client’s needs"],
                "highlightedFillerWords": ["um", "uh", "like", "you know"],
                "constructiveFeedback": "Provide more details about the steps you took to mediate the conflict and the specific outcome of your actions. For example, describe how you identified the client’s needs and used them to de-escalate the conflict. Avoid filler words for more concise communication."
                }
                return in json format without any additional formatting and backticks.`;

            console.log("Talking Points Prompt:", analysisPrompt);

            // Make API call
            const analysisResponse = await fetch("https://api.roughlyai.com/ttfiles/api/prompt_response", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    handler: "api_call",
                    key: "Onward/Resumes/",
                    api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
                    question: analysisPrompt,
                    numsimular: 5, 
                }),
            });

            const answerAnalysis = await PollingResponse(
                (
                    await analysisResponse.json()
                ).data
            );

            console.log("Parsed Talking Points:", analysisPrompt);

            return { answerAnalysis };
        } catch (error) {
            console.error("Error generating analysis:", error);
            throw error;
        }
    };

    // button handlers
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
        const videoURL = savedVideoUrl;
        const transcriptionText = transcription;

        const transcriptionEntry = { text: transcriptionText, video_id: videoURL };
        const { error } = await supabase
        .from("transcriptions")
        .insert(transcriptionEntry);

        if (error) throw error;

        await saveAllAnswersToFile();

        const answersPublicUrl = await saveAllAnswersToFile();
        if (!answersPublicUrl) {
            throw new Error("Failed to save answers file and retrieve its public URL.");
        }
        console.log("Answers public URL:", answersPublicUrl);

        const storedFiles = JSON.parse(localStorage.getItem("selectedFileURLs"));
        const resumeUrls = storedFiles?.resumes?.map((resume) => ({
            url: resume.url,
            name: resume.name,
        }));

        if (!resumeUrls || resumeUrls.length === 0) {
            throw new Error("No resumes found in selected files.");
        }

        console.log("Resume URLs:", resumeUrls);

        const urls = {
            resumes: resumeUrls,
            answers: [{ url: answersPublicUrl, name: `all-answers-${localStorage.getItem("sessionId")}.txt` }],
        };

        const uploadProgress = await UploadFiles(urls.resumes, urls.answers);
        console.log("Upload progress:", uploadProgress);

        const savedQuestions = JSON.parse(localStorage.getItem("questions"));
            if (!savedQuestions || savedQuestions.length === 0) {
                throw new Error("No questions found. Please refresh or generate questions before analyzing.");
            }

        // Generate talking points using the uploaded resume URLs
        const { resumeTalkingPoints } = await GenerateTalkingPoints(urls.resumes);
            console.log("Generated Talking Points:", resumeTalkingPoints);

        // Generate analysis using the uploaded answers URL
        const { answerAnalysis } = await GenerateAnalysis(urls.answers);
            console.log("Generated Analysis:", answerAnalysis);

        router.push({ pathname: "/practiceOverview" });
    };
    

  return (
    <>
        <Flex
            flexDirection="row"
            gap="2rem"
            mx="auto"
            justifyContent="center"
            alignItems="flex-start"
            width="100%"
            maxWidth={showVideo ? "100%" : "60%"}
        >
        
            {/* Question and Answer Section */}
            <Box
                width="100%"
                maxW={showVideo ? "60%" : "100%"}
                transition="width 0.3s ease"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                {/* Display Question */}
                <QuestionPractice question={currentQuestion}/>
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
                        <RecordCamera isRecordingAvailable={true} setSavedVideoUrl={(url) => handleVideoSave(url)} />

                        <Button
                            bg="brand.blushPink"
                            size="xs"
                            color="white"
                            py="1.5rem"
                            px="5rem"
                            boxShadow="md"
                            onClick={handleAnalysisClick}
                            _hover={{
                                bg: 'white',
                                color: 'brand.blushPink',
                                border: '1px',
                                boxShadow: 'md',
                            }}
                        >
                            Start Analysis
                        </Button>
                        <Button
                            bg="brand.blushPink"
                            size="xs"
                            color="white"
                            py="1.5rem"
                            px="5rem"
                            boxShadow="md"
                            onClick={handleNextClick}
                            _hover={{
                                bg: 'white',
                                color: 'brand.blushPink',
                                border: '1px',
                                boxShadow: 'md',
                            }}
                        >
                            Next Question
                        </Button>
                    </Flex>
                )}
            </Flex>
        </>
    );
}

const PollingResponse = async (_url) => {
    const _response = await new Promise((resolve) => {
      const GetProgress = async (tries = 0) => {
        if (tries === 10) {
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
  
