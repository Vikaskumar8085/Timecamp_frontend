import React from "react";

const InputFileupload = () => {
  return (
    <>
      <div className="input_wrapper">
        <label htmlFor={labelText}>{labelText}</label>
        <div className="input_box">
          <input
            type={type}
            value={value}
            onChange={onChange}
            className={className}
            placeholder={placeholder}
            {...rest}
          />
        </div>
      </div>
    </>
  );
};

export default InputFileupload;
