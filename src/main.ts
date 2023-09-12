import { AmbientLight, CubeTextureLoader, Mesh, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, PointLight, RingGeometry, Scene, SphereGeometry, TextureLoader, TorusGeometry, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let time = 0;

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
camera.position.z = 10;
camera.position.y = 10;

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

// Initialisation of your objects / materials / light
const solarSystem = new Object3D();
scene.add(solarSystem);

// textures
const textureLoader = new TextureLoader();
const cubeTextureLoader = new CubeTextureLoader();
cubeTextureLoader.setPath('/bg/');

const envTexture = cubeTextureLoader.load([
  'back.png', 'front.png',
  'top.png', 'bottom.png',
  'right.png', 'left.png'
])
scene.background = envTexture;

const sunTexture = textureLoader.load('/sun.jpg');
const mercuryTexture = textureLoader.load('/mercury.jpg');
const venusTexture = textureLoader.load('/venus.jpg');
const venusCloudsTexture = textureLoader.load('/venus_atmo.jpg');
const earthTexture = textureLoader.load('/earth.jpg');
const earthNormalTexture = textureLoader.load('/earth_normal.jpg');
const earthNightTexture = textureLoader.load('/earth_night.jpg');
const earthSpecularTexture = textureLoader.load('/earth_specular.jpg');
const earthCloudsTexture = textureLoader.load('/earth_clouds.jpg');
const moonTexture = textureLoader.load('/moon.jpg');
const marsTexture = textureLoader.load('/mars.jpg');
const jupiterTexture = textureLoader.load('/jupiter.jpg');
const saturnTexture = textureLoader.load('/saturn.jpg');
const saturnRingTexture = textureLoader.load('/saturn_ring_alpha.png');
saturnRingTexture.repeat.set(1, 100)
saturnRingTexture.rotation = Math.PI / 2
const uranusTexture = textureLoader.load('/uranus.jpg');
const neptuneTexture = textureLoader.load('/neptune.jpg');

// materials
const whiteMaterial = new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });

const sunMaterial = new MeshStandardMaterial({ emissive: 0xffffff, emissiveMap: sunTexture });
const mercuryMaterial = new MeshStandardMaterial({ map: mercuryTexture });
const venusMaterial = new MeshStandardMaterial({ map: venusTexture });
const venusCloudsMaterial = new MeshStandardMaterial({ alphaMap: venusCloudsTexture, transparent: true });
const earthMaterial = new MeshPhongMaterial({
  map: earthTexture,
  emissive: 0xffaa00,
  emissiveMap: earthNightTexture,
  emissiveIntensity: 1,
  normalMap: earthNormalTexture,
  specular: 0xaaaaaa,
  shininess: 20,
  specularMap: earthSpecularTexture
});
const earthCloudsMaterial = new MeshStandardMaterial({ alphaMap: earthCloudsTexture, transparent: true });
const moonMaterial = new MeshStandardMaterial({ map: moonTexture });
const marsMaterial = new MeshStandardMaterial({ map: marsTexture });
const jupiterMaterial = new MeshStandardMaterial({ map: jupiterTexture });
const saturnMaterial = new MeshStandardMaterial({ map: saturnTexture });
const saturnRingMaterial = new MeshStandardMaterial({ emissive: 0x444433, map: saturnRingTexture, side: 2, transparent: true });
const uranusMaterial = new MeshStandardMaterial({ map: uranusTexture });
const neptuneMaterial = new MeshStandardMaterial({ map: neptuneTexture });

// shapes
const ball = new SphereGeometry(1, 32, 32);
const ring = new TorusGeometry(1.3, 0.4, 32);

// LAMP
const lamp = new PointLight(0xffffdd, 15, 100000);
lamp.position.set(0, 0, 0);
solarSystem.add(lamp);
const ambLamp = new AmbientLight(0x404040);
ambLamp.position.set(0, 0, 0);
solarSystem.add(ambLamp);

// rings representing orbits
const orbits = [...Array(9)].map((_, index) => {
  const distance = index * 0.5
  const width = 0.02;
  const thinRing = new RingGeometry(2 * distance - width, 2 * distance, 128, 128, 0, Math.PI * 2);
  thinRing.rotateX(- Math.PI / 2);
  const orbit = new Mesh(thinRing, whiteMaterial);
  solarSystem.add(orbit);
  return orbit;
})

