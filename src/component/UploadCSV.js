import React, { useState } from "react";
import axios from "axios";

const StateComponent = ({ fileName, progress }) => {
  if (progress) {
    return (
      <div className="[background:#F2F7FF] flex justify-center flex-col items-center h-full w-full">
        <div className="flex h-2 w-96 mb-4 overflow-hidden [background:#E4E4E4] rounded">
          <div
            style={{ width: `${progress}%` }}
            className="flex flex-col justify-center bg-blue-600 shadow-md text-center whitespace-nowrap text-white"
          ></div>
        </div>
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
  const [progress, setProgress] = useState(16);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
  };

  console.log(file);

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle the error
    }
  };

  return (
    <div className="bg-white rounded-lg px-10 py-10">
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
    </div>
  );
};

export default UploadCSV;
