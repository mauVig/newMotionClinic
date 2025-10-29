import { useEffect, useState } from "react";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [prevScroll, setPrevScroll] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsAtTop(currentScroll === 0);
      
      if (currentScroll <= 0) {
        setScrollDirection('up');
        return;
      }
      
      if (currentScroll > prevScroll) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setPrevScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScroll]);

  return { scrollDirection, isAtTop };
};

export default useScrollDirection;