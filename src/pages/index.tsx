/* eslint-disable @next/next/no-img-element */
import { Footer, Header, Onboarding, Page } from "@/components";
import { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [isOnboarded, setOnboarded] = useState<boolean>(false);

  return (
    <Page>
      <Header />
      <section
        className={`flex-1 ${
          !isOnboarded && "pt-[140px] lg:pt-[140px]"
        } p-4 lg:p-8 flex overflow-y-auto flex-col relative transition-all ease-in-out duration-200`}
      >
        <div className="flex flex-col max-w-md w-full">
          <h1 className="text-4xl lg:text-6xl font-bold text-zinc-100">
            Bitcoin Bros
          </h1>

          <Onboarding setOnboarded={setOnboarded} />
        </div>
        <Footer />
      </section>
    </Page>
  );
};

export default Home;
