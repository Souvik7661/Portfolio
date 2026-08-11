import { useState, useEffect } from 'react';

export interface TypewriterResult {
  displayed: string;
  done: boolean;
}

export function useTypewriter(
  text: string,
  speed: number = 38,
  startDelay: number = 600
): TypewriterResult {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let charIndex = 0;
    let intervalId: NodeJS.Timeout;

    const delayTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayed(text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
