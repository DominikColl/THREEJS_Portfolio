import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

const gui = new dat.GUI()
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)

const colorTexture = textureLoader.load('/textures/brick/Wood_Shingles_001_basecolor.jpg')
const bricksAmbientOcclusionTexture=textureLoader.load('/textures/brick/Wood_Shingles_001_ambientOcclusion.jpg')
const bricksNormalTexture=textureLoader.load('/textures/brick/Wood_Shingles_001_normal.jpg')
const bricksRoughnessTexture=textureLoader.load('/textures/brick/Wood_Shingles.jpg')
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3



// Scene
const scene = new THREE.Scene()

/**
 * Room 1
 */
// material
const material = new THREE.MeshBasicMaterial( {
    map:colorTexture,
    aoMap:bricksAmbientOcclusionTexture,
    normalMap:bricksNormalTexture,
    roughnessMap:bricksRoughnessTexture,
     side: THREE.DoubleSide
} );
const materialFloor = new THREE.MeshBasicMaterial( {
    // map:colorTexture,
    // aoMap:bricksAmbientOcclusionTexture,
    // normalMap:bricksNormalTexture,
    // roughnessMap:bricksRoughnessTexture,
     side: THREE.DoubleSide
} );
// geometry
const geometry = new THREE.BoxGeometry( 1, 1,.1 );
// gui.add(geometry,'width').min('0').max('3').step('.01')

// group creation
const roomOne=new THREE.Group()
scene.add(roomOne)
// mesh creations
const backWall=new THREE.Mesh(geometry,material)
roomOne.add(backWall)

const floor=new THREE.Mesh(geometry,materialFloor)
floor.rotation.x=1.57
floor.position.y=-.506
floor.position.z=.477
// gui.add(floor.rotation,'x').min('0').max('2').step('.001')
// gui.add(floor.position,'y').min(-3).max('5').step('.001')
// gui.add(floor.position,'z').min(-3).max('5').step('.001')

roomOne.add(floor)

const leftWall=new THREE.Mesh(geometry,material)
leftWall.rotation.y=1.57
leftWall.position.x=-0.5064
leftWall.position.z=0.477
// gui.add(leftWall.rotation,'y').min('0').max('2').step('.001')
// gui.add(leftWall.position,'x').min(-3).max('5').step('.0001')
// gui.add(leftWall.position,'z').min(-3).max('5').step('.001')
roomOne.add(leftWall) 

const rightWall=new THREE.Mesh(geometry,material)
rightWall.rotation.y=1.57
rightWall.position.x=0.5064
rightWall.position.z=0.477
scene.add(rightWall)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = .2
camera.position.z = 1.3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()