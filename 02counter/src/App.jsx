import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [counter, setCounter] = useState(0);
  //let counter = 0;
  const addValue = ()=>{
    console.log("clicked" , counter);
    if(counter<20){
      counter = counter +1;     //we dont want to increase counter greater than 20 
    }
    setCounter(counter);     //we need to pass the final value in setCounter function
  }
  const removeValue = ()=>{
    if(counter>0){
      setCounter(counter-1);
    }
    
  }

  return (
    <>
     <h1>chai aur react</h1>
     <h2>conter value: {counter}</h2>
     <button onClick={addValue}>Add value</button>
     <br></br>
     <button onClick={removeValue}>Remove value</button>
    </>
  )
}

export default App
