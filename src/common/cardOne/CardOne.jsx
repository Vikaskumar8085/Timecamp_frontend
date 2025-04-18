import React from "react";
import "./CardOne.scss";
const CardOne = () => {
  return (
    <div className="cardOne_container">
      <div className="cardone_row">
        <div className="cardoneleft">
          <i>icon</i>
        </div>
        <div className="cardoneright">
          <div className="right-heading-text">
            <h1>height</h1>
          </div>
          <div className="right-paragraph">lorem</div>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
