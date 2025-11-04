import React, { useState, useEffect } from 'react';

function Timer({ start }) {
  const [time, setTime] = useState(start || 0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (isRunning) {
      setInterval(() => {
        setTime(time + 1);
      }, 1000);
    }
  }, [isRunning, time]);

  return (
    <div>
      <h2>Timer: {time}</h2>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setTime(0)}>Reset</button>
    </div>
  );
}

export default Timer;
