import { createContext, useRef, useState,useEffect,useContext } from "react";
import AlbumsContext from "./AlbumsContext";
// import { songsData } from "../assets/assets";



export const PlayerContext = createContext();




const PlayerContextProvider = (props) =>{
  const {songs} = useContext(AlbumsContext)
  // console.log("songs in player",songs)
  const audioRef = useRef();
  const seekBg   = useRef();
  const seekBar = useRef();
//  console.log(songsData[4])
// console.log("songs",songs[1])
  const [track, settrack] = useState(songs);
  
  console.log("track",track)
  const [playStatus, setplayStatus] = useState(false)

  const [time, settime] = useState({
    currentTime:{
        seconds:"00",
        minutes:0
    },
    TotalTime:{
        seconds:"00",
        minutes:0
    }
  })

  const play = () =>{
        audioRef.current.play()
        setplayStatus(true)
  }
  const pause = () =>{
        audioRef.current.pause()
        setplayStatus(false)
  }
  const PlayWithId = async (id) =>{
    
    console.log("id",id)
    // console.log("songs",songs)
    console.log("songs we play ",songs[id-1])
    await settrack(songs[id-1])
    console.log("track after setting",track)
    await audioRef.current.play()
    setplayStatus(true)
  }
  const previous = () => {
    if (track.id > 1) {
      const prevTrack = songs[track.id - 2];
      settrack(prevTrack);
      audioRef.current.play();
      setplayStatus(true);
    }
  };
  
  const next = () => {
    if (track.id < songs.length) {
      const nextTrack = songs[track.id];
      settrack(nextTrack);
      audioRef.current.play();
      setplayStatus(true);
    }
  };
  
  const seeksong = (e) => {
    if (audioRef.current && seekBg.current) {
      const seekPosition = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
      audioRef.current.currentTime = seekPosition;
    }
  };
  

  useEffect(() => {
    setTimeout(()=>{
        audioRef.current.ontimeupdate =()=>{
            seekBar.current.style.width = Math.floor((audioRef.current.currentTime/audioRef.current.duration)*100)+'%'
            settime({
                currentTime:{
                    seconds:Math.floor(audioRef.current.currentTime%60),
                    minutes:Math.floor(audioRef.current.currentTime/60)
                },
                TotalTime:{
                    seconds:Math.floor(audioRef.current.duration%60),
                    minutes:Math.floor(audioRef.current.duration/60)    
                }
              }

            )
        }
    },1000)
  
  }, [audioRef])
  

  const contextValue ={
    audioRef,
    seekBg,
    seekBar,
    track,
    settrack,
    playStatus,
    setplayStatus,
    time,
    settime,
    play,
    pause,
    PlayWithId,
    previous,
    next,
    seeksong

  }  

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider;



