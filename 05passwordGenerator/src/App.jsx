import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [passwod, setPassword] =  useState("");

  //useRef hook
  const passwodRef = useRef(null);

  //for optimising the process and storing previous password into cache 
  const passwodGenerator = useCallback(()=>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "`!@#$%^*&_+-<>|"
    }
    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  //code for copying the password by button
  const copyPasswordToClipBoard = useCallback(()=>{
    passwodRef.current?.select();   //for selecting when copying so that it can be highlighted ....  ?. is used for optional select (it mab be possible that it is empty)
    window.navigator.clipboard.writeText(passwod);
  } , [passwod])

  useEffect(()=>{
    passwodGenerator();
  } , [length,numberAllowed,charAllowed,passwodGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text'
         value={passwod}
         className='outline-none w-full py-1 px-3'
         placeholder='password' 
         readOnly
         ref = {passwodRef}
        />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
         onClick={copyPasswordToClipBoard}
        >copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
           min={6}
           max={60}
           value={length} 
           className='cursor-pointer'
           onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>

      </div>


    </div>
    </>
  )
}

export default App
