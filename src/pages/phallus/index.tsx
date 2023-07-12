import { Footer, Header, Page, PhallusMint } from "@/components";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const meta = {
  title: "Bitcoin Inscribed Phalluses - 666",
  description:
    "The universal symbol of humanity, inscribed on the Bitcoin blockchain.",
  shortcutIcon: "https://static.cdn.zo.xyz/media/phallus.png",
  image: "https://static.cdn.zo.xyz/media/banner-phallus.png",
};

const Phallus: NextPage = () => {
  const [hasMinted, setMinted] = useState(true);

  return (
    <Page noVideo metaTags={meta}>
      <div className="fixed top-0 inset-x-0">
        <Header />
      </div>
      {!hasMinted ? (
        <section className="w-screen h-full lg:h-screen overflow-auto lg:overflow-hidden lg:flex lg:items-stretch bg-black">
          <section className="flex-1 flex flex-col p-4 lg:p-8">
            <div className="lg:mt-24 mt-8 overflow-y-auto">
              <h1 className="text-3xl lg:text-6xl font-bold">
                Bitcoin Inscribed Phalluses 666
              </h1>
              <h2 className="font-semibold text-xl lg:text-3xl mt-8">
                Big Bro says...
              </h2>
              <p className="text-base lg:text-lg mt-4">
                The vastness of the cosmos is reflected in the universe of
                digital assets. Value lies in sharing and enriching our
                collective experiences, not hoarding. The future holds a world
                where a &ldquo;Meme Coin&rdquo; can rival a blue-chip stock,
                where a digital kitten carries more clout than a luxury car.
                It&apos;s weird, wacky, wonderful, and unstoppable. 🌌 🚀
                <br />
                <br />
                As we step into this brave new world with open minds and hearts,
                I ask you, are you ready to board the rocket ship? Are you ready
                to unlock new universes of value? If the answer is yes, then
                let&apos;s inscribe the most important symbol of humanity on the
                Bitcoin. The symbol crossing languages, cultures and
                geographies, from caves, bathroom walls to now Bitcoin. Inscribe
                these Phalluses on Bitcoin, and let&apos;s begin the revolution
                🚀 🌍
                <br />
                <br />~ Zo Zo Zo ~
              </p>
            </div>
          </section>
          <section className="flex-1 flex-shrink-0 h-screen lg:h-auto flex flex-col overflow-y-auto justify-center items-center bg-[url('https://cdn.discordapp.com/attachments/1115714210308050954/1124317149234741309/BIP666.png')]">
            <div className="w-full h-full p-4 lg:p-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
              <div className="bg-black relative z-20">
                <video
                  className="w-full lg:w-[400px] h-[400px] object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="https://media.discordapp.net/attachments/1115714210308050954/1124317149612212315/for_mint_website_-_3.mp4"
                    type="video/mp4"
                  />
                </video>
                <PhallusMint setMinted={setMinted} />
              </div>
            </div>
          </section>
          <Footer />
        </section>
      ) : (
        <section className="max-w-7xl w-full mx-auto h-screen bg-black lg:flex">
          <section className="flex-1 flex justify-center flex-col p-4 lg:p-8">
            <div className="overflow-y-auto">
              <h1 className="text-3xl lg:text-5xl font-bold">
                Congratulations for
                <br />
                holding your phallus ✊
              </h1>
              <button className="bg-zinc-100 self-start max-w-sm w-full mt-10 py-4 px-6 flex items-center disabled:cursor-not-allowed disabled:opacity-50 space-x-4">
                <Image
                  src="https://static.cdn.zo.xyz/media/phallus.png"
                  width={24}
                  className="rounded-full"
                  height={24}
                  alt="bitcoin"
                />
                <span className="font-medium text-black">View Phallus</span>
              </button>
              <p className="mt-8">
                With super excitement, we&apos;ve
                <br />
                tweeted your arrival.
              </p>
            </div>
          </section>
          <section className="flex-1 flex-shrink-0 h-screen lg:h-auto flex flex-col overflow-y-auto justify-center items-center">
            <div className="bg-black relative z-20">
              <video
                className="w-full lg:w-[400px] h-[400px] object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://media.discordapp.net/attachments/1115714210308050954/1124317149612212315/for_mint_website_-_3.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </section>
          <Footer />
        </section>
      )}
    </Page>
  );
};

export default Phallus;
