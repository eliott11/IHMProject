import * as THREE from 'three';

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

const degToRad = (deg) => deg * (Math.PI / 180);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial({
  color: 0x00ff00
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {

  cube.rotation.z = degToRad(alpha) / 2;
  cube.rotation.x = degToRad(beta);
  cube.rotation.y = degToRad(gamma);

  renderer.render(scene, camera);
}

// var px = 50; // Position x and y
// var py = 50;
// var vx = 0.0; // Velocity x and y
// var vy = 0.0;
// var updateRate = 1 / 60; // Sensor refresh rate

// function getAccel() {
//   DeviceMotionEvent.requestPermission().then(response => {
//     if (response == 'granted') {
//       // Add a listener to get smartphone orientation
//       // in the alpha-beta-gamma axes (units in degrees)
//       window.addEventListener('deviceorientation', (event) => {
//         // Expose each orientation angle in a more readable way
//         rotation_degrees = event.alpha;
//         frontToBack_degrees = event.beta;
//         leftToRight_degrees = event.gamma;

//         // Update velocity according to how tilted the phone is
//         // Since phones are narrower than they are long, double the increase to the x velocity
//         vx = vx + leftToRight_degrees * updateRate * 2;
//         vy = vy + frontToBack_degrees * updateRate;

//         // Update position and clip it to bounds
//         px = px + vx * .5;
//         if (px > 98 || px < 0) {
//           px = Math.max(0, Math.min(98, px)) // Clip px between 0-98
//           vx = 0;
//         }

//         py = py + vy * .5;
//         if (py > 98 || py < 0) {
//           py = Math.max(0, Math.min(98, py)) // Clip py between 0-98
//           vy = 0;
//         }

//         dot = document.getElementsByClassName("indicatorDot")[0]
//         dot.setAttribute('style', "left:" + (px) + "%;" +
//           "top:" + (py) + "%;");

//       });
//     }
//   });
// }