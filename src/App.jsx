import Pic from './pages/pic'
import RecordView from './pages/record'
import Screen from './pages/screen'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Screen />} />
        <Route path="/photo" element={<Pic />} />
        <Route path="/video" element={<RecordView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
