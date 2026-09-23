import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { PARTH_ANATOMY, type AnatomyNode } from "@/lib/content";

const SHELL = "#e9ecf2";
const FRAME = "#15161d";
const GLOW = "#ff3a8c";

type Vec = [number, number, number];

type PartDef = {
  /** matching PARTH_ANATOMY id, or null for shared structure that is not a callout */
  id: string | null;
  base: Vec;
  exp: Vec;
  mirror?: boolean;
  build: (m: Mats) => React.ReactNode;
};

type Mats = {
  shell: THREE.Material;
  frame: THREE.Material;
  glow: THREE.Material;
};

/* ------------------------------- geometry ---------------------------------- */

const head = (m: Mats) => (
  <>
    <mesh material={m.frame} scale={[0.9, 1.1, 1.2]}>
      <sphereGeometry args={[0.12, 48, 48]} />
    </mesh>
    <mesh material={m.shell} scale={[0.94, 1.14, 1.24]}>
      <sphereGeometry args={[0.125, 48, 48, -Math.PI / 2 - 0.5, Math.PI + 1, 0, Math.PI]} />
    </mesh>
    <mesh material={m.glow} position={[0, 0.02, 0.142]} rotation={[0, 0, Math.PI / 2]}>
      <capsuleGeometry args={[0.005, 0.115, 6, 12]} />
    </mesh>
    <mesh material={m.frame} position={[0, 0, -0.02]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.042, 0.042, 0.225, 24]} />
    </mesh>
  </>
);

const neck = (m: Mats) => (
  <>
    <mesh material={m.frame}>
      <cylinderGeometry args={[0.04, 0.05, 0.15, 24]} />
    </mesh>
    {[0, 1, 2].map((i) => (
      <mesh
        key={i}
        material={m.frame}
        position={[0, -0.04 + i * 0.04, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.047, 0.006, 10, 24]} />
      </mesh>
    ))}
  </>
);

const torso = (m: Mats) => (
  <>
    <mesh material={m.frame}>
      <capsuleGeometry args={[0.16, 0.34, 16, 24]} />
    </mesh>
    <mesh material={m.shell} position={[0, 0.02, 0]} scale={[1, 1, 0.62]}>
      <cylinderGeometry
        args={[0.21, 0.185, 0.48, 48, 1, false, -Math.PI / 2 - 0.55, Math.PI + 1.1]}
      />
    </mesh>
    <mesh
      material={m.shell}
      position={[0, 0.02, 0]}
      scale={[0.96, 1, 0.58]}
      rotation={[0, Math.PI, 0]}
    >
      <cylinderGeometry args={[0.205, 0.18, 0.46, 48, 1, false, -Math.PI / 2 - 0.5, Math.PI + 1]} />
    </mesh>
    <mesh material={m.shell} position={[0, 0.24, 0]} scale={[1, 0.5, 0.62]}>
      <sphereGeometry args={[0.2, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
    </mesh>
    <mesh material={m.frame} position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.06, 0.06, 0.5, 24]} />
    </mesh>
  </>
);

const statusLight = (m: Mats) => (
  <>
    <mesh material={m.frame}>
      <cylinderGeometry args={[0.035, 0.035, 0.018, 24]} />
    </mesh>
    <mesh material={m.glow} position={[0, 0.012, 0]}>
      <cylinderGeometry args={[0.028, 0.028, 0.006, 24]} />
    </mesh>
  </>
);

const battery = (m: Mats) => (
  <>
    <mesh material={m.frame}>
      <boxGeometry args={[0.26, 0.3, 0.1]} />
    </mesh>
    <mesh material={m.shell} position={[0, 0, -0.055]}>
      <boxGeometry args={[0.24, 0.28, 0.02]} />
    </mesh>
    <mesh material={m.glow} position={[0, -0.12, -0.062]}>
      <boxGeometry args={[0.12, 0.008, 0.004]} />
    </mesh>
  </>
);

const waist = (m: Mats) => (
  <>
    <mesh material={m.frame}>
      <cylinderGeometry args={[0.11, 0.14, 0.34, 24]} />
    </mesh>
    {[0, 1, 2].map((i) => (
      <mesh key={i} material={m.frame} position={[0, 0.1 - i * 0.1, 0.04]} scale={[1, 0.4, 0.5]}>
        <sphereGeometry args={[0.13, 24, 24, 0, Math.PI, 0, Math.PI / 2]} />
      </mesh>
    ))}
  </>
);

