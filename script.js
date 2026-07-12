import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const escena = new THREE.Scene();
escena.background = new THREE.Color(0x0b1117);

const camara = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camara.position.set(0, 2, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(
    window.innerWidth - 280,
    window.innerHeight
);

document
.getElementById("canvas3d")
.appendChild(renderer.domElement);

// Luces
const luz1 = new THREE.DirectionalLight(0xffffff, 3);
luz1.position.set(5, 10, 7);
escena.add(luz1);

const luz2 = new THREE.AmbientLight(0xffffff, 1.5);
escena.add(luz2);

// Figura temporal
const geometria = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshStandardMaterial({
    color:0x48d15b
});

const cubo = new THREE.Mesh(geometria, material);

escena.add(cubo);

// Controles
const controles = new OrbitControls(
    camara,
    renderer.domElement
);

controles.enableDamping = true;

function animar(){

    requestAnimationFrame(animar);

    controles.update();

    renderer.render(
        escena,
        camara
    );

}

animar();

window.addEventListener("resize",()=>{

    camara.aspect=
        (window.innerWidth-280)/
        window.innerHeight;

    camara.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth-280,
        window.innerHeight
    );

});
