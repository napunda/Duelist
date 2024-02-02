import HeroSection from "./components/HeroSection";
import FeaturesCards from "./components/FeaturesCards";
import FaqSection from "./components/FaqSection";
import { Container } from "@mantine/core";

export default function HomePage() {
  return (
    <Container size="xl" style={{ overflow: "hidden" }}>
      <HeroSection />
      <FeaturesCards />
      <FaqSection />
    </Container>
  );
}
