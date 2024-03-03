import { useEffect, useState } from "react";
/**
 *
 * @returns client width and height
 */
export default function useWindowSize() {
  const isSSR = typeof window === 'undefined';
  const [windowSize, setWindowSize] = useState({
    width: isSSR ? 1200 : document.documentElement.clientWidth,
    height: isSSR ? 800 : document.documentElement.clientHeight,
  });

  function changeWindowSize() {
    setWindowSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }

  useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}
