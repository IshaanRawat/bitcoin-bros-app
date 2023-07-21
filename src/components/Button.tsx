import Image from "next/image";
import React from "react";

interface ButtonProps {
  onClick?: () => void;
  imageSrc: string;
  children: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  imageSrc,
  children,
  disabled,
}) => {
  return (
    <button
      className="bg-z-white text-z-black w-full py-4 px-5 flex items-center disabled:cursor-not-allowed disabled:bg-z-gray space-x-4"
      onClick={onClick}
      disabled={disabled}
    >
      <Image src={imageSrc} width={24} height={24} alt="bitcoin" />
      <span className="font-medium text-base">{children}</span>
    </button>
  );
};

export default Button;
