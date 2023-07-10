import { Check, Circle } from "@/icons";
import React from "react";

interface StepProps {
  state: "disabled" | "active" | "completed";
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ state, children }) => {
  return (
    <div
      className={`-ml-5 my-4 ${
        state === "disabled" ? "opacity-25 pointer-events-none" : ""
      } flex items-start`}
    >
      <span className="py-3">
        {state === "completed" ? (
          <Check className="w-8 h-8" />
        ) : state === "active" ? (
          <Circle className="w-8 h-8" fill="#FFF" />
        ) : (
          <Circle className="w-8 h-8" fill="#FFF" />
        )}
      </span>
      <div className="ml-6">{children}</div>
    </div>
  );
};

export default Step;
