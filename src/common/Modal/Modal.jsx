import React from "react";

const Modal = ({IsOpen, setIsOpen, children}) => {
  return <>{children}</>;
};

export default React.memo(Modal);
