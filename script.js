import * as THREE from "three";

const container = document.getElementById("canvas3d");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(
45,
container.clientWidth/container.clientHeight,
0.1,
1000
);

camera.position.set(0,2,5);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(container.clientWidth,container.clientHeight);
container.appendChild(renderer.domElement);

// Luces
scene.add(new THREE.AmbientLight(0xffffff,3));

const light=new THREE.DirectionalLight(0xffffff,3);
light.position.set(5,10,5);
scene.add(light);

// Ejes
const axes=new THREE.AxesHelper(5);
scene.add(axes);

// Suelo
const plane=new THREE.Mesh(
new THREE.PlaneGeometry(20,20),
new THREE.MeshStandardMaterial({color:0x666666})
);

plane.rotation.x=-Math.PI/2;
scene.add(plane);

// Cubo rojo
const cube=new THREE.Mesh(
new THREE.BoxGeometry(),
new THREE.MeshStandardMaterial({color:"red"})
);

cube.position.y=0.5;
scene.add(cube);

function animate(){

requestAnimationFrame(animate);

cube.rotation.y+=0.01;

renderer.render(scene,camera);

}

animate();
