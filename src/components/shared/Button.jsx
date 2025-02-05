import React from "react";

export default function Button({ className = "", value, onClick, ...props }) {
  return (
    <button className={className} onClick={onClick} {...props}>
      {value}
    </button>
  );
}
