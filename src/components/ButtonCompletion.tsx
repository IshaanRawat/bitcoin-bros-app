import { Check } from "@/icons";
import Image from "next/image";
import React from "react";

interface ButtonCompletionProps {
  imageSrc: string;
  children: string;
  isCompleted?: boolean;
}

const ButtonCompletion: React.FC<ButtonCompletionProps> = ({
  imageSrc,
  children,
  isCompleted,
}) => {
  return (
    <div className="py-4 px-5 flex bg-zinc-900 items-center justify-between">
      <div className="flex items-center space-x-4">
        <Image src={imageSrc} width={24} height={24} alt="bitcoin" />
        <span className="font-medium text-zinc-50 text-sm 2xl:text-base">
          {children}
        </span>
      </div>
      {isCompleted && <Check />}
    </div>
  );
};

export default ButtonCompletion;
