import React from 'react'
import { useState , useCallback , useEffect , useRef} from 'react'
import './App.css'

function App() {


  const [length,setLength] = useState(8);
  const [num,setNum] = useState(false);
  const [char,setChar] = useState(false);
  const[pass,setPass] = useState() ; 

  const passgen = useCallback(()=>{

    let password = '';
    let str = 'ABCDEFGHIJKLMNOPQRTSUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(num){
      str += '0123456789';

    }

    if(char){
      str += '+-_&@$#';
      
    }

   
    for(let i=1 ;i<= length ; i++){
      let a = Math.floor(Math.random()*str.length + 1); 
      password += str.charAt(a);

    }

    setPass(password);


  }   ,    [length,num,char]);


  useEffect(()=> {passgen()}, [length,num,char,passgen])



  const forcopy = useRef(null);

  const copypass = useCallback(()=>{
    forcopy.current?.select();
    window.navigator.clipboard.writeText(pass)}
    ,[pass])


  return (
    <>
      <div className="password-generator">
        <h1>Password Generator</h1>

      
        <div className="password-display">
          <input
            type="text"
            id="password"
            value={pass} 
            placeholder="Your password will appear here"
            readOnly
            ref={forcopy}
          />
          <button id="generateBtn"
          onClick={copypass}
          >Copy</button>
        </div>

        
        <div className="password-length">
          <label htmlFor="passwordLength">
            Length: <span id="lengthValue">{length }</span>
          </label>
          <input
            type="range"
            id="passwordLength"
            min={5  }
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

       
        <div className="password-options">
          <label>
            <input type="checkbox" 
            id="includeNumbers"
            defaultChecked ={num}
            onChange={()=>{setNum((p)=>!p)}}
            
            /> Include Numbers
          </label>
          <label>
            <input type="checkbox" id="includeCharacters"
             defaultChecked ={char}
             onChange={()=>{setChar((p)=>!p)}} /> Include Special Character
          </label>
        </div>
      </div>

    </>
  )
}

export default App
