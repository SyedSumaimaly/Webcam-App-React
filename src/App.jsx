import './App.css';
import { useRef } from 'react';
import Webcam from "react-webcam";
import { useState } from 'react';
import { useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';

const cameraWidth = 400;
const cameraHeight = 400;
const aspectRatio = cameraWidth / cameraHeight;


const videoConstraints = {
  width: {
    min: cameraWidth
  },
  height: {
    min: cameraHeight
  },
  aspectRatio
};


const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "dpqcnekdn"
  },
  url: {
    secure: true // force https, set to false to force http
  }
});

const artFilter = [
  'al_dente',
  'athena',
  'audrey',
  'aurora',
  'daguerre',
  'eucalyptus',
  'fes',
  'frost',
  'hairspray',
  'hokusai',
  'incognito',
  'linen',
  'peacock',
  'primavera',
  'quartz',
  'red_rock',
  'refresh',
  'sizzle',
  'sonnet',
  'ukulele',
  'zorro'
]

function App() {

  const webcamRef = useRef();
  const [imgSrc, setImgSrc] = useState();
  const [cld_Data, setCld_Data] = useState();
  const [filter, setfilter] = useState();


  const cloudImage = cld_Data && cloudinary.image(cld_Data.public_id);
  let src = imgSrc

  if (cloudImage && filter) {
    if (filter) {
      cloudImage.effect(`e_art:${filter}`)

    }
    src = cloudImage.toURL();
  }


  useEffect(() => {
    if (!imgSrc) return;
    (async function run() {
      const data = new FormData();
      data.append("file", imgSrc);
      data.append("upload_preset", "Webcam");
      data.append("cloud_name", "dpqcnekdn");
      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dpqcnekdn/image/upload", {
          method: 'POST',
          body: data,
        }
        ).then((r) => r.json());
        setCld_Data(response);
      } catch (error) {
        console.error("Error uploading to cloudinary", error);
      }
    })();
  }, [imgSrc]);

  function handleCapture() {
    const image = webcamRef.current.getScreenshot();
    setImgSrc(image);
    console.log('image', image);
  }

  function handleReset() {
    setImgSrc(undefined);
  }

  return (
    <>
      <div className='main'>
        <div >
          <h2>Webcam App</h2>
          <div className='web_cam_div'>
            {src && <img src={src} alt="Abs" />}
            {!src && <Webcam ref={webcamRef} videoConstraints={videoConstraints} width={cameraWidth} height={cameraHeight} />}
          </div>

          <div className='btndiv'>
            <button onClick={handleCapture} className="btn capbtn">Capture photo</button>
            <button onClick={handleReset} className='resetBtn btn'>Reset</button>

          </div>
        </div>
      </div >
      {/* filter section */}
      <div className='filter'>
        <h2>Filters</h2>
        <div className='filter_div_main'>
          <ul className='filter_div'>
            {artFilter.map(filter => {
              return (
                <li key={filter}>
                  <button className='btn_filter' onClick={() => setfilter(filter)}>
                    <img width="100" height="100" src={cloudinary.image(cld_Data).resize('w_200,h_200').effect(`e_art:${filter}`).toURL()} alt={filter} />
                    <span>{filter}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

      </div>
    </>
  );
}

export default App;
