import { useReactMediaRecorder } from "react-media-recorder";
import { useNavigate } from "react-router-dom";
import '../App.css';


const RecordView = () => {

  const { status, pauseRecording, resumeRecording, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });

  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/");
  }

  return (
    <div>
      <h2>Video Recorder</h2>

      <div className="status_div">
        <p>Status: <span>{status}</span> </p>
      </div>

      <div className="video_div" >
        <video src={mediaBlobUrl} controls autoPlay loop />
      </div>

      <div className="btn_div_record">
        <button onClick={startRecording} className="start_btn">Start Recording</button>
        <button onClick={pauseRecording} className="pause_btn">Pause Recording</button>
        <button onClick={resumeRecording} className="resume_btn">Resume Recording</button>
        <button onClick={stopRecording} className="stop_btn">Stop Recording</button>
        <button onClick={handleExit} className="stop_btn">Quit</button>
      </div>

    </div>
  )

}
export default RecordView;