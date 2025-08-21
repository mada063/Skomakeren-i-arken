import LandingHero from "./home/components/LandingHero";
import TextSection from "./home/components/HomeSection";
import InfoSection from "./home/components/InfoSection";
import HomeBreak from "./home/components/HomeBreak";
import WhoHome from "./home/components/WhoHome";
import Openings from "@/components/Openings";

export default function Home() {
  return (
    <>
    <LandingHero />
    <TextSection />
    <InfoSection />
    <HomeBreak />
    <WhoHome />
    <Openings />
    </>
  );
}
