import { TiLocationArrow } from "react-icons/ti";
import Button from "../components/Button";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItem = ["Nexus", "Vault", "Prologue", "About", "Contact"];

export default function Navbar() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    const isScrollingDown = currentScrollY > lastScrollY;
    const isAtTop = currentScrollY === 0;

    setIsNavbarVisible(isAtTop || !isScrollingDown);
    navContainerRef.current.classList.toggle("floating-nav", !isAtTop);

    setLastScrollY(currentScrollY);
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavbarVisible ? 0 : -100,
      opacity: isNavbarVisible ? 1 : 0,
      duration: 0.2,
    })
  }, [isNavbarVisible])

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transistion-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex justify-between items-center size-full p-4">
          <div className="flex item-center gap-7">
            <a href="/">
              <img
                src="/img/logo.png"
                alt="logo"
                className="w-10 cursor-pointer"
              />
            </a>
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center juctify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItem.map((item) => (
                <a
                  className="nav-hover-btn"
                  key={item}
                  href={`#${item.toLowerCase()}`}
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              className="ml-10  flex items-center space-x-0.5 h-5"
              onClick={toggleAudioIndicator}
            >
              <audio
                src="/audio/loop.mp3"
                className="hidden"
                loop
                ref={audioElementRef}
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  } `}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
