import { useState, useEffect } from "react";

const useResponsiveWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [size, setSize] = useState({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    _2xl: false,
  });

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const newSize = {
      sm: width < 640,
      md: width >= 640 && width < 768,
      lg: width >= 768 && width < 1024,
      xl: width >= 1024 && width < 1280,
      _2xl: width >= 1280,
    };
    setSize(newSize);
  }, [width]);

  return size;
};

export default useResponsiveWidth;
