import Navbar from "./sections/Navbar"
import Hero from "./sections/Hero";
import About from "./sections/About";
import Features from "./sections/Features";
import Story from "./sections/Story";

export default function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
    </main>
  );
}
