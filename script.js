import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.getElementById("canvas3d");

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1117);

// Cámara
const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

camera.position.set(0, 2, 8);

// Renderizador
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.innerHTML = "";
container.appendChild(renderer.domElement);

// Luces
scene.add(new THREE.AmbientLight(0xffffff, 2));

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(10,10,10);
scene.add(light);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Loader
const loader = new GLTFLoader();

loader.load(
  "./Horse.glb",

  (gltf)=>{

      const horse = gltf.scene;

      // Calcular tamaño
      const box = new THREE.Box3().setFromObject(horse);

      const size = box.getSize(new THREE.Vector3());

      const center = box.getCenter(new THREE.Vector3());

      horse.position.sub(center);

      const maxAxis = Math.max(size.x,size.y,size.z);

      horse.scale.multiplyScalar(5/maxAxis);

      scene.add(horse);

      console.log("Horse cargado");

  },

  undefined,

  (error)=>{

      console.error(error);

      alert("No se pudo cargar Horse.glb");

  }

);

// Animación
function animate(){

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene,camera);

}

animate();

// Resize
window.addEventListener("resize",()=>{

    camera.aspect =
        container.clientWidth /
        container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

});
