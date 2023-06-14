import React from "react";
import { createPortal } from "react-dom";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 cursor-wait" />,
    document.body
  );
};

export default Loading;
