import FileUpload from "./FileUpload";

export default function JobPostUpload({ onFileUpload, uploadedFiles, setUploadedFiles, bucketName }) {
    return (
        <div>
            <h1>Upload Job Posting</h1>
            <FileUpload 
                title="Upload Job Posting"
                fileType="job-posting"
                onFileUpload={onFileUpload}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                bucketName="onward-job-posting"
            />
        </div>
    );
}
