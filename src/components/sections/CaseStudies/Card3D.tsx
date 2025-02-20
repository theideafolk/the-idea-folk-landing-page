import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { Text, Environment } from "@react-three/drei";
import * as THREE from "three";

function Card({ title, description, isHovered, onClick }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  const { scale, rotation } = useSpring({
    scale: isHovered ? [1.1, 1.1, 1.1] : [1, 1, 1],
    rotation: isHovered ? [0, Math.PI / 8, 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 }
  });

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
  });

  return (
    <animated.mesh
      ref={mesh}
      scale={scale}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[3, 2]} />
      <animated.meshPhysicalMaterial
        side={THREE.DoubleSide}
        transmission={0.5}
        thickness={0.5}
        roughness={0.2}
        metalness={0.8}
        color={hovered ? "#367af6" : "#ffffff"}
      >
        <Text
          position={[0, 0.5, 0.1]}
          fontSize={0.2}
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
        <Text
          position={[0, -0.2, 0.1]}
          fontSize={0.1}
          color="#666666"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {description}
        </Text>
      </animated.meshPhysicalMaterial>
    </animated.mesh>
  );
}