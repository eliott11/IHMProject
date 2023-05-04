import * as THREE from 'three';
import {
  GLTFLoader
} from 'three/addons/loaders/GLTFLoader.js';

let alpha, beta, gamma = 0;

function click() {
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', (event) => {
            alpha = event.alpha;
            beta = event.beta;
            gamma = event.gamma;
          });
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('deviceorientation', (event) => {
      alpha = event.alpha;
      beta = event.beta;
      gamma = event.gamma;
    });
  }
}

click();

const degToRad = (deg) => deg * (Math.PI / 280);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

camera.position.z = 100;
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const loader = new GLTFLoader();
loader.load(
  'maze.gltf',
  function (gltf) {

    const object = gltf.scene.children[0];

    object.material = new THREE.MeshStandardMaterial({
      color: 0xff0000 // Rouge
    });

    object.scale.set(0.7, 0.7, 0.7);

    object.rotation.x = -0.99;
    object.rotation.y = 0.5;

    scene.add(object);

    window.addEventListener('devicemotion', function (event) {
      const acceleration = event.accelerationIncludingGravity;

      if (acceleration.x > 15 || acceleration.y > 15 || acceleration.z > 15) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        object.material.color.set('#' + randomColor);
      }
    });
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% chargé');
  },
  function (error) {
    console.error('Erreur de chargement', error);
  }
);

function animate() {

  scene.rotation.z = degToRad(alpha) / 2;
  scene.rotation.x = degToRad(beta);
  scene.rotation.y = degToRad(gamma);

  renderer.render(scene, camera);
}

animate();


// import * as THREE from 'three';

// let alpha, beta, gamma = 0;

// function click() {
//   if (typeof DeviceOrientationEvent.requestPermission === 'function') {
//     DeviceOrientationEvent.requestPermission()
//       .then(permissionState => {
//         if (permissionState === 'granted') {
//           window.addEventListener('deviceorientation', (event) => {
//             alpha = event.alpha;
//             beta = event.beta;
//             gamma = event.gamma;
//           });
//         }
//       })
//       .catch(console.error);
//   } else {
//     window.addEventListener('deviceorientation', (event) => {
//       alpha = event.alpha;
//       beta = event.beta;
//       gamma = event.gamma;
//     });
//   }
// }

// click();

// const degToRad = (deg) => deg * (Math.PI / 180);

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);

// renderer.setAnimationLoop(animate);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshNormalMaterial({
//   color: 0x00ff00
// });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// function animate() {

//   cube.rotation.z = degToRad(alpha) / 2;
//   cube.rotation.x = degToRad(beta);
//   cube.rotation.y = degToRad(gamma);

//   renderer.render(scene, camera);
// }
