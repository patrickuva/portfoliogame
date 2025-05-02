import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FollowCamera({ playerRef }) {
  const { camera } = useThree();  // Access the camera from the scene
  const targetPosition = new THREE.Vector3();  // To store the target position

  // Smooth camera follow logic
  useFrame(() => {
    if (playerRef.current) {
      // Get the player's position
      const playerPos = new THREE.Vector3();
      playerRef.current.getWorldPosition(playerPos);

      // Set the target camera position behind the player
      targetPosition.set(
        playerPos.x,
        playerPos.y + 3, // Keep the camera above the player
        playerPos.z + 8 // Camera should stay at a fixed distance behind the player
      );

      // Lerp the camera's position smoothly to the target position
      camera.position.lerp(targetPosition, 1); // 0.1 is the smoothing factor (adjust for more or less smoothing)

      // Make sure the camera is always looking at the player
      camera.lookAt(playerPos);
    }
  });

  return null;
}
