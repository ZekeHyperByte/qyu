<script lang="ts">
  import { onMount } from 'svelte';
  
  interface Props {
    position?: [number, number, number];
    gravity?: [number, number, number];
  }
  
  let { position = [0, 0, 20], gravity = [0, -40, 0] }: Props = $props();
  
  let container: HTMLDivElement;
  let isMobile = $state(false);
  
  onMount(() => {
    isMobile = window.innerWidth < 768;
    
    const handleResize = () => {
      isMobile = window.innerWidth < 768;
    };
    
    window.addEventListener('resize', handleResize);
    
    const loadLanyard = async () => {
      const React = await import('react');
      // @ts-expect-error - react-dom/client types not available
      const ReactDOM = await import('react-dom/client');
      const { Canvas, extend, useFrame } = await import('@react-three/fiber');
      const { useGLTF, useTexture, Environment, Lightformer } = await import('@react-three/drei');
      const { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } = await import('@react-three/rapier');
      const { MeshLineGeometry, MeshLineMaterial } = await import('meshline');
      const THREE = await import('three');
      
      extend({ MeshLineGeometry, MeshLineMaterial });
      
      // Use custom assets
      const cardGLB = '/card2.glb';
      const lanyardTex = '/lanyard2.png';
      
      interface BandProps {
        maxSpeed?: number;
        minSpeed?: number;
        isMobile?: boolean;
      }
      
      const Band = ({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) => {
        const band = React.useRef<any>(null);
        const fixed = React.useRef<any>(null);
        const j1 = React.useRef<any>(null);
        const j2 = React.useRef<any>(null);
        const j3 = React.useRef<any>(null);
        const j4 = React.useRef<any>(null);
        const j5 = React.useRef<any>(null);
        const card = React.useRef<any>(null);
        
        const vec = new THREE.Vector3();
        const ang = new THREE.Vector3();
        const rot = new THREE.Vector3();
        const dir = new THREE.Vector3();
        
        const segmentProps: any = {
          type: 'dynamic',
          canSleep: true,
          colliders: false,
          angularDamping: 4,
          linearDamping: 4
        };
        
        const { nodes, materials } = useGLTF(cardGLB) as any;
        const texture = useTexture(lanyardTex);
        
        // Extended: 6 curve points for 5 joints to reach top edge
        const [curve] = React.useState(() =>
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(), 
            new THREE.Vector3(), 
            new THREE.Vector3(), 
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3()
          ])
        );
        
        const [dragged, drag] = React.useState<false | any>(false);
        const [hovered, hover] = React.useState(false);
        
        // Extended: 5 rope joints to reach top edge
        useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
        useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
        useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
        useRopeJoint(j3, j4, [[0, 0, 0], [0, 0, 0], 1]);
        useRopeJoint(j4, j5, [[0, 0, 0], [0, 0, 0], 1]);
        useSphericalJoint(j5, card, [[0, 0, 0], [0, 2.8, 0]]);
        
        React.useEffect(() => {
          if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => {
              document.body.style.cursor = 'auto';
            };
          }
        }, [hovered, dragged]);
        
        useFrame((state: any, delta: number) => {
          if (dragged && typeof dragged !== 'boolean') {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, j4, j5, fixed].forEach(ref => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({
              x: vec.x - dragged.x,
              y: vec.y - dragged.y,
              z: vec.z - dragged.z
            });
          }
          if (fixed.current) {
            [j1, j2, j3, j4, j5].forEach(ref => {
              if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
              const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
              ref.current.lerped.lerp(
                ref.current.translation(),
                delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
              );
            });
            // Extended curve: card -> j5 -> j4 -> j3 -> j2 -> j1 -> fixed
            curve.points[0].copy(j5.current.translation());
            curve.points[1].copy(j4.current.lerped);
            curve.points[2].copy(j3.current.lerped);
            curve.points[3].copy(j2.current.lerped);
            curve.points[4].copy(j1.current.lerped);
            curve.points[5].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
          }
        });
        
        curve.curveType = 'chordal';
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        
        // Extended configuration reaching top edge with vertical joints
        return React.createElement(React.Fragment, null,
          React.createElement('group', { position: [0, 6, 0] },
            React.createElement(RigidBody, { ref: fixed, ...segmentProps, type: 'fixed' }),
            React.createElement(RigidBody, { position: [0, -0.8, 0], ref: j1, ...segmentProps },
              React.createElement(BallCollider, { args: [0.15] })
            ),
            React.createElement(RigidBody, { position: [0, -1.6, 0], ref: j2, ...segmentProps },
              React.createElement(BallCollider, { args: [0.15] })
            ),
            React.createElement(RigidBody, { position: [0, -2.4, 0], ref: j3, ...segmentProps },
              React.createElement(BallCollider, { args: [0.15] })
            ),
            React.createElement(RigidBody, { position: [0, -3.2, 0], ref: j4, ...segmentProps },
              React.createElement(BallCollider, { args: [0.15] })
            ),
            React.createElement(RigidBody, { position: [0, -4, 0], ref: j5, ...segmentProps },
              React.createElement(BallCollider, { args: [0.15] })
            ),
            React.createElement(RigidBody, {
              position: [0, -4, 0],
              ref: card,
              ...segmentProps,
              type: dragged ? 'kinematicPosition' : 'dynamic'
            },
              React.createElement(CuboidCollider, { args: [1.2, 1.7, 0.01] }),
              React.createElement('group', {
                scale: 3.4,
                position: [0, -1.2, -0.05],
                rotation: [0, Math.PI, 0],
                onPointerOver: () => hover(true),
                onPointerOut: () => hover(false),
                onPointerUp: (e: any) => {
                  e.target.releasePointerCapture(e.pointerId);
                  drag(false);
                },
                onPointerDown: (e: any) => {
                  e.target.setPointerCapture(e.pointerId);
                  drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
                }
              },
                React.createElement('mesh', { geometry: nodes.card.geometry },
                  React.createElement('meshPhysicalMaterial', {
                    map: materials.base.map,
                    'map-anisotropy': 16,
                    clearcoat: isMobile ? 0 : 1,
                    clearcoatRoughness: 0.15,
                    roughness: 0.9,
                    metalness: 0.8
                  })
                ),
                React.createElement('mesh', { geometry: nodes.clip.geometry, material: materials.metal, 'material-roughness': 0.3 }),
                React.createElement('mesh', { geometry: nodes.clamp.geometry, material: materials.metal })
              )
            )
          ),
          React.createElement('mesh', { ref: band },
            React.createElement('meshLineGeometry'),
            React.createElement('meshLineMaterial', {
              color: 'white',
              depthTest: false,
              resolution: isMobile ? [1000, 2000] : [1000, 1000],
              useMap: true,
              map: texture,
              repeat: [-4, 1],
              lineWidth: 2.5
            })
          )
        );
      };
      
      const LanyardReact = () => {
        return React.createElement('div', { 
          className: 'lanyard-wrapper',
          style: { 
            width: '100%', 
            height: '100%',
            position: 'relative'
          }
        },
          React.createElement(Canvas, {
            camera: { position, fov: 20 },  // Default FOV
            dpr: [1, isMobile ? 1.5 : 2],
            gl: { alpha: true },
            onCreated: ({ gl }: any) => gl.setClearColor(new THREE.Color(0x000000), 0)
          },
            React.createElement('ambientLight', { intensity: Math.PI }),
            React.createElement(Physics as any, { gravity, timeStep: isMobile ? 1 / 30 : 1 / 60 },
              React.createElement(Band, { isMobile })
            ),
            React.createElement(Environment, { blur: 0.75 },
              React.createElement(Lightformer, {
                intensity: 2,
                color: 'white',
                position: [0, -1, 5],
                rotation: [0, 0, Math.PI / 3],
                scale: [100, 0.1, 1]
              }),
              React.createElement(Lightformer, {
                intensity: 3,
                color: 'white',
                position: [-1, -1, 1],
                rotation: [0, 0, Math.PI / 3],
                scale: [100, 0.1, 1]
              }),
              React.createElement(Lightformer, {
                intensity: 3,
                color: 'white',
                position: [1, 1, 1],
                rotation: [0, 0, Math.PI / 3],
                scale: [100, 0.1, 1]
              }),
              React.createElement(Lightformer, {
                intensity: 10,
                color: 'white',
                position: [-10, 0, 14],
                rotation: [0, Math.PI / 2, Math.PI / 3],
                scale: [100, 10, 1]
              })
            )
          )
        );
      };
      
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(LanyardReact));
    };
    
    loadLanyard();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div bind:this={container} class="lanyard-container"></div>

<style>
  .lanyard-container {
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    z-index: 5;
  }
  
  .lanyard-container :global(.lanyard-wrapper) {
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
  }
</style>
