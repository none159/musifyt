import React,{useState} from "react"
import axios from 'axios'
import Music from './music'
import { createBrowserHistory } from 'history';
import {Router,Route,Routes} from 'react-router-dom'
const Login = ()=>{
   const[display,setdisplay]=useState(false)
   const [clicksignup,setclicksignup] = useState(false)
   const [login,setlogin]=useState({
    email:'',
    password:'',
    logged:false
   })
   const [signup,setsignup] = useState({
       username:'',
       email:'',
       password:'',
    

   })
   const checkinput = ()=>{
       if(clicksignup&&[signup.username,signup.email,signup.password]!==''){
       axios.post('http://localhost/musicplayerplaylist/login.php',signup).then(res=>{
    
       if(res.data.includes('sign up succesfuly')){
           setsignup({
               username:'',
               email:'',
               password:''
           })
           setclicksignup(false)
       }}
       ).catch(err=>console.log(err))
       
    }
    else if([signup.username,signup.password]!==''){
        axios.post('http://localhost/musicplayerlogin/playlist.php',login).then(res=>{
            if(res.data.includes('logged succesfuly')){
                setlogin({...login,logged:true})
                  const history = createBrowserHistory()
                  history.push('../music')
            
            }
        }
        ).catch(err=>console.log(err))
       
   }
}
   return(
       <section >
           {login.logged?<Music logged={login.logged} email={login.email}/>:''}
   
           <div className='login-container' style={{display:login.logged?'none':'grid'}}>
               <div className='login-form'>
                {clicksignup?
              
                <>
                    <label htmlFor='username'>Username:</label>
                    <input type='text' id='username'value={signup.username} onChange={(e)=>setsignup({...signup,'username':e.target.value})}/>
                </>
               
                :''}
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' value={clicksignup?signup.email:login.email} onChange={clicksignup?(e)=>setsignup({...signup,email:e.target.value}):(e)=>setlogin({...login,email:e.target.value})}/>
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' value={clicksignup?signup.password:login.password} onChange={(e)=>clicksignup?setsignup({...signup,'password':e.target.value}):setlogin({...login,password:e.target.value})}/>
                <button onClick={checkinput}>{clicksignup?'Sign up':'Log in'}</button>
                <a onClick={()=>setclicksignup(!clicksignup)}>Click to {!clicksignup?'Sign up':'Log in'}</a>
               </div>
           </div>
       </section>
             
   )
}
export default Login;