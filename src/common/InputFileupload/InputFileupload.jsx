import React from "react";
const InputFileupload = ({paragraph, title, ...rest}) => {
  return (
    <>
      <div className="input_file_upload_wrapper">
        <div className="input_file_upload_box_wrapper">
          <div className="input_file_upload_box">
            <div className="input_file_upload_text_wrapper">
              <div className="upload-icon"></div>
              <h1>{title}</h1>
              <p>
                {paragraph ||
                  "   Attach files to provide additional context or support for your task ."}
              </p>
            </div>
            <div className="input_file_upload_input_wrapper">
              <label className="input_file_upload_input_box">
                <div className="text-paragraph">Select File</div>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputFileupload;
