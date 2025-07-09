import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

export default function AnimatedCanvas() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10">
      <Canvas>
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <OrbitControls autoRotate enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
