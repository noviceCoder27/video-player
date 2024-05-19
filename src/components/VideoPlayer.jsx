import { useState, useRef } from "react";
import PlayIcon from './../assets/play.png'
import PauseIcon from './../assets/pause.png'
import { formatPlaybackTime } from './../utils/parseTime';
import ReactPlayer from 'react-player/youtube'
import { useEffect } from "react";
const api_key = import.meta.env.VITE_API_KEY;


const VideoPlayer = ({played,setPlayed,video,skip,setSkip,setAddBtn}) => {

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const [details,setDetails] = useState({title: "Video Title goes here", description: "This is the description of the video"})

  useEffect(() => {
    const getData = async() => {
      try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${video}&key=${api_key}&fields=items(id,snippet(title,description),statistics)&part=snippet,statistics`);
        const data = await res.json();
        const title = data.items[0].snippet.title;
        const description =  data.items[0].snippet.description;
        setDetails({title, description});
        setAddBtn(true);
      } catch(err) {
        setDetails({title: "Video Title goes here", description: "This is the description of the video"});
        setDuration(0);
        setPlayed(0);
        setPlaying(false);
        setAddBtn(false);
      }
    }
    getData();
  },[video]);
  
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (progress) => {
    if(skip) {
      playerRef.current.seekTo(played);
      setSkip(false);
    } else {
      setPlayed(progress.playedSeconds);
    }
  };
  
  const handleDuration = (duration) => {
    setDuration(duration)
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = (e) => {
    setPlaying(false);
  };

  const handleSeekMouseUp = (e) => {
    setPlaying(true);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  return (
    <section className="w-full">
      <div className='relative xl:h-[100dvh]  lg:h-[70dvh] md:h-[50dvh] sm:h-[30dvh] max-sm:h-[30dvh] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-purple-400 to-fuchsia-600'>
        <ReactPlayer 
          ref={playerRef}
          url= {`https://www.youtube.com/embed/${video}`} 
          playing={playing} 
          controls={false} 
          width="100%"
          height= "100%"
          onProgress={handleProgress}
          onDuration={handleDuration}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className = "absolute bottom-[3.7rem] left-5 flex items-center gap-2 w-[97%] max-md:w-[95%]  max-sm:w-[90%]">
          <button onClick={handlePlayPause} className=' w-[20px]'>
            {playing ? <img width = "17px" src = {PauseIcon} alt = "Pause Icon" />: <img width = "15px" src = {PlayIcon} alt = "Play Icon" />}
          </button>
          <input
            type='range' min={0} max={duration} step='any'
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className = "w-full cursor-pointer"
          />
        </div>
        <div className = " text-white justify-between absolute bottom-[2.3rem] left-5 flex items-center gap-2 w-[97%] max-md:w-[95%]  max-sm:w-[90%]">
          <p>{formatPlaybackTime(played)}</p>
          <p>{formatPlaybackTime(duration)}</p>
        </div>       
      </div>
      <div className = "my-10">
        <p className="font-bold text-[1.5rem]">{details.title}</p>
        <p className = "text-[#475467]">{details.description}</p>
      </div>
    </section>
  )
}

export default VideoPlayer