// planets from close to sun to far
const sun = new Mesh(ball, sunMaterial);
sun.position.set(0, 0, 0);
sun.scale.set(0.4, 0.4, 0.4);
solarSystem.add(sun);
const mercury = new Mesh(ball, mercuryMaterial);
mercury.scale.set(0.1, 0.1, 0.1);
solarSystem.add(mercury);
const venus = new Mesh(ball, venusMaterial);
venus.scale.set(0.15, 0.15, 0.15);
solarSystem.add(venus);
const venusClouds = new Mesh(ball, venusCloudsMaterial);
venusClouds.scale.set(0.16, 0.16, 0.16);
solarSystem.add(venusClouds);
const earth = new Mesh(ball, earthMaterial);
earth.scale.set(0.2, 0.2, 0.2);
solarSystem.add(earth);
const earthClouds = new Mesh(ball, earthCloudsMaterial);
earthClouds.scale.set(0.21, 0.21, 0.21);
solarSystem.add(earthClouds);
const moon = new Mesh(ball, moonMaterial);
moon.scale.set(0.05, 0.05, 0.05);
solarSystem.add(moon);
const mars = new Mesh(ball, marsMaterial);
mars.scale.set(0.2, 0.2, 0.2);
solarSystem.add(mars);
const jupiter = new Mesh(ball, jupiterMaterial);
jupiter.scale.set(0.3, 0.3, 0.3);
solarSystem.add(jupiter);
const saturn = new Mesh(ball, saturnMaterial);
saturn.scale.set(0.3, 0.3, 0.3);
solarSystem.add(saturn);
const saturnRing = new Mesh(ring, saturnRingMaterial);
saturnRing.rotation.x = Math.PI / 2;
saturnRing.scale.set(0.3, 0.3, 0.001);
solarSystem.add(saturnRing);
const uranus = new Mesh(ball, uranusMaterial);
uranus.scale.set(0.3, 0.3, 0.3);
solarSystem.add(uranus);
const neptune = new Mesh(ball, neptuneMaterial);
neptune.scale.set(0.3, 0.3, 0.3);
solarSystem.add(neptune);

type Astra = "sun" | "mercury" | "venus" | "earth" | "moon" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune";
let astra: Astra = "sun";
let timeFlow = true

// This is executed for each frames
function render() {
  if (timeFlow) time++;

  mercury.position.set(
    Math.cos(time / 50) * 1,
    0,
    Math.sin(time / 50) * 1
  );
  venus.position.set(
    Math.cos(time / 100) * 2,
    0,
    Math.sin(time / 100) * 2
  );
  venusClouds.position.set(
    Math.cos(time / 100) * 2,
    0,
    Math.sin(time / 100) * 2
  );
  earth.position.set(
    Math.cos(time / 150) * 3,
    0,
    Math.sin(time / 150) * 3
  );
  earthClouds.rotation.y += 0.01;
  earthClouds.position.set(
    Math.cos(time / 150) * 3,
    0,
    Math.sin(time / 150) * 3
  );
  moon.position.set(
    Math.cos(time / 150) * 3 + Math.cos(time / 10) * 0.4,
    0,
    Math.sin(time / 150) * 3 + Math.sin(time / 10) * 0.4
  );
  mars.position.set(
    Math.cos(time / 200) * 4,
    0,
    Math.sin(time / 200) * 4
  );
  jupiter.position.set(
    Math.cos(time / 250) * 5,
    0,
    Math.sin(time / 250) * 5
  );
  saturn.position.set(
    Math.cos(time / 300) * 6,
    0,
    Math.sin(time / 300) * 6
  );
  saturnRing.position.set(
    Math.cos(time / 300) * 6,
    0,
    Math.sin(time / 300) * 6
  );
  uranus.position.set(
    Math.cos(time / 350) * 7,
    0,
    Math.sin(time / 350) * 7
  );
  neptune.position.set(
    Math.cos(time / 400) * 8,
    0,
    Math.sin(time / 400) * 8
  );

  if (astra === "earth") {
    camera.position.copy(earth.position).add(new Vector3(0, 1, 0));
  }

  requestAnimationFrame(render);
  // Animation code goes here
  controls.update();
  renderer.render(scene, camera);
}
render();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="controls">
    <div id="ctrl-box">
      <button id="reset">Reset temps</button>
      <div><input type="checkbox" id="time-switch" checked /><label for="time-switch">Ecoulement du temps</label></div>
      <div><input type="checkbox" id="orbit-switch" checked /><label for="orbit-switch">Orbites</label></div>
      <div id="cam-pick">
        Camera :
        <button id="cam-normal">Soleil</button>
        <button id="cam-earth">Terre</button>
      </div>
    </div>
  </div>
`

document.querySelector<HTMLButtonElement>('#reset')!.addEventListener('click', () => { time = 0; });
document.querySelector<HTMLInputElement>('#time-switch')!.addEventListener('change', (e) => {
  // @ts-ignore
  if (e.target.checked) {
    timeFlow = true;
  } else {
    timeFlow = false;
  }
});
document.querySelector<HTMLInputElement>('#orbit-switch')!.addEventListener('change', (e) => {
  // @ts-ignore
  if (e.target.checked) {
    orbits.forEach(orbit => orbit.visible = true);
  } else {
    orbits.forEach(orbit => orbit.visible = false);
  }
});

document.querySelector<HTMLButtonElement>('#cam-normal')!.addEventListener('click', () => {
  controls.target = sun.position
  controls.maxDistance = 10
  controls.update()
});
document.querySelector<HTMLButtonElement>('#cam-earth')!.addEventListener('click', () => {
  controls.target = earth.position
  controls.maxDistance = 1
  controls.update()
});
