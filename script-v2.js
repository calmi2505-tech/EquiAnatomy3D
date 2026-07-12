import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.getElementById("canvas3d");

// ===== Panel de diagnóstico =====
const info = document.createElement("div");
info.style.position = "absolute";
info.style.top = "10px";
info.style.right = "10px";
info.style.background = "rgba(0,0,0,.8)";
info.style.color = "#00ff88";
info.style.padding = "10px";
info.style.fontFamily = "monospace";
info.style.fontSize = "14px";
info.style.zIndex = "1000";
info.innerHTML = "Iniciando...";
document.body.appendChild(info);

function log(msg){
    console.log(msg);
    info.innerHTML += "<br>"+msg;
}

// ===== Escena =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// ===== Cámara =====
const camera = new THREE.PerspectiveCamera(
45,
container.clientWidth/container.clientHeight,
0.01,
5000
);

camera.position.set(0,2,6);

// ===== Render =====
const renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setSize(
container.clientWidth,
container.clientHeight
);

container.innerHTML="";
container.appendChild(renderer.domElement);

// ===== Luces =====
scene.add(new THREE.AmbientLight(0xffffff,4));

const sun=new THREE.DirectionalLight(0xffffff,5);
sun.position.set(10,20,10);
scene.add(sun);

// ===== Ejes =====
scene.add(new THREE.AxesHelper(3));

// ===== Controles =====
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;

// ===== Loader =====
log("Buscando Horse.glb...");

const loader=new GLTFLoader();

loader.load(

"./Horse.glb",

(gltf)=>{

log("Modelo cargado");

const horse=gltf.scene;

scene.add(horse);

horse.position.set(0,0,0);

horse.scale.set(1,1,1);

log("Objetos: "+horse.children.length);

},

(xhr)=>{

if(xhr.total>0){

log(
"Cargando "+
Math.round(xhr.loaded/xhr.total*100)+"%"
);

}

},

(error)=>{

log("ERROR");

console.error(error);

}

);

function animate(){

requestAnimationFrame(animate);

controls.update();

renderer.render(scene,camera);

}

animate();
