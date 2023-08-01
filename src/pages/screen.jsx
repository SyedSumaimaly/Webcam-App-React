import React from 'react'
import { useNavigate } from 'react-router-dom';

function Screen() {

    const navigate = useNavigate();

    const hanldeVideo = () => {
        navigate("/video")
    }

    const hanldePhoto = () => {
        navigate("/photo")
    }


    return (
        <div className='screen_div'>
            <h1>Welcome to Webcam App </h1>

            <div className='screen_btn_div'>
                <button onClick={hanldeVideo}>Record Video</button>
                <button onClick={hanldePhoto}>Capture Photo</button>
            </div>
        </div>
    )
}

export default Screen;
