import React, { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = import.meta.env.PROJECT_ID;
const projectSecretKey = import.meta.env.PROJECT_SECRET_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const UploadEvidence = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // Upload files
    try {
      const result = await ipfs.add(file);

      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        {
          cid: result.cid.toString(),
          path: result.path,
          type: file.type,
        },
      ]);
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
    }

    form.reset();
  };

  return (
    <div>
      <div>
        {ipfs ? (
          <div>
            <h1>Upload Evidence</h1>
            <form onSubmit={onSubmitHandler}>
              <label htmlFor="file-upload" className="custom-file-upload">
                Select File
              </label>
              <input id="file-upload" type="file" name="file" />
              <button className="button" type="submit">
                Upload file
              </button>
            </form>
          </div>
        ) : null}
        <div className="data">
          {uploadedFiles.map((file, index) => (
            <div key={index}>
              {file.type.startsWith("image/") && (
                <img
                  className="image"
                  alt={`Uploaded #${index + 1}`}
                  src={"https://immutable.infura-ipfs.io/ipfs/" + file.path}
                  style={{ maxWidth: "400px", margin: "15px" }}
                />
              )}
              {file.type.startsWith("video/") && (
                <video
                  className="video"
                  controls
                  src={"https://immutable.infura-ipfs.io/ipfs/" + file.path}
                  style={{ maxWidth: "400px", margin: "15px" }}
                />
              )}
              {file.type === "application/pdf" && (
                <embed
                  className="pdf"
                  src={"https://immutable.infura-ipfs.io/ipfs/" + file.path}
                  style={{ width: "100%", height: "600px" }}
                  type="application/pdf"
                />
              )}
              {file.type.startsWith("text/") && (
                <iframe
                  className="text"
                  src={"https://immutable.infura-ipfs.io/ipfs/" + file.path}
                  style={{ width: "100%", height: "600px" }}
                />
              )}

              <h4>Link to IPFS:</h4>
              <a
                href={"https://immutable.infura-ipfs.io/ipfs/" + file.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{"https://immutable.infura-ipfs.io/ipfs/" + file.path}</h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadEvidence;
