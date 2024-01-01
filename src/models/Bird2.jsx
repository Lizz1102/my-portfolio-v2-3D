/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Prof.v7x (https://sketchfab.com/profesor_v7x)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/dragon-boss-a8d48a46c4264148974a7b7c37087e94
Title: Dragon Boss
*/
// TODO - Replace with my own flying object (for example, dragon) 
import { useRef, useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";

import bird2Scene from "../assets/3d/bird2.glb";
import { useFrame } from "@react-three/fiber";

const Bird2 = (props) => {
    const bird2Ref = useRef();
    const { scene, animations } = useGLTF(bird2Scene);
    const { actions } = useAnimations(animations, bird2Ref);

    useEffect(() => {
        actions["Take 001"].play();
    }, []);

    useFrame(({ clock, camera }) => {
        // Update the Y position to simulate bird-like motion using a sine wave
        bird2Ref.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

        // Check if the bird reached a certain endpoint relative to the camera
        if (bird2Ref.current.position.x > camera.position.x + 10) {
            // Change direction to backward and rotate the bird 180 degrees on the y-axis
            bird2Ref.current.rotation.y = Math.PI;
        } else if (bird2Ref.current.position.x < camera.position.x - 10) {
            // Change direction to forward and reset the bird's rotation
            bird2Ref.current.rotation.y = 0;
        }

        // Update the X and Z positions based on the direction
        if (bird2Ref.current.rotation.y === 0) {
            // Moving forward
            bird2Ref.current.position.x += 0.01;
            bird2Ref.current.position.z -= 0.01;
        } else {
            // Moving backward
            bird2Ref.current.position.x -= 0.01;
            bird2Ref.current.position.z += 0.01;
        }
    });

    return (
        <mesh ref={bird2Ref} position={[-5, 2, 1]} scale={[3, 3, 3]}>
            <primitive object={scene} />
        </mesh>
    );
};

export default Bird2;
