const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper();
scene.add( axesHelper );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight );
scene.add( camera );
camera.position.z = 7;

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
console.log();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
window.addEventListener('mousemove', (e) =>
{
	mesh.position.x = e.clientX;
	mesh.position.y = e.clientY;
	console.log(e.clientX);
	console.log(e.clientY);
})
renderer.render( scene, camera );