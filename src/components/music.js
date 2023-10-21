import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import playicon from '../images/play-button.png'
import stop from '../images/stop-button.png'
import control from '../images/backward.png'
const Music =(props)=>{
    const url= 'http://localhost/musicplayerplaylist/addplaylist.php'
    const [input,setinput] = useState('')
    const [play,setplay] = useState(false)
    const [data,setdata] = useState([])
    const [info,setinfo] = useState({
      email:props.email
    })
    const [songs,setsongs] = useState({
      'filenames':[],
      'fileurls':[]
    })
    const [volume,setvolume] = useState(100)
    const [disabled,setdisabled] = useState(false)
    const [time,settime]= useState(0)
    const [selectedmsg,setselectedmsg] = useState(false)
    const [songfile,setsongfile] = useState()
    const [duration,setduration]= useState(0)
    const [selected,setselected] = useState(false)
    let blob = window.URL || window.webkitURL;
   

  
     const path = (event)=>{
          let file = event,
           fileURL = blob.createObjectURL(file);
          if(fileURL!=''){
          setinput(fileURL)
          setsongfile(file)
          }
          
          ;
     }
     const submit = ()=>{
      if(input!=''){
       setselected(true)
       setdisabled(true)
       document.getElementById('audio').src=input
      }
     }
     const changeprogressbar = ()=>{
      document.getElementById('audio').currentTime = document.getElementById('progressBar').value
     }
     const volumechange = ()=>{
      document.getElementById('audio').volume = volume/100
     }
     const fetchplaylist=()=>{
       if(props.logged){
        axios.post(url,{
          email:`${info.email}`,
          getplaylist : 'true'
        }).then((res)=>{
         let res2 = res.data.substring(0,res.data.length-2)+"?"
        setdata(res2)
        }).catch((err)=>console.log(err))
       }
     }
     const addtoplaylist = (song)=>{
        const songnames = songs.filenames
        const songurls = songs.fileurls
        if(!songnames.includes(songfile.name)){
        setsongs({filenames:[...songnames,songfile.name],fileurls:[...songurls,song]})
        axios({
          url:url,
          method:'post',
          data:{
            email:`${info.email}`,
            playlist:song,
            songname:songfile.name
          }
        }).then((res)=>{
          if(res.data.includes('added succesfuly')){
            axios.post(url,{
              email:`${info.email}`,
              getplaylist : 'true'
            }).then((res)=>{
            setdata(res.data)
            }).catch((err)=>console.log(err))
          }
        }).catch((err)=>console.log(err))
       
        }
        
     }
     const dec =()=>{
      document.getElementById('audio').currentTime  -= 10
     }
     const player = ()=>{
        if(play){
          const audio = document.getElementById('audio')
          if(audio.src=='' || input ==''){
          audio.src = input;}
          else{
            audio.play()
          }
          setInterval(()=>{
            settime(audio.currentTime)
            setduration(audio.duration)
            if(audio.currentTime===audio.duration){
              setplay(false)
              setselected(false)
              setdisabled(false)
              setinput('')
              document.getElementById('file').value=''
              audio.currentTime  = 0
              setduration(0)
              settime(0)
         
            }

          },1000)
          
        }
        else{
            document.getElementById('audio').pause(); 
        }
     }
     
      const inc =()=>{
        document.getElementById('audio').currentTime  += 10
       }
     
      useEffect(()=>{
        player()
      },[play])
      useEffect(()=>{
         fetchplaylist()
      },[info])
      useEffect(()=>{
        if(selected){
          setselectedmsg(true)
          setTimeout(() => {
             setselectedmsg(false)
          }, 2000);
        }
      },[selected])
    return(
      <section>
          <div className='music-container'>
             <h2 className='music-title'>Musifyt Music Player</h2>
              <div className='song-form' >
                  <h2>Select Your Song File:</h2>
                  <input type='file'  id='file' disabled={disabled} onChange={(e)=>{path(e.target.files[0])}}  className='song-input'></input>
                  <button onClick={submit} disabled={disabled}>select</button>
                  <h2 className='selected-msg' style={{opacity:selectedmsg!=''?1:0,zIndex:selectedmsg!=''?1:-1}}>Song been selected successfully</h2>
              </div>
              <div className='song-player' style={{display:selected?'grid':'none'}}>
                <h2 className='timestamp' >{Math.floor(time/60)}:{Math.floor(time%60)}/{Math.floor(duration/60)}:{Math.floor(duration%60)}</h2>
                <div className="progress-bar" >
                  <input type="range" id="progressBar" min="0" onChange={(e)=>settime(e.target.value)} onClick={changeprogressbar} max={duration} value={time} />
                </div>
                <input type="range" id='volume'  className='volume' min="0" onChange={(e)=>setvolume(e.target.value)} onClick={volumechange} max='100' value={volume} />
                 <div className='btns' >
                  <button className=''  onClick={dec}><img src={control} style={{width:50,height:50}}></img></button>
                  <button className='play' onClick={()=>selected?setplay(!play):''}><img src={play?stop:playicon} style={{width:50,height:50}} /></button>
                  <button className=''  onClick={inc}><img src={control} style={{width:50,height:50,imageOrientation: 'revert',transform:'rotateY(180deg)'}}/></button>
                  </div>
                <audio id='audio'  controls  hidden></audio>
              </div>
              <div className='playlist-container'>
                  <h2>Add Song To Your Favorites:</h2>
                  <h3 className='song-name' >{songfile!=null?songfile.name:''}</h3>
                  {props.logged?<button onClick={()=>addtoplaylist(blob.createObjectURL(songfile))} >Add</button>:<Link to='/login'><button >Add</button></Link>}
              </div>
              <div className='playlist-player' >
                  <h2>Favorites : </h2>
                  {<h3 className='playlist-names'>{data}</h3> }
              </div>
          </div>
      </section>
    )
   
    /*blob.createObjectURL(songfile)*/
}
export default Music;