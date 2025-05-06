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
              <input
                type="file"
                id="file-upload"
                className="input_file_upload_input"
                {...rest}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputFileupload;
