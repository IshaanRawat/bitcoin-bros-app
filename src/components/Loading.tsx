import React from "react";
import { createPortal } from "react-dom";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return typeof document != "undefined" ? (
    createPortal(
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 cursor-wait" />,
      document.body
    )
  ) : (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 cursor-wait" />
  );
};

export default Loading;
