import * as THREE from "three";

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

camera.position.set(0, 2, 5);

// Renderizador
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(
    window.innerWidth - 280,
    window.innerHeight
);

container.innerHTML = "";
container.appendChild(renderer.domElement);

// Luz ambiente
const ambient = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambient);

// Luz direccional
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 10, 5);
scene.add(light);

// Ejes
const axes = new THREE.AxesHelper(5);
scene.add(axes);

// Suelo
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        color: 0x666666,
        side: THREE.DoubleSide
    })
);

plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Cubo rojo
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        color: 0xff0000
    })
);

cube.position.set(0, 0.5, 0);
scene.add(cube);

// Animación
function animate() {

    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

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
