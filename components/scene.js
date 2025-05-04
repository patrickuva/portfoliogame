"use client"; // Scene.js: main scene component

import { Canvas } from '@react-three/fiber';
import { Sky, Cloud } from '@react-three/drei';
import React, { useState, useRef } from 'react';
import Player from './player';
import Hurdles from './banners';
import FollowCamera from './FollowCamera';
import Track from './track';
import Stadium from './stadium';

export default function Scene() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [hurdles, setHurdles] = useState([]);
  const playerRef = useRef();

  const handleStart = () => {
    if (!startTime) setStartTime(Date.now());
  };

  const handleFinish = () => {
    if (!endTime) setEndTime(Date.now());
  };

  const elapsedTime = startTime && endTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

  return (
    <>
      <Canvas camera={{ position: [0, 30, 100], fov: 60 }}>
        {/* Solid sky-blue background */}
        <color attach="background" args={[0x87ceeb]} />

        {/* Sky gradient for depth */}
        {/* Removed procedural Sky to keep solid blue background */}
        <mesh position={[0, 0.03, 49]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 100]} />
        <meshStandardMaterial color="#228B22" /> {/* forest green */}
        </mesh>

        {/* Soft white clouds */}
        <Cloud position={[-40, 20, -120]} opacity={0.6} speed={0.9} width={40} depth={1} segments={20} />
        <Cloud position={[60, 25, -140]} opacity={0.6} speed={0.8} width={30} depth={1} segments={20} />
        <Cloud position={[0, 18, -150]} opacity={0.6} speed={0.7} width={50} depth={1} segments={20} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        {/* Track and stands */}
        <Track />
        <Stadium />

        {/* Player and hurdles */}
        <Player ref={playerRef} onStart={handleStart} onFinish={handleFinish} hurdles={hurdles} />
        <Hurdles onSetHurdles={setHurdles} />

        {/* Camera following player */}
        <FollowCamera playerRef={playerRef} />
      </Canvas>

      {/* HUD: Timer Display */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        fontSize: '24px',
        background: 'white',
        padding: '10px',
        borderRadius: '10px',
        fontFamily: 'sans-serif'
      }}>
        {elapsedTime
          ? `Gefinisht in ${elapsedTime} seconden!`
          : startTime
          ? 'Rennen!'
          : 'Druk op 1 en 2 om te starten!'}
      </div>
    </>
  );
}