const shoulder = (m: Mats) => (
  <>
    <mesh material={m.frame} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.085, 0.085, 0.12, 24]} />
    </mesh>
    <mesh material={m.glow} position={[0, 0, 0.062]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.06, 0.005, 10, 24]} />
    </mesh>
    <mesh
      material={m.shell}
      position={[0.04, 0.02, 0]}
      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      scale={[1.1, 1, 1.2]}
    >
      <sphereGeometry args={[0.12, 48, 48, 0, Math.PI, 0, Math.PI * 0.6]} />
    </mesh>
    {/* upper arm */}
    <mesh material={m.frame} position={[0.02, -0.26, 0]}>
      <capsuleGeometry args={[0.05, 0.26, 12, 24]} />
    </mesh>
    <mesh material={m.shell} position={[0.03, -0.26, 0]}>
      <cylinderGeometry
        args={[0.07, 0.06, 0.34, 24, 1, false, -Math.PI / 2 - 0.2, Math.PI + 0.4]}
      />
    </mesh>
  </>
);

const elbow = (m: Mats) => (
  <>
    <mesh material={m.frame} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.06, 0.06, 0.1, 24]} />
    </mesh>
    <mesh material={m.frame} position={[0, -0.17, 0]}>
      <capsuleGeometry args={[0.04, 0.24, 12, 24]} />
    </mesh>
    <mesh material={m.shell} position={[0.015, -0.17, 0]}>
      <cylinderGeometry
        args={[0.068, 0.045, 0.32, 24, 1, false, -Math.PI / 2 - 0.4, Math.PI + 0.8]}
      />
    </mesh>
  </>
);

const wrist = (m: Mats) => (
  <>
    <mesh material={m.frame}>
      <cylinderGeometry args={[0.045, 0.045, 0.07, 24]} />
    </mesh>
    <mesh material={m.glow} position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.04, 0.004, 10, 24]} />
    </mesh>
  </>
);

const hand = (m: Mats) => (
  <>
    <mesh material={m.frame}>
      <boxGeometry args={[0.06, 0.09, 0.045]} />
    </mesh>
    <mesh material={m.shell} position={[0, 0, -0.026]}>
      <boxGeometry args={[0.065, 0.09, 0.012]} />
    </mesh>
    {[0, 1, 2, 3].map((i) => (
      <group key={i} position={[-0.022 + i * 0.014, 0, 0]}>
        <mesh material={m.frame} position={[0, -0.075, 0.008]}>
          <capsuleGeometry args={[0.008, 0.032, 8, 12]} />
        </mesh>
        <mesh material={m.frame} position={[0, -0.108, 0.016]} rotation={[-Math.PI / 8, 0, 0]}>
          <capsuleGeometry args={[0.006, 0.02, 8, 12]} />
        </mesh>
      </group>
    ))}
    <mesh material={m.frame} position={[0.036, -0.03, 0.01]} rotation={[0, 0, Math.PI / 4]}>
      <capsuleGeometry args={[0.008, 0.032, 8, 12]} />
    </mesh>
  </>
);

const hip = (m: Mats) => (
  <>
    <mesh material={m.frame}>
      <boxGeometry args={[0.2, 0.18, 0.16]} />
    </mesh>
    <mesh material={m.shell} position={[0, 0.04, 0.04]} scale={[1.2, 1, 0.5]}>
      <sphereGeometry args={[0.15, 32, 32, 0, Math.PI, 0, Math.PI / 2]} />
    </mesh>
    <mesh material={m.frame} position={[0, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.07, 0.07, 0.4, 24]} />
    </mesh>
    {/* thighs */}
    {[-0.16, 0.16].map((x) => (
      <group key={x} position={[x, -0.3, 0]}>
        <mesh material={m.frame}>
          <capsuleGeometry args={[0.07, 0.4, 16, 24]} />
        </mesh>
        <mesh material={m.shell} position={[0, 0, 0.02]}>
          <cylinderGeometry
            args={[0.115, 0.09, 0.46, 48, 1, false, -Math.PI / 2 - 0.5, Math.PI + 1]}
          />
        </mesh>
      </group>
    ))}
  </>
);

