import { useState,useEffect } from "react";

export default function TypingText({ text = "", speed = 100 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return; // ✅ Prevent running when text is empty or undefined

    let index = 0;
    let cancelled = false;

    const type = () => {
      if (cancelled) return;
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
        setTimeout(type, speed);
      }
    };

    type();

    return () => {
      cancelled = true;
    };
  }, [text, speed]);

  return <span>{displayedText}</span>;
}