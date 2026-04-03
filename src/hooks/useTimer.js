import { useState, useEffect, useRef } from 'react';

export function useTimer(initialMinutes = 55) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => (t <= 1 ? (setRunning(false), 0) : t - 1));
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [running, timeLeft]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = (mins) => { setTimeLeft(mins * 60); setRunning(false); };

  return { timeLeft, running, start, pause, reset };
}