const knee = (m: Mats) => (
  <>
    <mesh material={m.frame} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.08, 0.08, 0.14, 24]} />
    </mesh>
    <mesh material={m.glow} position={[0.076, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      <torusGeometry args={[0.05, 0.005, 10, 24]} />
    </mesh>
    <mesh material={m.shell} position={[0, 0, 0.08]} scale={[1, 1.2, 0.5]}>
      <sphereGeometry args={[0.07, 32, 32, 0, Math.PI, 0, Math.PI / 2]} />
    </mesh>
    {/* calf */}
    <mesh material={m.frame} position={[0, -0.28, 0]}>
      <cylinderGeometry args={[0.06, 0.042, 0.44, 24]} />
    </mesh>
    <mesh material={m.shell} position={[0, -0.24, -0.02]} scale={[1, 2, 0.8]}>
      <sphereGeometry args={[0.08, 32, 32, Math.PI, Math.PI, 0, Math.PI]} />
    </mesh>
    <mesh material={m.shell} position={[0, -0.28, 0.02]}>
      <cylinderGeometry args={[0.08, 0.05, 0.44, 24, 1, false, -Math.PI / 2 - 0.5, Math.PI + 1]} />
    </mesh>
  </>
);

const ankle = (m: Mats) => (
  <>
    <mesh material={m.frame}>
      <sphereGeometry args={[0.052, 24, 24]} />
    </mesh>
    <mesh material={m.shell} position={[0, 0.03, -0.01]} scale={[1, 0.7, 0.8]}>
      <sphereGeometry args={[0.062, 24, 24]} />
    </mesh>
  </>
);

const foot = (m: Mats) => (
  <>
    <mesh material={m.frame} position={[0, 0, -0.02]}>
      <boxGeometry args={[0.085, 0.07, 0.15]} />
    </mesh>
    <mesh
      material={m.shell}
      position={[0, -0.03, 0.04]}
      scale={[1, 0.45, 1]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <capsuleGeometry args={[0.07, 0.15, 16, 24]} />
    </mesh>
    <mesh material={m.glow} position={[0, -0.02, 0.14]}>
      <boxGeometry args={[0.05, 0.006, 0.004]} />
    </mesh>
  </>
);

/* -------------------------------- assembly --------------------------------- */

const PARTS: PartDef[] = [
  { id: "head", base: [0, 1.85, 0], exp: [0, 2.45, 0], build: head },
  { id: "status", base: [0, 1.5, 0.19], exp: [0.75, 1.75, 0.6], build: statusLight },
  { id: "neck", base: [0, 1.62, 0], exp: [0, 2.08, 0], build: neck },
  { id: null, base: [0, 1.25, 0], exp: [0, 1.25, -0.32], build: torso },
  { id: "battery", base: [0, 1.28, -0.2], exp: [0, 1.28, -0.95], build: battery },
  { id: "shoulder", base: [0.3, 1.35, 0], exp: [0.72, 1.6, 0], mirror: true, build: shoulder },
  { id: "elbow", base: [0.34, 0.86, 0], exp: [1.02, 1.0, 0], mirror: true, build: elbow },
  { id: "wrist", base: [0.35, 0.56, 0], exp: [1.3, 0.72, 0], mirror: true, build: wrist },
  { id: "hand", base: [0.35, 0.44, 0], exp: [1.55, 0.5, 0], mirror: true, build: hand },
  { id: "waist", base: [0, 0.85, 0], exp: [0, 0.85, 0.55], build: waist },
  { id: "hip", base: [0, 0.55, 0], exp: [0, 0.3, 0], build: hip },
  { id: "knee", base: [0.16, -0.06, 0], exp: [0.52, -0.3, 0], mirror: true, build: knee },
  { id: "ankle", base: [0.16, -0.58, 0], exp: [0.62, -0.95, 0], mirror: true, build: ankle },
  { id: "foot", base: [0.16, -0.68, 0.04], exp: [0.72, -1.3, 0.04], mirror: true, build: foot },
];

function useMats(): Mats {
  return useMemo(
    () => ({
      shell: new THREE.MeshPhysicalMaterial({
        color: SHELL,
        roughness: 0.16,
        metalness: 0.15,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
      }),
      frame: new THREE.MeshPhysicalMaterial({
        color: FRAME,
        roughness: 0.4,
        metalness: 0.85,
        clearcoat: 0.25,
      }),
      glow: new THREE.MeshBasicMaterial({ color: GLOW }),
    }),
    [],
  );
}

function Part({
  def,
  active,
  dimmed,
  exploded,
  onHover,
  onSelect,
  side = 1,
}: {
  def: PartDef;
  active: boolean;
  dimmed: boolean;
  exploded: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  side?: 1 | -1;
}) {
  const ref = useRef<THREE.Group>(null);
  const mats = useMats();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const p = exploded ? def.exp : def.base;
    target.set(p[0] * side, p[1], p[2]);
    g.position.lerp(target, 0.09);

    const shell = mats.shell as THREE.MeshPhysicalMaterial;
    const frame = mats.frame as THREE.MeshPhysicalMaterial;
    const lift = active ? 1 : dimmed ? 0.62 : 1;
    shell.color.lerp(new THREE.Color(SHELL).multiplyScalar(lift), 0.12);
    frame.color.lerp(new THREE.Color(FRAME).multiplyScalar(active ? 2.2 : lift), 0.12);
    shell.emissive.lerp(new THREE.Color(active ? GLOW : "#000000").multiplyScalar(0.18), 0.12);
  });

  const interactive = def.id !== null;

  return (
    <group
      ref={ref}
      position={[def.base[0] * side, def.base[1], def.base[2]]}
      rotation={side === -1 ? [0, Math.PI, 0] : [0, 0, 0]}
      onPointerOver={(e) => {
        if (!interactive) return;
        e.stopPropagation();
        onHover(def.id!);
      }}
      onPointerOut={() => {
        if (interactive) onHover(null);
      }}
      onClick={(e) => {
        if (!interactive) return;
        e.stopPropagation();
        onSelect(def.id!);
      }}
    >
      {def.build(mats)}
      {active && interactive && side === 1 ? (
        <Html center distanceFactor={4} position={[0, 0.16, 0]} zIndexRange={[20, 0]}>
          <div className="whitespace-nowrap rounded-full border border-signal/50 bg-background/90 px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-foreground backdrop-blur">
            {PARTH_ANATOMY.find((n) => n.id === def.id)?.name}
          </div>
        </Html>
      ) : null}
    </group>
  );
}

