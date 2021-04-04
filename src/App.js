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

  const decrementTime = (time, timeSetter) => {
    console.log('time:', time)
    const decrementer = () => {
      timeSetter(time - 1)
      if (time < 1) {
        console.log('we done: ', time)
        window.clearInterval(timer)
      }
    }
    setTimer(window.setInterval(decrementer, 10))
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
      <h1>{focusTime}min</h1>
      <select name="meditationTime" defaultValue={5} onChange={updateFormValue(setMeditationTime)}>
          {range(1,16).map(n=>
            <option key={n} value={n}>{n}min</option>
          )}
      </select>
      <h1>{meditationTime}min</h1>
      <div className='startButton' onClick={()=>decrementTime(focusTime, setFocusTime)}>start</div>
      <div className='pauseButton' onClick={undefined}>pause</div>
      <div className='resetButton' onClick={undefined}>reset</div>
</div>
  );
}

export default App;
