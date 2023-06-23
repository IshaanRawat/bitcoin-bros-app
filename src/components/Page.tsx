import { Space_Grotesk } from "next/font/google";
import React, { useEffect, useRef } from "react";
import MetaTags from "./MetaTags";

interface PageProps {
  children: React.ReactNode[];
}

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Page: React.FC<PageProps> = ({ children }) => {
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.onclick = () => {
      if (backgroundVideoRef.current) {
        if (backgroundVideoRef.current.paused) {
          backgroundVideoRef.current.play();
        }
      }
      if (audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.volume = 0.25;
          audioRef.current.play();
        }
      }
    };
  }, []);

  return (
    <main
      className={`flex flex-col justify-between bg-black h-screen overflow-hidden w-screen ${spaceGrotesk.className}`}
    >
      <MetaTags />
      <audio ref={audioRef} controls={false} playsInline autoPlay>
        <source
          src="https://static.cdn.zo.xyz/web-media/bb-background-music.mp3"
          type="audio/mpeg"
        />
      </audio>
      <video
        ref={backgroundVideoRef}
        autoPlay
        loop
        controls={false}
        playsInline
        muted
        className="fixed z-0 inset-0 w-full h-full bg-[#06041e] object-bottom landscape:object-cover pointer-events-none"
      >
        <source
          src="https://cdn.discordapp.com/attachments/1115714210308050954/1118238055040553001/bikers_loop_06_1.mp4"
          type="video/mp4"
        />
      </video>
      {children}
    </main>
  );
};

export default Page;
