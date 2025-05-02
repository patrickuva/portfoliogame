"use client";

import { useRef, useState, useEffect, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Player = forwardRef(({ onStart, onFinish, hurdles = [] }, ref) => {
  const playerRef = ref || useRef();
  const [position, setPosition] = useState(0);
  const [finished, setFinished] = useState(false);
  const [lastKey, setLastKey] = useState(null);
  const [jumping, setJumping] = useState(false);

  const laneWidth = 3;
  const numLanes = 8;
  const trackWidth = laneWidth * numLanes;
  const middleLaneX = (numLanes - 1) / 2 * laneWidth - trackWidth / 2;

  useFrame(() => {
    playerRef.current.position.z = -position;
    playerRef.current.position.x = middleLaneX;
    if (position >= 200) {
      setPosition(200);
    }
  });

  const handleKeyDown = (e) => {
    const nextPos = position + 1;
    const hurdle = hurdles.find(h => !h.cleared && Math.round(-h.z) === nextPos);

    if (finished) return;

    if (hurdle) {
      // Jump logic
      if (e.key === hurdle.key && !jumping) {
        hurdle.cleared = true;        // mark cleared
        setJumping(true);             // start jump
        if (position === 0) onStart();
        setPosition(nextPos);         // move forward
        setLastKey(null);             // reset run-sequence
        setTimeout(() => setJumping(false), 200); // end jump after 200ms
      }
    } else {
      // Normal run logic
      if (
        (e.key === '1' && (lastKey === '2' || lastKey === null)) ||
        (e.key === '2' && lastKey === '1')
      ) {
        if (position === 0) onStart();
        setPosition(nextPos);
        setLastKey(e.key);
      }
    }

    // finish
    if (nextPos >= 100) {
      setFinished(true);
      onFinish();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position, finished, lastKey, jumping, hurdles]);

  return (
    <mesh ref={playerRef} position={[middleLaneX, 1, 0]}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color={finished ? 'gold' : 'hotpink'} />
    </mesh>
  );
});

export default Player;
