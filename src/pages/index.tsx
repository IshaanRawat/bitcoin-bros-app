/* eslint-disable @next/next/no-img-element */
import { Footer, Header, LoginSection, Page } from "@/components";
import { useAuth } from "@/hooks";
import { NextPage } from "next";

const Home: NextPage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Page>
      <Header />
      <section
        className={`flex-1 ${
          !isLoggedIn && "pt-[140px] lg:pt-[140px]"
        } p-4 lg:p-8 flex overflow-y-auto flex-col relative transition-all ease-in-out duration-200`}
      >
        <div className="flex flex-col max-w-md w-full">
          <h1 className="text-4xl lg:text-6xl font-bold text-zinc-100">
            Bitcoin Bros
          </h1>

          {isLoggedIn ? <></> : <LoginSection />}
        </div>
        <Footer />
      </section>
    </Page>
  );
};

export default Home;
