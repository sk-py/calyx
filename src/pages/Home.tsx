import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import Main from "@/components/Main";
import NewProducts from "@/components/NewProducts";
import Main2 from "@/components/Main2";
import QuoteSection from "@/components/ui/QuoteSection";
import ImageFrames from "@/components/ui/ShowCase";
import GiftSection from "@/components/ui/GiftSection";
import CardStack from "@/components/ui/CardStack";
import HeroAbout from "@/components/ui/HeroAbout";

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home_box">
        <Main2 />
        <CardStack/>
        <QuoteSection/>
        <GiftSection/>
        <HeroAbout/>
        <NewProducts />
        <ImageFrames/>
      </div>
    </div>
  );
};

export default Home;
