import config from "@/data/config.json";
import React, { useEffect, useState } from "react";

const formattedSeconds = (t: number) => {
  return t > 0 ? (t < 10 ? `0${t}` : `${t}`) : "00";
};
const getDays = (s: number) => {
  return Math.floor(s / (60 * 60 * 24));
};
const getHours = (s: number) => {
  return Math.floor((s / (60 * 60)) % 24);
};
const getMinutes = (s: number) => {
  return Math.floor((s / 60) % 60);
};
const getSeconds = (s: number) => {
  return Math.floor(s % 60);
};

const Timer: React.FC<{ secondsLeft: number }> = ({ secondsLeft }) => {
  return (
    <div className="flex flex-col items-center absolute bottom-2 left-2 right-2">
      <span className="bg-black bg-opacity-75 p-2">Mint Starting in</span>
      <div className="flex items-start space-x-4 bg-black bg-opacity-75 p-2">
        {/* <div className="flex flex-col items-center">
        <span className="font-semibold text-lg text-zui-yellow tracking-wide">
          {formattedSeconds(getDays(secondsLeft))}
        </span>
        <span className="mt-2 uppercase font-medium text-zui-white text-xs tracking-wide">
          Days
        </span>
      </div>
      <span className="font-semibold text-lg text-zui-yellow">:</span>
  */}
        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg text-zui-yellow tracking-wide">
            {formattedSeconds(getHours(secondsLeft))}
          </span>
          <span className="mt-2 font-medium text-zui-white text-xs">Hours</span>
        </div>
        <span className="font-semibold text-lg text-zui-yellow">:</span>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg text-zui-yellow tracking-wide">
            {formattedSeconds(getMinutes(secondsLeft))}
          </span>
          <span className="mt-2 font-medium text-zui-white text-xs">
            Minutes
          </span>
        </div>
        <span className="font-semibold text-lg text-zui-yellow">:</span>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg text-zui-yellow tracking-wide">
            {formattedSeconds(getSeconds(secondsLeft))}
          </span>
          <span className="mt-2 font-medium text-zui-white text-xs">
            Seconds
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
