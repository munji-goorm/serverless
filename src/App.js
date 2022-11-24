import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer } from './components/common';
import { AirPollution, LiveCam, OntheMap } from './pages';
import { useState } from 'react';
import { GetLocation, Coord2TM, GetMainData } from './apis';

function App() {
  const [stationCoord, setStationCoord] = useState({
    lat: 0,
    lng: 0
  });

  let coord;
  let tm;
  let stationData;
  if (stationCoord.lat !== '0' && stationCoord.lng !== '0'){
    coord = stationCoord;
  } else {
    coord = GetLocation();
  }
  tm = Coord2TM(coord);
  stationData = GetMainData(tm.tmX, tm.tmY);

  return (
    <BrowserRouter>
      <Header stationCoord={stationCoord} setStationCoord={setStationCoord}/>
      <Routes>
        <Route exact path="/" element={
        <AirPollution stationCoord={stationCoord} stationData={stationData}/>
        } />
        <Route path="/airmap" element={<OntheMap />} />
        <Route path="/livecam" element={<LiveCam />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;