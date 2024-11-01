import FileUpload from "./FileUpload";

export default function ResumeUpload({ onFileUpload, uploadedFiles, setUploadedFiles, bucketName }) {
    return (
        <div>
            <h1>Upload Your Resume</h1>
            <FileUpload 
                title="Upload Resume"
                fileType="resume"
                onFileUpload={onFileUpload}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                bucketName="onward-resume"
            />
        </div>
    );
}
