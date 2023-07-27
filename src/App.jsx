import './App.css';
import { useRef } from 'react';
import Webcam from "react-webcam";
import { useState } from 'react';
import { useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';

const videoConstraints = {
  width: 720,
  height: 720,
  aspectRatio: 1,
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
      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: JSON.stringify({
          image: imgSrc
        })
      }).then(r => r.json());
      setCld_Data(response);
      console.log('response', response);
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
          <div className='web_cam_div'>
            {src && <img src={src} alt="Abs" />}
            {!src && <Webcam ref={webcamRef} videoConstraints={videoConstraints} />}
          </div>

          <div>
            <button onClick={handleCapture}>Capture photo</button>
            <button onClick={handleReset}>Reset</button>

          </div>
        </div>
      </div >
      {/* filter section */}
      <div >
        <h2>Filters</h2>
        <div className='filter_div_main'>
          <ul className='filter_div'>
            {artFilter.map(filter => {
              return (
                <li key={filter}>
                  <button onClick={() => setfilter(filter)}>
                    <img width="100" height="100" src={cloudinary.image(cld_Data?.public_id || 'https://res.cloudinary.com/dpqcnekdn/image/upload/v1687254857/cld-sample-2.jpg').resize('w_200,h_200').effect(`e_art:${filter}`).toURL()} alt={filter} />
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
