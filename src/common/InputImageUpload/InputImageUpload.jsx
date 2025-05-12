import React, {useState} from "react";
import "./inputimageupload.scss";
const InputImageUpload = ({label}) => {
  const [preview, setPreview] = useState("https://i.ibb.co/4pDNDk1/avatar.png");

  label = "Upload";
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file, "file");
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="input_image_wrapper">
        <div className="input_image_box">
          {/* Left Side: Image Preview */}
          <div className="input_image_box_left_side">
            <div className="image_wrapper">
              <img src={preview} alt="Profile Preview" />
            </div>
          </div>

          {/* Right Side: Upload Prompt */}
          <div className="input_image_box_right_side">
            <div className="input_image_box_wrapper">
              <p style={{color: "#2B2A3F"}}>
                Click to upload your profile picture
              </p>
              <p style={{color: "#86919B"}}>PNG, JPG (MAX 5 MB)</p>
              <label className="upload_label">
                <div className="upload_box">{label}</div>
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

export default InputImageUpload;
