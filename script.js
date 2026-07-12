import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.getElementById("canvas3d");

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Cámara
const camera = new THREE.PerspectiveCamera(
    45,
    (window.innerWidth - 280) / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 2, 6);

// Renderizador
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth - 280, window.innerHeight);

container.innerHTML = "";
container.appendChild(renderer.domElement);

// Luces
scene.add(new THREE.AmbientLight(0xffffff, 2));

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(10, 10, 10);
scene.add(light);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;

// Cargar caballo
const loader = new GLTFLoader();

loader.load(
    "./Horse.glb",

    (gltf) => {

        const horse = gltf.scene;

        // Calcular tamaño
        const box = new THREE.Box3().setFromObject(horse);

        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Centrar modelo
        horse.position.sub(center);

        // Escalar automáticamente
        const maxAxis = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxAxis;

        horse.scale.setScalar(scale);

        scene.add(horse);

        controls.target.set(0, 1, 0);
        controls.update();

        console.log("Horse.glb cargado correctamente");

    },

    (xhr) => {

        if (xhr.total) {

            console.log(
                Math.round(xhr.loaded / xhr.total * 100) + "%"
            );

        }

    },

    (error) => {

        console.error(error);

        alert("No se pudo cargar Horse.glb");

    }

);

// Animación
function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);

}

animate();

// Redimensionar
window.addEventListener("resize", () => {

    camera.aspect =
        (window.innerWidth - 280) /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth - 280,
        window.innerHeight
    );

});
