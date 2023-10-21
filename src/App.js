
import './App.css';
import Join from './components/Join';
import Navbar from './components/Navbar';
import {useState , useEffect} from 'react'
import io from "socket.io-client"
import { browserHistory, Routes, Route } from 'react-router';
const socket = io.connect("http://localhost:3001") 
const d = new Date();
function App() {



  const [msgSent , setMsg] = useState("");
  const [msgRec , setMsgrec] = useState("");
  const sendMessage=()=>{
    socket.emit("message_sent" , {
      message : msgSent , 
      time : d.getTime() ,
    })
    let p = document.createElement("p");
      p.innerText=msgSent;
      p.style.color='green'
      document.getElementById("chatArea").append(p);
      setMsg("");
  }
  useEffect(()=>{
    socket.on("message_received" , (data)=>{
      setMsgrec(data.message)
      let p = document.createElement("p");
      p.innerText=data.message;
      p.style.color='blue'
      document.getElementById("chatArea").append(p);
       
    })

    return () => {
      socket.off("message_received").off(); //used this to prevent event emitting twice
    };
  },[socket])

  const changeHandler=(event)=>{
    setMsg(event.target.value);
    
  }



  return (
    <>
    
    <Navbar />
    
    <Routes>
      <Route path="/join" element={<Join/>}/>
      <Route path="/" element={<><div id="chatArea" className='fluid-container'></div>
    <div className="container my-5 fixed-bottom" >
    <div className="input-group mb-3">
  <form >
  <input type="text" value={msgSent} onChange={changeHandler} className="form-control" placeholder="Message" aria-label="Recipient's username" aria-describedby="button-addon2"/>

  <button onClick={sendMessage} class="btn btn-outline-success " type="button" id="button-addon2">SEND</button>

  </form>
</div>
    </div></>}/>

    </Routes>
    </>
  );
}

export default App;
