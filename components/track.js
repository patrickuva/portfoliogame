export default function Track() {
    const laneWidth = 3; // Width of each lane
    const numLanes = 8; // Number of lanes on the track
    const trackLength = 200; // Length of the track
    const trackHeight = 0.2; // Height for the track surface (for 3D effect)
  
    return (
      <group>
        {/* Track Surface (Main Body of Track) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, trackHeight / 2, -trackLength / 2]}>
          <planeGeometry args={[laneWidth * numLanes, trackLength]} />
          <meshStandardMaterial color="orange" />
        </mesh>
  
        {/* Lane dividers */}
        {[...Array(numLanes - 1)].map((_, index) => (
          <mesh
            key={index}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[((index + 1) * laneWidth) - (laneWidth * numLanes / 2), trackHeight, -trackLength / 2]}
          >
            <planeGeometry args={[0.2, trackLength]} />
            <meshStandardMaterial color="gray" />
          </mesh>
        ))}
  
        {/* Finish Line */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, trackHeight / 2, trackLength / 2]}>
          <planeGeometry args={[numLanes * laneWidth, 5]} />
          <meshStandardMaterial color="white" />
        </mesh>
  
        {/* Start Line (optional, marking the beginning of the track) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, trackHeight / 2, -trackLength / 2]}>
          <planeGeometry args={[numLanes * laneWidth, 5]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
    );
  }
  