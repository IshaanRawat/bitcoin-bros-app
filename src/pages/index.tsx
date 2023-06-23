/* eslint-disable @next/next/no-img-element */
import { Footer, Header, Onboarding, Page } from "@/components";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Page>
      <Header />
      <section className="flex-1 pt-[140px] lg:pt-[140px] p-4 lg:p-8 flex overflow-y-auto flex-col relative">
        <div className="flex flex-col max-w-md w-full">
          <h1 className="text-4xl lg:text-6xl font-bold text-zinc-100">
            Bitcoin Bros
          </h1>

          <Onboarding />
        </div>
        <Footer />
      </section>
    </Page>
  );
};

export default Home;
