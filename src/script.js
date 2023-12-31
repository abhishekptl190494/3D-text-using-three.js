import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

//FOnts
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'Abhishek  Patel',
          //  'Software Developer',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 3,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        // )
        textGeometry.center()

        const textGeometry2 = new TextGeometry('Full - Stack    Developer', {
            font: font,
            size: 0.2,
            height: 0.1,
            curveSegments: 3,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4,
        });
        textGeometry2.computeBoundingBox();
        textGeometry2.center();


     // Position the second text geometry above the first one
    const verticalSpacing = -1.5; // Adjust this value based on your preference
    textGeometry2.translate(0, textGeometry.boundingBox.max.y + verticalSpacing, 0);

    // Create materials and meshes for both text geometries
    const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture }); 
    const textMaterial1 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, color:'red' });

    const text1 = new THREE.Mesh(textGeometry, textMaterial);
    const text2 = new THREE.Mesh(textGeometry2, textMaterial1);

    // Add both text meshes to the scene
    scene.add(text1);
    scene.add(text2);

        // const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
        // //textMaterial.wireframe = true
        // const text = new THREE.Mesh(textGeometry, textMaterial)
        // scene.add(text)
        
        // const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
        // //textMaterial.wireframe = true
        // const text = new THREE.Mesh(textGeometry, textMaterial)
        // scene.add(text)

        const roundGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
        const roundMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture, color:'orange'})

        for(let i=0; i < 100; i++)
        {

            const round =new THREE.Mesh(roundGeometry, roundMaterial)

            round.position.x = (Math.random() - 0.5) * 10
            round.position.y = (Math.random() - 0.5) * 10
            round.position.z = (Math.random() - 0.5) * 10

            round.rotation.x = Math.random() * Math.PI
            round.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            round.scale.set(scale, scale, scale)

            scene.add(round)
        }


    }
)



/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

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
camera.position.x = 1
camera.position.y = -2
camera.position.z = 4
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