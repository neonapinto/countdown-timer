import React, { useEffect, useState } from 'react';
import './App.css';

interface ITimer{
  minutes: number;
  seconds: number;
}
function App() {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [time, setTime] = useState<ITimer>({
      minutes: 0,
      seconds: 0
  });
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [id, setId] = useState<any>(null);

  const ticker  = (minutes:number, seconds: number) =>{
      let newTime:any = new Date();
      newTime.setMinutes(newTime.getMinutes() + minutes);
      newTime.setSeconds(newTime.getSeconds() + seconds);

      var id = setInterval(() =>{
            let now:any = new Date();
            let diff = newTime - now;
            var min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var sec = Math.floor((diff % (1000 * 60)) / 1000);
            
            if(diff < 0){
                clearInterval(id);
                setId(null);
                setMinutes(0);
                setSeconds(0);
                setTime({...time, minutes: 0, seconds: 0  });
            }else{
                setTime({...time, minutes: min, seconds: sec  });
            }
        },1000);

        setId(id);
  }

  const handleStart = () =>{
    if(!id){
      setTime({...time, minutes: minutes, seconds: seconds});
      ticker(minutes, seconds + 1);
    }
  }

  const handleReset = () =>{
    setTime({...time, minutes: 0, seconds: 0});
    clearInterval(id);
    setMinutes(0);
    setSeconds(0)
    setId(null);
  }
  const handlePause = () =>{
    let paused = !isPaused;
      setIsPaused(paused);
      if(!paused){
        ticker(time.minutes, time.seconds);
      }
      else{
        clearInterval(id);
      }
  }

  return (
    <div className='container'>
      <div className="App">
        <h1>Timer</h1>
        <input type="number" value={minutes} onChange={e => setMinutes(Number(e.target.value))} />
        <input type="number" value={seconds} onChange={e => setSeconds(Number(e.target.value))} />
        <div className='btn-container'>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handlePause}>{isPaused ? 'Resume' : 'Pause'}</button>
        </div>
        <p>{`${time.minutes.toString().padStart(2,'0')}m:${time.seconds.toString().padStart(2,'0')}s`}</p>
      </div>
    </div>
  );
}

export default App;
