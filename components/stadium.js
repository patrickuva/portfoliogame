"use client";

import React from 'react';

export default function Stadium() {
  // Track dimensions
  const laneWidth = 3;
  const numLanes = 8;
  const trackWidth = laneWidth * numLanes;
  const trackLength = 200;

  // Stand dimensions
  const tiers = 5;
  const standDepth = 5;       // Horizontal thickness of each tier
  const standHeight = 1;      // Vertical height of each tier
  const tierSpacing = 0.5;    // Vertical spacing between tiers
  const xSpacing = 2;         // Horizontal offset increase per tier

  // Seat dimensions
  const seatWidth = 1;
  const seatHeight = 0.5;
  const seatDepth = 1;
  const seatsPerRow = 60;
  const seatSpacing = trackLength / seatsPerRow;

  // Base offset from track center for first tier
  const baseOffset = trackWidth / 2 + standDepth / 2 + 1;

  return (
    <group>
      {['left', 'right'].map((side) => {
        const sign = side === 'left' ? -1 : 1;
        const rotationY = side === 'left' ? Math.PI / 2 : -Math.PI / 2;

        return (
          <group key={side}>
            {Array.from({ length: tiers }).map((_, tierIdx) => {
              const y = tierIdx * (standHeight + tierSpacing);
              const xOffset = baseOffset + tierIdx * xSpacing;

              // Platform Tier
              const platform = (
                <mesh
                  key={`${side}-platform-${tierIdx}`}
                  position={[sign * xOffset, y, 0]}
                >
                  <boxGeometry args={[standDepth, standHeight, trackLength]} />
                  <meshStandardMaterial color="#666666" />
                </mesh>
              );

              // Seats on this tier
              const seats = Array.from({ length: seatsPerRow }).map((_, colIdx) => {
                const z = -trackLength / 2 + seatSpacing / 2 + colIdx * seatSpacing;
                return (
                  <mesh
                    key={`${side}-seat-${tierIdx}-${colIdx}`}
                    position={[
                      sign * (xOffset - standDepth / 2 - seatDepth / 2),
                      y + standHeight / 2 + seatHeight / 2,
                      z
                    ]}
                    rotation={[0, rotationY, 0]}
                  >
                    <boxGeometry args={[seatDepth, seatHeight, seatWidth]} />
                    <meshStandardMaterial
                      color={colIdx % 2 === 0 ? 'red' : 'blue'}
                    />
                  </mesh>
                );
              });

              return (
                <React.Fragment key={`${side}-tier-${tierIdx}`}>
                  {platform}
                  {seats}
                </React.Fragment>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}
