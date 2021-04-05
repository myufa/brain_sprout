import { React, useState } from 'react'
import './App.css';


const range = (n1, n2) => {
  if (!n2) {
    return [...Array(n2).keys()];
  }
  return [...Array(n2).keys()].slice(n1, n2);
}

const updateFormValue = (setter) => {
  return (e) => {
    e.preventDefault()
    let val = e.currentTarget.value
    if (typeof(val) === 'string' && !isNaN(parseInt(val))) val = parseInt(val) 
    setter(e.currentTarget.value)
  }
}



function App() {
  const [focusTime, setFocusTime] = useState(20)
  const [meditationTime, setMeditationTime] = useState(5)
  const [timer, setTimer] = useState(undefined)
  var time_help;
  var newTime;
  var remaining_time;
  var isPaused = false;


  // const decrementTime = (time, timeSetter) => {
  //   console.log('time:', time)
  //   const decrementer = () => {
  //     timeSetter(time - 1)
  //     if (time < 1) {
  //       console.log('we done: ', time)
  //       window.clearInterval(timer)
  //     }
  //   }
  //   setTimer(window.setInterval(decrementer, 500))
  // }

  const startTimer = (amount) => {
    if (isPaused) {
      newTime = new Date(Date.parse(new Date()) + remaining_time);
      isPaused = false;
      runTimer(newTime);
    } else {
        clearInterval(time_help); 
        var current = Date.parse(new Date());
        newTime = new Date(current + amount*60*1000);
        runTimer(newTime);
      }
  }

  const runTimer = (newTime) => {
    function decrement(){
      document.getElementById("time").innerHTML = remain(newTime).minutes + "m " + remain(newTime).seconds + "s ";  
      if(remain(newTime).total<=0){ 
        clearInterval(time_help); 
      }
    }
    decrement();
    time_help = setInterval(decrement,1000);
  }

  function remain(newTime){
    var total = Date.parse(newTime) - Date.parse(new Date());
    var seconds = Math.floor((total/1000)% 60);
    var minutes = Math.floor((total/1000/60)%60);
    return {'total':total, 'minutes':minutes, 'seconds':seconds};
  }

  
  const stopTimer = () => {
    if (!isPaused) {
      clearInterval(time_help);
      remaining_time = remain(newTime).total;
      isPaused = true;
    }
  }


  const resetTimer = () => {
    clearInterval(time_help);
    document.getElementById("time").innerHTML = "";
  }


  return (
    <div className="App">
      <h1>Welcome to Brain Sprout!</h1>
      <h3>Set Focus Time</h3>
      <select name="focusTime" defaultValue={20} onChange={updateFormValue(setFocusTime)}>
          {range(1,31).map(n=>
            <option value={n}>{n}min</option>
          )}
      </select>
      <h1 id = "time"></h1>
      <select name="meditationTime" defaultValue={5} onChange={updateFormValue(setMeditationTime)}>
          {range(1,16).map(n=>
            <option key={n} value={n}>{n}min</option>
          )}
      </select>
      <h1>{meditationTime}min</h1>
      <div className='startButton' onClick={()=>startTimer(focusTime)}>start</div>
      <div className='pauseButton' onClick={()=>stopTimer()}>pause</div>
      <div className='resetButton' onClick={()=>resetTimer()}>reset</div>
    </div>  
  );
}

export default App;
