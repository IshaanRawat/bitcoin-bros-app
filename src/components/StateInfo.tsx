import { Check, Error, Uncheck } from "@/icons";
import React from "react";

interface StateInfoProps {
  state: "completed" | "pending" | "error" | "loading";
  children: string;
}

const StateInfo: React.FC<StateInfoProps> = ({ state, children }) => {
  return (
    <div className="flex items-center h-9 justify-between">
      <div className="flex items-center space-x-4">
        {state === "completed" ? (
          <Check className="w-9 h-9" fill="#66DF48" />
        ) : state === "loading" ? (
          <div className="relative left-4 mr-9">
            <span className="bit-loader-white" />
          </div>
        ) : state === "error" ? (
          <Error className="w-9 h-9" />
        ) : (
          <Uncheck className="w-9 h-9" />
        )}
        <span
          className={`text-base ${
            state === "completed"
              ? "text-z-green"
              : state === "loading"
              ? "text-z-white"
              : state === "error"
              ? "text-z-red"
              : "text-z-gray"
          }`}
        >
          {children}
        </span>
      </div>
    </div>
  );
};

export default StateInfo;
