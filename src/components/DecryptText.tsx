import React, { useEffect, useState, useRef } from 'react';
import { sound } from '../utils/sound';

interface DecryptTextProps {
  text: string;
  className?: string;
  speed?: number;
  revealDelay?: number;
  chars?: string;
  playSound?: boolean;
}

export const DecryptText: React.FC<DecryptTextProps> = ({
  text,
  className = '',
  speed = 35,
  revealDelay = 40,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}',
  playSound = false
}) => {
  const [displayText, setDisplayText] = useState(text);
  const isHovered = useRef(false);

  const startDecrypt = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });

      if (playSound && Math.random() > 0.6) {
        sound.playTerminalKey();
      }

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2.5;
    }, speed);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startDecrypt();
    }, revealDelay);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <span
      className={`inline-block transition-colors duration-200 cursor-default ${className}`}
      onMouseEnter={() => {
        if (!isHovered.current) {
          isHovered.current = true;
          startDecrypt();
          sound.playHover();
        }
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    >
      {displayText}
    </span>
  );
};
