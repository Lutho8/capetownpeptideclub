import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 80;
const CONNECTION_DISTANCE = 2.8;

function NeuralNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const vel = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#c8ff00'),
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;

    mouseRef.current.x += (pointer.x - mouseRef.current.x) * 0.02;
    mouseRef.current.y += (pointer.y - mouseRef.current.y) * 0.02;

    const dummy = new THREE.Object3D();
    const time = clock.getElapsedTime();

    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3;
      positions[ix] += velocities[ix];
      positions[ix + 1] += velocities[ix + 1];
      positions[ix + 2] += velocities[ix + 2];

      // Mouse repulsion
      const dx = positions[ix] - mouseRef.current.x * 6;
      const dy = positions[ix + 1] - mouseRef.current.y * 6;
      const distMouse = Math.sqrt(dx * dx + dy * dy);
      if (distMouse < 3) {
        const force = (3 - distMouse) * 0.001;
        positions[ix] += (dx / distMouse) * force;
        positions[ix + 1] += (dy / distMouse) * force;
      }

      // Soft boundary return
      const distFromCenter = Math.sqrt(
        positions[ix] ** 2 + positions[ix + 1] ** 2 + positions[ix + 2] ** 2
      );
      if (distFromCenter > 7) {
        velocities[ix] *= -1;
        velocities[ix + 1] *= -1;
        velocities[ix + 2] *= -1;
      }

      const pulse = 0.5 + Math.sin(time * 1.5 + i * 0.3) * 0.3;
      dummy.position.set(positions[ix], positions[ix + 1], positions[ix + 2]);
      dummy.scale.setScalar(pulse * 0.04);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update connections
    const linePositions: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_DISTANCE) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color="#c8ff00"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
      <ambientLight intensity={0.1} />
    </>
  );
}

export default function NeuralWebBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <NeuralNodes />
      </Canvas>
      {/* CRT scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,255,0,0.008) 2px, rgba(200,255,0,0.008) 4px)',
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </div>
  );
}
