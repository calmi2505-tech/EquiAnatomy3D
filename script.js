import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const contenedor = document.getElementById("canvas3d");

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1117);

// Cámara
const camera = new THREE.PerspectiveCamera(
    60,
    contenedor.clientWidth / contenedor.clientHeight,
    0.1,
    1000
);

camera.position.set(0, 2, 6);

// Renderizador
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(
    contenedor.clientWidth,
    contenedor.clientHeight
);

contenedor.innerHTML = "";
contenedor.appendChild(renderer.domElement);

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Controles
const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Cargar modelo
const loader = new GLTFLoader();

loader.load(
    "Caballo.glb",

    function(gltf){

        const horse = gltf.scene;

        // Ajustes iniciales
        horse.scale.set(1,1,1);
        horse.position.set(0,0,0);

        scene.add(horse);

        console.log("Caballo cargado correctamente");

    },

    function(xhr){

        console.log(
            (xhr.loaded / xhr.total * 100) + "% cargado"
        );

    },

    function(error){

        console.error(error);

        alert("Error cargando Caballo.glb");

    }

);

// Animación
function animate(){

    requestAnimationFrame(animate);

    controls
