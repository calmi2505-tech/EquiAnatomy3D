import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.getElementById("canvas3d");

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1117);

// Cámara
const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

// Renderizador
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Luces
scene.add(new THREE.AmbientLight(0xffffff, 3));

const light1 = new THREE.DirectionalLight(0xffffff, 2);
light1.position.set(5, 10, 8);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 2);
light2.position.set(-5, 5, -8);
scene.add(light2);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 1;
controls.maxDistance = 30;

// Cargar caballo
const loader = new GLTFLoader();

loader.load(

    "./Horse.glb?v=3",

    (gltf) => {

        const horse = gltf.scene;

        scene.add(horse);

        // Calcular tamaño
        const box = new THREE.Box3().setFromObject(horse);

        const size = box.getSize(new THREE.Vector3());

        const center = box.getCenter(new THREE.Vector3());

        horse.position.x -= center.x;
        horse.position.y -= center.y;
        horse.position.z -= center.z;

        const maxDimension = Math.max(size.x, size.y, size.z);

        const fov = camera.fov * (Math.PI / 180);

        let cameraZ = Math.abs(maxDimension / 2 / Math.tan(fov / 2));

        cameraZ *= 1.8;

        camera.position.set(0, maxDimension * 0.3, cameraZ);

        controls.target.set(0, maxDimension * 0.2, 0);

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
        container.clientWidth /
        container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

});
