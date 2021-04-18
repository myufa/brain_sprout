import { React, useState, useRef } from 'react'
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

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

const meditationVideoUrls = [
  'https://www.youtube.com/embed/zSkFFW--Ma0',
  'https://www.youtube.com/embed/6kVVrE_sCNA',
  'https://www.youtube.com/embed/F7PxEy5IyV4',
  'https://www.youtube.com/embed/inpok4MKVLM',
  'https://www.youtube.com/embed/O-6f5wQXSu8',
  'https://www.youtube.com/embed/z6X5oEIg6Ak',
  'https://www.youtube.com/embed/j7d5Plai03g'
]

function App() {
  const [focusTime, setFocusTime] = useState(20)
  const [meditationTime, setMeditationTime] = useState(5)
  var time_help;
  var newTime;
  var remaining_time;
  var isPaused = false;
  const isRunning = useRef(false);

  const startMeditation = () => {

    let temp = document.createElement("iframe");
    temp.src = randomItem(meditationVideoUrls)
    temp.setAttribute('id', 'youtube');
    document.getElementById("youtube-div").appendChild(temp);
    // document.getElementById("youtube").append("<iframe width='420' height='315'src='https://www.youtube.com/embed/zSkFFW--Ma0'></iframe>");

  }

  const startTimer = (amount) => {
    let temp = document.getElementById('youtube')
    if (temp) temp.remove()
    if (isRunning.current) {
      return;
    }
    isRunning.current = true;
    if (isPaused) {
      newTime = new Date(Date.parse(new Date()) + remaining_time);
      isPaused = false;
      runTimer();
    } else {
        clearInterval(time_help);
        var current = Date.parse(new Date());
        newTime = new Date(current + amount*60*1000);
        runTimer();
    }
  }

  const runTimer = () => {
    time_help = setInterval(function() {
      document.getElementById("time").innerHTML = remain(newTime).minutes + "m " + remain(newTime).seconds + "s ";  
      let tree_element = document.getElementById("tree");
      let time_left = remain(newTime).minutes + ((remain(newTime).seconds/60))
      if(time_left>=(3*(focusTime/4))){
        tree_element.src = "trees0.png"
        console.log(tree_element.src, time_left, (3*focusTime/4))
      }
      else if(time_left>=(focusTime/2) ){
        tree_element.src = "trees1.png"
        console.log(tree_element.src, time_left, (focusTime/2))
      }
      else if(time_left>(focusTime/4)){
        tree_element.src = "trees2.png"
        console.log(tree_element.src, time_left, (focusTime/4))
      }
      else if(time_left>0){
        tree_element.src = "trees3.png"
        console.log(tree_element.src, time_left)
      } 
      else { 
        clearInterval(time_help); 
        resetTimer()
        startMeditation();
      }
    },1000);
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
      isRunning.current = false;
    }
  }


  const resetTimer = () => {
    clearInterval(time_help);
    document.getElementById("time").innerHTML = "";
    isRunning.current = false;
    isPaused = false
  }



  return (
    <div className="App" id='app'>
      <div className="flexbox">
        <div className="left-flex">
          <h1 className='title'>Welcome to Brain Sprout!</h1>
          <div id="youtube-div"></div>
          <img id="tree" src="trees0.png"></img>
        </div>
        <div className='controls'>
          <h3>Set Focus Time</h3>
          <select name="focusTime" defaultValue={20} onChange={updateFormValue(setFocusTime)}>
              {range(1,31).map(n=>
                <option value={n}>{n}min</option>
              )}
          </select>
          <h1 id='time'></h1>
          <div className='startButton' onClick={()=>startTimer(focusTime)}>start</div>
          <div className='pauseButton' onClick={()=>stopTimer()}>pause</div>
          <div className='resetButton' onClick={()=>resetTimer()}>reset</div>
        </div>
      </div>
      
    </div>  
  );
}

export default App;
