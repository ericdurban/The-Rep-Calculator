import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Calculator from './assets/components/calculator';

function App() {
  const [repDurationSec, setRepDurationSec] = useState('');
  const [repDurationMin, setRepDurationMin] = useState('');
  const [restDurationSec, setRestDurationSec] = useState('');
  const [restDurationMin, setRestDurationMin] = useState('');
  const [repCycleCount, setRepCycleCount] = useState('');
  const [totalWorkoutTime, setTotalWorkoutTime] = useState('00:00:00');

  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);

  const calculateWorkoutTime = (e) => {
    e.preventDefault();

    let repTimeInSec = 0;
    if (repDurationSec) repTimeInSec += parseInt(repDurationSec);
    if (repDurationMin) repTimeInSec += parseInt(repDurationMin) * 60;

    let restTimeInSec = 0;
    if (restDurationSec) restTimeInSec += parseInt(restDurationSec);
    if (restDurationMin) restTimeInSec += parseInt(restDurationMin) * 60;

    let cycleCount = 0;
    if (repCycleCount) cycleCount = parseInt(repCycleCount);

    const totalTimeInSec = (repTimeInSec + restTimeInSec) * cycleCount;

    const formattedTime = formatTimeWithMilliseconds(totalTimeInSec, 0);
    setTotalWorkoutTime(formattedTime);
    setTimeRemaining(totalTimeInSec);
    setMilliseconds(0);
  };

  const formatTimeWithMilliseconds = (totalSeconds, ms) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const millisecs = Math.floor(ms / 10);

    return [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
      millisecs.toString().padStart(2, '0')
    ].join(':');
  };

  useEffect(() => {
    let intervalId;

    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalId);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, timeRemaining]);


  useEffect(() => {
    let msIntervalId;

    if (isRunning) {
      msIntervalId = setInterval(() => {
        setMilliseconds((prevMs) => {
          if (prevMs >= 990) {
            return 0;
          }
          return prevMs + 10;
        });
      }, 10);
    }

    return () => {
      if (msIntervalId) clearInterval(msIntervalId);
    };
  }, [isRunning]);


  useEffect(() => {
    if (timeRemaining === 0 && !isRunning) {
      setMilliseconds(0);
      setTotalWorkoutTime('00:00:00');
    } else {
      setTotalWorkoutTime(formatTimeWithMilliseconds(timeRemaining, milliseconds));
    }
  }, [timeRemaining, milliseconds, isRunning]);

  const startTimer = () => {
    if (timeRemaining > 0) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  return (
    <>
      <div className='repCalculatorContainer'>
        <h1>Rep Cycle Calculator</h1>    
        <form className='repForm' onSubmit={calculateWorkoutTime}>
          <p className="placeholder1"></p>
          <p className="">Seconds:</p>
          <p className="">Minutes:</p>
          <label htmlFor="repTimeSec">Rep Duration</label>
          <input type="number" id="repTimeSec" value={repDurationSec} onChange={(e) => setRepDurationSec(e.target.value)} placeholder='-- Enter Rep Time --'></input>
          <input type="number" id="repTimeMin" value={repDurationMin} onChange={(e) => setRepDurationMin(e.target.value)} placeholder='-- Enter Rep Time --'></input>
          <label htmlFor="restTimeSec">Rest Duration</label>
          <input type="number" id="restTimeSec" value={restDurationSec} onChange={(e) => setRestDurationSec(e.target.value)} placeholder='-- Enter Rest Time --'></input>
          <input type="number" id="restTimeMin" value={restDurationMin} onChange={(e) => setRestDurationMin(e.target.value)} placeholder='-- Enter Rest Time --'></input>
          <label htmlFor="totalRepTime">Rep Cycle Duration</label>
          <input type="number" id="totalRepTime" value={repCycleCount} onChange={(e) => setRepCycleCount(e.target.value)} placeholder='-- Enter Rep Cycle --'></input>
          <p className='placeholder2'></p>
          <button type='submit' className='generateBtn'>Generate</button>
        </form>
        <div className='timerFunction'>
          <p className="descriptionText">*Total Workout Time*</p>
          <div className='buttonOverlap'>
            {isRunning ? (
              <>
                <button className='pauseBtn' onClick={pauseTimer} style={{zIndex: 2}} >Pause <FontAwesomeIcon icon={faPause} style={{color: 'white'}} /></button>
                <button className='startBtn' onClick={startTimer} style={{zIndex: 1}} >Start <FontAwesomeIcon icon={faPlay} style={{color: 'white'}} /></button>
              </>
            ) : (
              <>
                <button className='startBtn' onClick={startTimer} style={{zIndex: 2}} >Start <FontAwesomeIcon icon={faPlay} style={{color: 'white'}} /></button>
                <button className='pauseBtn' onClick={pauseTimer} style={{zIndex: 1}} >Pause <FontAwesomeIcon icon={faPause} style={{color: 'white'}} /></button>
              </>
            )}

          </div>
          <p className="countdown">{totalWorkoutTime}</p>
          <p className='placeholder3'></p>
        </div>
      </div>       
    </>
  );
}

export default App
