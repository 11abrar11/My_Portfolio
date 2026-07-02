import { Hero } from "@/components/Hero/Hero";
import { AIInterview } from "@/components/Interview/AIInterview";
import { ProjectStack } from "@/components/Projects/ProjectStack";
import { TechStack } from "@/components/TechStack/TechStack";
import { Timeline } from "@/components/Timeline/Timeline";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { CustomCursor } from "@/components/CustomCursor/CustomCursor";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <CustomCursor />
      <Navbar />
      <Hero />
      <AIInterview />
      <ProjectStack />
      <TechStack />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}
