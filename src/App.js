import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer } from './components/common';
import { AirPollution, LiveCam, OntheMap } from './pages';
import { useEffect, useState } from 'react';
import { GetLocation, GetMainData } from './apis';

function App() {
  let location = GetLocation(); //geolocation API를 통해 현재 위치 가져오기
  const [coord, setCoord] = useState({ //위도, 경도
    lat: 37.564639, //서울시 중구 측정소 위도
    lng: 126.975961, //서울시 중구 측정소 경도
  });
  const [addr, setAddr] = useState("중구 서소문동"); //지역(xx구 oo동)

  /* 현재 위치로 위도/경도 변경 */
  useEffect(() => {
    if (location) {
      setCoord({
        lat: location.lat,
        lng: location.lng
      });
    }
  }, [location]);
  
  let stationData = GetMainData(coord.lat, coord.lng); //현재 위치에서 근접측정소의 대기오염정보
  
  /* 현재 지역 변경 */
  useEffect(() => {
    setAddr(stationData.stationInfo.shortAddr);
  }, [stationData]);

  return (
    <BrowserRouter>
      <Header addr={addr} setAddr={setAddr} setCoord={setCoord} />
      <Routes>
        <Route exact path="/" element={
          <AirPollution stationData={stationData} addr={addr}/>
        } />
        <Route path="/airmap" element={
        <OntheMap coord={coord}/>} />
        <Route path="/livecam" element={
        <LiveCam coord={coord}/>
        } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;