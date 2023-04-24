import React from "react";
import "./index.css";

const Message = () => {
  return (
    <div className="messageWrapper">
      <div className="titleCompany">
        Pod<span className="changeCol font4">Sphere</span>
      </div>
      <div className="messageCompany">
        Listen to <span className="changeCol font5-6">10000+ podcasts</span>
      </div>
    </div>
  );
};

export default Message;
