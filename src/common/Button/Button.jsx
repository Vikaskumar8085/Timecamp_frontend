import {Button} from "@mui/material";
import React from "react";

function Button({onclick, children, arialabel, type, ...rest}) {
  return (
    <>
      <div className="btn_wrapper">
        <Button onClick={onclick} type={type} aria-label={arialabel} {...rest}>
          {children}
        </Button>
      </div>
    </>
  );
}

export default Button;
