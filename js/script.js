import * as THREE from "https://cdn.skypack.dev/three";
import OrbitControls from 'https://cdn.skypack.dev/threejs-orbit-controls';

// Creating The Scene
const scene = new THREE.Scene();

// const axesHelper = new THREE.AxesHelper( 2 );
// scene.add( axesHelper );

// Creating The Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight );
scene.add( camera );
camera.position.z = 7;

// Creating The Group To Add All Cubes To It
const cubesGroup = new THREE.Group();

const cubesArr = [];
for (let i = 0; i < 20; i++)
{
	let randomColor1 = Math.floor(Math.random() * 256);
	let randomColor2 = Math.floor(Math.random() * 256);
	let randomColor3 = Math.floor(Math.random() * 256);

	// Generting Random Colors
	const randomColor = new THREE.Color(`rgb(${randomColor1}, ${randomColor2}, ${randomColor3})`);
	cubesArr[i] = new THREE.Mesh(
		new THREE.BoxGeometry( 1, 1, 1 ),
		new THREE.MeshBasicMaterial({color: randomColor})
	);
	cubesGroup.add( cubesArr[i] );
	scene.add( cubesArr[i] );
};

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Add Controls
const orbitControls = new OrbitControls( camera, renderer.domElement );

// Make Responsive WebGl Experience
const updateView = ()=>
{
	// Add A Listener For Resizing
	window.addEventListener( 'resize', () =>
	{
		// Update Camera Aspect 
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		// Update Rendrerer
		renderer.setSize( window.innerWidth, window.innerHeight );
	} );
}

updateView();

const time = new THREE.Clock();

const animate = ()=>
{
	let elapsedTime = time.getElapsedTime();
	// This Method Used To Call The Animate Function Every Frame!
	requestAnimationFrame( animate );
	for (let i = 0; i < 20; i++)
	{
		cubesArr[i].position.x = Math.cos( (elapsedTime - i) / 2 );
		cubesArr[i].position.y = Math.sin( elapsedTime - i );
		cubesArr[i].position.z = Math.tan( elapsedTime + i / 3 );
		cubesArr[i].rotation.x = (elapsedTime - i) / 3;
		cubesArr[i].rotation.y = (elapsedTime - i) / 3;
	}
	renderer.render( scene, camera );
}

animate();