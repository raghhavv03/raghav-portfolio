import dynamic from 'next/dynamic';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Stats from '@/components/Stats';
import Certifications from '@/components/Certifications';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Terminal = dynamic(() => import('@/components/Terminal'), { ssr: false });
const CommandPalette = dynamic(() => import('@/components/CommandPalette'), { ssr: false });
const KeyboardShortcuts = dynamic(() => import('@/components/KeyboardShortcuts'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false });

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Terminal />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Stats />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <KeyboardShortcuts />
      <ChatWidget />
    </>
  );
}
