import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.getElementById("canvas3d");

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// Cámara
const camera = new THREE.PerspectiveCamera(
    45,
    (window.innerWidth - 280) / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 2, 8);

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

const light1 = new THREE.DirectionalLight(0xffffff, 3);
light1.position.set(10, 10, 10);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 2);
light2.position.set(-10, 5, -10);
scene.add(light2);

// Suelo
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({
        color: 0x555555,
        side: THREE.DoubleSide
    })
);

floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Ejes (solo para pruebas)
scene.add(new THREE.AxesHelper(5));

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// Loader
const loader = new GLTFLoader();

loader.load(
    "./Horse.glb",

    (gltf) => {

        const horse = gltf.scene;

        // Calcular dimensiones
        const box = new THREE.Box3().setFromObject(horse);

        const center = box.getCenter(new THREE.Vector3());

        const size = box.getSize(new THREE.Vector3());

        horse.position.sub(center);

        const maxSize = Math.max(size.x, size.y, size.z);

        const scale = 4 / maxSize;

        horse.scale.setScalar(scale);

        scene.add(horse);

        console.log("Horse cargado correctamente");

    },

    undefined,

    (error) => {

        console.error(error);

        alert("Error cargando Horse.glb");

    }

);

function animate(){

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

    camera.aspect =
        (window.innerWidth-280) /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth-280,
        window.innerHeight
    );

});
