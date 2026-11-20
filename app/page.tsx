import { Hero } from "@/components/home/Hero";
import { StepsSection } from "@/components/home/StepsSection";
import { FeaturedGuides } from "@/components/home/FeaturedGuides";
import { MentorCta } from "@/components/home/MentorCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StepsSection />
      <FeaturedGuides />
      <MentorCta />
    </>
  );
}
