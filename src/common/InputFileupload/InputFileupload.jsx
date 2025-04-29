import React from "react";
const InputFileupload = () => {
  return (
    <>
      <div className="input_file_upload_wrapper">
        <div className="input_file_upload_box">
          <div className="input_file_upload_text_wrapper">
            <div className="upload-icon"></div>
            <h1>Upload Attachment</h1>
            <p>
              Attach files to provide additional context or support for your
              task .
            </p>
          </div>
          <div className="input_file_upload_input_wrapper">
            <input
              type="file"
              id="file-upload"
              className="input_file_upload_input"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InputFileupload;
