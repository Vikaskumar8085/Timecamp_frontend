import React, {useState} from "react";
import "./inputimageupload.scss";
const InputImageUpload = () => {
  const [preview, setPreview] = useState("https://via.placeholder.com/150");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
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
              <p>Click to upload your profile picture</p>
              <label className="upload_label">
                <div className="upload_box">Supported: JPG, PNG, WEBP</div>
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