function Robot({
  activeId,
  hovered,
  exploded,
  onHover,
  onSelect,
}: {
  activeId: string;
  hovered: string | null;
  exploded: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = -0.25 + Math.sin(t * 1.2) * 0.015;
  });

  const focus = hovered ?? activeId;

  return (
    <group ref={ref} position={[0, -0.25, 0]}>
      {PARTS.flatMap((def) => {
        const sides: (1 | -1)[] = def.mirror ? [1, -1] : [1];
        return sides.map((side) => (
          <Part
            key={`${def.id ?? "structure"}-${side}`}
            def={def}
            side={side}
            active={def.id === focus}
            dimmed={def.id !== focus}
            exploded={exploded}
            onHover={onHover}
            onSelect={onSelect}
          />
        ));
      })}
    </group>
  );
}

export type ParthModelProps = {
  activeId: string;
  onSelect: (id: string) => void;
  nodes?: AnatomyNode[];
};

export default function ParthModel({ activeId, onSelect }: ParthModelProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  return (
    <div className="relative h-[28rem] w-full md:h-[34rem]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0.9, 0.6, 5.0], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[4, 7, 6]} angle={0.5} penumbra={1} intensity={180} castShadow />
        <spotLight position={[-5, 2, -4]} angle={0.6} penumbra={1} intensity={60} color="#8a7cff" />
        <spotLight position={[0, 4, -7]} angle={0.5} penumbra={1} intensity={90} color={GLOW} />
        <Environment>
          <Lightformer intensity={1.6} position={[0, 4, 2]} scale={[8, 8, 1]} />
          <Lightformer
            intensity={0.8}
            color="#9fb8ff"
            position={[-4, 1, -2]}
            rotation-y={Math.PI / 2}
            scale={[14, 2, 1]}
          />
        </Environment>
        <Robot
          activeId={activeId}
          hovered={hovered}
          exploded={exploded}
          onHover={setHovered}
          onSelect={onSelect}
        />
        <OrbitControls
          enablePan={false}
          minDistance={2.4}
          maxDistance={7}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 1.8}
          enableDamping
          dampingFactor={0.06}
          autoRotate={!hovered}
          autoRotateSpeed={0.5}
          target={[0, 0.35, 0]}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <span className="mono-xs text-muted-foreground">Drag to rotate · hover to inspect</span>
        <button
          type="button"
          onClick={() => setExploded((v) => !v)}
          className="pointer-events-auto rounded-full border border-line px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-signal/60 hover:bg-signal/10"
        >
          {exploded ? "Collapse view" : "Exploded view"}
        </button>
      </div>
    </div>
  );
}
