import React, { useState } from "react";
import { apiInstance } from "../api/api";
import { toast } from "react-toastify";

const StateComponent = ({ fileName, progress }) => {
  if (progress) {
    return (
      <div className="[background:#F2F7FF] flex justify-center flex-col items-center h-full w-full">
       
        <div>Uploading file...</div>
      </div>
    );
  } else if (fileName) {
    return (
      <div className="[background:#F2F7FF] flex justify-center flex-col items-center h-full w-full">
        <div>📃 {fileName}</div>
      </div>
    );
  }
  return (
    <div className="[background:#F2F7FF] flex justify-center flex-col items-center h-full w-full">
      <p className="text-6xl">☁️</p>
      <p className="text-lg font-semibold text-blue-600">
        {" "}
        Select a CSV File to upload
      </p>
      <p className="text-sm font-semibold text-blue-600">
        or drag and drop it here
      </p>
    </div>
  );
};

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(false);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      setProgress(true);
      const response = await apiInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      
      });
      toast("Uploaded Successfully", { type: "success" });
      setProgress(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast(`${error.response.data.errors[0].error}`, { type: "error" });
      setProgress(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg md:[width:500px]  px-10 py-10">
        <h1 className="text-3xl font-bold mb-4">Upload CSV </h1>
        <div
          className=" border-blue-600  h-52 relative rounded-lg overflow-hidden"
          style={{
            border: "2.5px dotted #1D4ED8",
          }}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className=" w-full h-full cursor-pointer absolute opacity-0"
          />
          <StateComponent fileName={file?.name} progress={progress} />
        </div>
        <button
          onClick={handleUpload}
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded"
        >
          Upload
        </button>
        <a href="/show">
          <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded">
            View Uploaded Data 😃
          </button>
        </a>
      </div>
    </div>
  );
};

export default UploadCSV;
