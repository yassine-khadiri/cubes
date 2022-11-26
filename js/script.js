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

	// Generting Ramdon Colors
	const randomColor = new THREE.Color(`rgb(${randomColor1}, ${randomColor2}, ${randomColor3})`);
	cubesArr[i] = new THREE.Mesh(
		new THREE.BoxGeometry( 1, 1, 1 ),
		new THREE.MeshBasicMaterial({color: randomColor})
	);
	cubesGroup.add( cubesArr[i] );
	scene.add( cubesArr[i] );
};

const mouse = {
	x: 0,
	y: 0
};

window.addEventListener( 'mousemove', (e) =>
{
	mouse.x = e.clientX / window.innerWidth - .5;
	mouse.y = -(e.clientY / window.innerHeight - .5);
	// console.log( mouse.x );
	// console.log( mouse.y );
} );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
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
	camera.position.x = mouse.x * 3;
	camera.position.y = mouse.y * 3;
	renderer.render( scene, camera );
}

animate();