import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'
import TWEEN from '@tweenjs/tween.js'

export function initThree (vueInstance) {
  const { canvas } = vueInstance.$refs
  const width = 1
  const height = 1

  const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000)
  camera.position.set(0, 0, 1)

  const scene = new THREE.Scene()

  const directionalLight = new THREE.DirectionalLight(0xffffff, 10)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  function createLogoMaterial (color) {
    return new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.9,
      metalness: 0.20,
      roughness: 0.80,
      vertexColors: THREE.VertexColors
    })
  }

  const gltfLoader = new GLTFLoader()
  let logoGroup
  gltfLoader.load('../../statics/ultil-logo-3d.glb', (gltf) => {
    const Uout = gltf.scene.getObjectByName('Uout')
    const Uin = gltf.scene.getObjectByName('Uin')
    const Lshape = gltf.scene.getObjectByName('L')
    Uout.material = createLogoMaterial(0x5598fe)
    Uin.material = createLogoMaterial(0x3087fd)
    Lshape.material = createLogoMaterial(0x6be2ff)
    logoGroup = new THREE.Group()
    logoGroup.scale.setScalar(0.3)
    const Lgroup = new THREE.Group()
    Lgroup.add(Lshape)
    logoGroup.add(Lgroup)
    const Ugroup = new THREE.Group()
    Ugroup.add(Uout)
    Ugroup.add(Uin)
    logoGroup.add(Ugroup)
    scene.add(logoGroup)

    new TWEEN.Tween({ value: 0 }).to({ value: 1 }, 3000).onUpdate((obj) => {
      Lshape.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), obj.value * 2 * Math.PI)
    }).repeat(Infinity).start()
    new TWEEN.Tween({ value: -0.01 }).to({ value: 0.01 }, 1300).onUpdate((obj) => {
      Lgroup.setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), obj.value * 2 * Math.PI)
    }).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).repeat(Infinity).start()
    new TWEEN.Tween({ value: -0.1 }).to({ value: 0.1 }, 4000).onUpdate((obj) => {
      Ugroup.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), obj.value * 2 * Math.PI)
    }).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).repeat(Infinity).start()
    new TWEEN.Tween({ value: -0.1 }).to({ value: 0.1 }, 2500).onUpdate((obj) => {
      Ugroup.position.z = obj.value
    }).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).repeat(Infinity).start()
  })

  const context = canvas.getContext('webgl')
  const renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true })
  renderer.setSize(width, height)

  const $three = {
    isDestroyed: false,
    deinitFuncs: []
  }
  vueInstance.$three = $three

  function windowResizeListener () {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }
  window.addEventListener('resize', windowResizeListener)
  windowResizeListener()

  $three.deinitFuncs.push(() => {
    vueInstance.$three.isDestroyed = true

    window.removeEventListener('resize', windowResizeListener)

    TWEEN.removeAll()

    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) obj.material.dispose()
    })
    renderer.dispose()
  })

  function animate (time) {
    if ($three.isDestroyed) return
    requestAnimationFrame(animate)
    TWEEN.update(time)

    if (logoGroup) {
      logoGroup.position.y = 0.45 + 1.35 * (window.scrollY / window.innerHeight)
    }

    renderer.render(scene, camera)
  }
  requestAnimationFrame(animate)
}

export function deinitThree (vueInstance) {
  vueInstance.$three.deinitFuncs.forEach(func => func())
  delete vueInstance.$three
}
