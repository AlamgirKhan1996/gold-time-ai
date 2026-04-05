import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustIndicators from "@/components/TrustIndicators";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import BestSellers from "@/components/BestSellers";
import SocialProof from "@/components/SocialProof";
import SmartRecommendations from "@/components/SmartRecommendations";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <TrustIndicators />
    <FeaturedProducts />
    <WhyChooseUs />
    <BestSellers />
    <SocialProof />
    <SmartRecommendations />
    <CTASection />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Index;
