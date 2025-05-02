"use client";

import React, { useMemo, useEffect } from "react";
import { Text } from "@react-three/drei";

export default function Hurdles({
  onSetHurdles,
  trackLength = 200,   // total length in world units
  numHurdles = 5,
}) {
  // player runs from z = 0 down to z = –100 (since 100 steps x 1 unit each)
  const finishZ = -100;  
  const spacingZ = finishZ / (numHurdles + 1);

  // compute the middle lane X from your track constants
  const laneWidth = 3;
  const numLanes = 8;
  const trackWidth = laneWidth * numLanes;
  const middleLaneX = ((numLanes - 1) / 2) * laneWidth - trackWidth / 2;

  // generate hurdles with random jump‐keys
  const hurdles = useMemo(() => {
    return Array.from({ length: numHurdles }).map((_, i) => {
      const z = spacingZ * (i + 1);
      const key = String(Math.floor(Math.random() * 4) + 6); // 6–9
      return { z, key, cleared: false };
    });
  }, [numHurdles, spacingZ]);

  // pass data back up to Scene
  useEffect(() => {
    if (onSetHurdles) onSetHurdles(hurdles);
  }, [hurdles, onSetHurdles]);

  return (
    <group>
      {hurdles.map((h, i) => (
        <group key={i} position={[middleLaneX, 1, h.z]}>
          {/* The hurdle bar */}
          <mesh>
            <boxGeometry args={[2, 1, 0.3]} />
            <meshStandardMaterial color="green" />
          </mesh>

          {/* The jump‐key label */}
          <Text
            position={[0, 0.8, 0.3]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {h.key}
          </Text>
        </group>
      ))}
    </group>
  );
}
