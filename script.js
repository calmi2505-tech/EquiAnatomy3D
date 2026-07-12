import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const contenedor = document.getElementById("canvas3d");

// Crear escena
const escena = new THREE.Scene();
escena.background = new THREE.Color(0x0b1117);

// Cámara
const camara = new THREE.PerspectiveCamera(
    60,
    contenedor.clientWidth / contenedor.clientHeight,
    0.1,
    1000
);

camara.position.set(0, 2, 6);

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
const luzAmbiente = new THREE.AmbientLight(0xffffff, 2);
escena.add(luzAmbiente);

const luzDireccional = new THREE.DirectionalLight(0xffffff, 3);
luzDireccional.position.set(5, 10, 5);
escena.add(luzDireccional);

// Cubo temporal
const geometria = new THREE.BoxGeometry(2, 2, 2);

const material = new THREE.MeshStandardMaterial({
    color: 0x48d15b
});

const cubo = new THREE.Mesh(geometria, material);

escena.add(cubo);

// Controles
const controles = new OrbitControls(
    camara,
    renderer.domElement
);

controles.enableDamping = true;
controles.dampingFactor = 0.05;

// Animación
function animar() {

    requestAnimationFrame(animar);

    cubo.rotation.y += 0.003;

    controles.update();

    renderer.render(
        escena,
        camara
    );

}

animar();

// Redimensionar
window.addEventListener("resize", () => {

    camara.aspect =
        contenedor.clientWidth /
        contenedor.clientHeight;

    camara.updateProjectionMatrix();

    renderer.setSize(
        contenedor.clientWidth,
        contenedor.clientHeight
    );

});
