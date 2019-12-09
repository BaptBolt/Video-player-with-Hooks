import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const [table, setTable] = useState([])

  const [url, setUrl] = useState('');
  let handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const [urlSubmitted, setUrlSubmitted] = useState('');


  let handleSubmitUrl = () => {
    setUrlSubmitted(url);
    setTable([...table, url]);
    console.log(table);
  }

  const [playing, setPlaying] = useState(false);
  let handlePlaying = () => {
    setPlaying(!playing)
  }
  const [volume, setVolume] = useState(0.5);
  let handleVolumeUp = () => {
    setVolume(volume + 0.1)
  }
  let handleVolumeDown = () => {
    setVolume(volume - 0.1)
  }
  const [muted, setMuted] = useState(false);
  let handleMuted = () => {
    setMuted(!muted)
  }
  const [progress, setProgress] = useState(0);
  let handleProgress = (data) => {
    setProgress(data.played.toFixed(2) * 100)
  }
  let historic = [...table]
  let handleDelete=()=>{
    historic.splice(0, historic.length)
    setTable(historic)
  }

  const [button, setButton]=useState(false)
  let handleButton = ()=>{
    setButton(!button)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1 class="navbar-brand">Another Youtube</h1>
        <div className="search-bar">
          <input className="form-control mr-sm-2" value={url} type="search" placeholder="Search" aria-label="Search" onChange={handleUrl} />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handleSubmitUrl}>Search</button>
        </div>
        <ReactPlayer 
          url={urlSubmitted}
          volume={volume}
          playing={playing}
          muted={muted}
          onProgress={handleProgress}
          controls={true}
        />
        <div className="progressBar">
          <div className="progress" style={{ width: progress + "%" }}></div>
        </div>
        <div className='buttons'>
          <button type="button" className={playing ? "btn btn-success" : "btn btn-danger"} onClick={handlePlaying}>Play/Pause</button>
          <button type="button" className={muted ? "btn btn-success" : "btn btn-danger"} onClick={handleMuted}>Mute</button>
          <button type="button" className="btn btn-outline-light" onClick={handleVolumeUp}>+</button>
          <button type="button" className="btn btn-outline-light" onClick={handleVolumeDown}>-</button>
          <button type="button" class="btn btn-info" onClick={handleButton}>historique</button>
        </div>
            <div className={!button ? 'displayNone':'displayBlock'}>
        {table.map(element => {
          return (
          <ReactPlayer 
           url={element}
          volume={volume}
          playing={playing}
          muted={muted}
          onProgress={handleProgress}
          controls={true}
        />
          )
        })}
        <button onClick={handleDelete} type="button" class="btn btn-danger">supprimer mon historique</button>
        </div>
      </header>
    </div>
  );
}

export default App;
