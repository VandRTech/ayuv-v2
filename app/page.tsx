import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FooterSection } from "@/components/footer-section"
import { SpaceBackground } from "@/components/space-background"
import { AegisShowcaseSection } from "@/components/aegis-showcase-section"

export default function HomePage() {
  return (
    <div className="relative bg-black">
      <SpaceBackground />
      <div className="relative z-10">
        <Navigation />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <AegisShowcaseSection />
          <FooterSection />
        </main>
      </div>
    </div>
  )
}
