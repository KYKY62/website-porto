import { useEffect, useState } from 'react';

const firstLine = 'Rizky Akbar';
const secondLine = 'Siregar';
const totalCharacters = firstLine.length + secondLine.length;

export default function TypingName() {
  const [visibleCharacters, setVisibleCharacters] = useState(totalCharacters);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;

    function startTyping() {
      window.clearTimeout(timer);
      if (motionPreference.matches) {
        setVisibleCharacters(totalCharacters);
        return;
      }

      let count = 0;
      setVisibleCharacters(0);
      function typeNextCharacter() {
        count += 1;
        setVisibleCharacters(count);
        if (count < totalCharacters) {
          timer = window.setTimeout(typeNextCharacter, count === firstLine.length ? 280 : 110);
        }
      }
      timer = window.setTimeout(typeNextCharacter, 350);
    }

    startTyping();
    motionPreference.addEventListener('change', startTyping);
    return () => {
      window.clearTimeout(timer);
      motionPreference.removeEventListener('change', startTyping);
    };
  }, []);

  const onSecondLine = visibleCharacters > firstLine.length;
  return (
    <h1 className="typing-name" aria-label="Rizky Akbar Siregar">
      <span className="typing-line" aria-hidden="true">
        {firstLine.slice(0, visibleCharacters)}
        {!onSecondLine && <span className="pixel-cursor">_</span>}
      </span>
      <span className="typing-line typing-surname" aria-hidden="true">
        {secondLine.slice(0, Math.max(0, visibleCharacters - firstLine.length))}
        {onSecondLine && <span className="pixel-cursor">_</span>}
      </span>
    </h1>
  );
}
