import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'
import TWEEN from '@tweenjs/tween.js'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { BloomFinalShader } from './shaders/BloomFinalShader'

export function initThree (vueInstance) {
  const { canvas } = vueInstance.$refs
  const width = 1
  const height = 1

  const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000)
  camera.position.set(0, 0, 1)

  const scene = new THREE.Scene()

  const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  function createLogoMaterial (color, emissiveIntensity = 0.75) {
    return new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity,
      metalness: 0.20,
      roughness: 0.80,
      vertexColors: THREE.VertexColors
    })
  }

  const gltfLoader = new GLTFLoader()
  let logoGroup
  let Uout
  gltfLoader.load('../../statics/ultil-logo-3d.glb', (gltf) => {
    Uout = gltf.scene.getObjectByName('Uout')
    const Uin = gltf.scene.getObjectByName('Uin')
    const Lshape = gltf.scene.getObjectByName('L')
    Uout.material = createLogoMaterial(0x5598fe, 0.5)
    Uin.material = createLogoMaterial(0x3087fd, 0.30)
    Lshape.material = createLogoMaterial(0x6be2ff, 0.75)
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
    new TWEEN.Tween({ value: 0 }).to({ value: 1 }, 700).onUpdate((obj) => {
      Uin.material.emissiveIntensity = 0.9 + 0.3 * obj.value
      Lshape.material.emissiveIntensity = 0.75 + 2 * obj.value
    }).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).repeat(Infinity).start()
  })

  const context = canvas.getContext('webgl')
  const renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true })
  renderer.setSize(width, height)

  const passScene = new RenderPass(scene, camera)
  const passBloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.25, 1, 0)
  const composerBloom = new EffectComposer(renderer)
  composerBloom.renderToScreen = false
  composerBloom.addPass(passScene)
  composerBloom.addPass(passBloom)
  const finalPass = new ShaderPass(
    new THREE.ShaderMaterial({
      ...BloomFinalShader,
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: composerBloom.renderTarget2.texture }
      },
      defines: {}
    }), 'baseTexture'
  )
  finalPass.needsSwap = true
  const composerFinal = new EffectComposer(renderer)
  composerFinal.addPass(passScene)
  composerFinal.addPass(finalPass)

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
    composerBloom.setSize(width, height)
    composerFinal.setSize(width, height)
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

      const emissiveIntensity = Uout.material.emissiveIntensity
      Uout.material.emissiveIntensity = 0
      composerBloom.render()
      Uout.material.emissiveIntensity = emissiveIntensity
      composerFinal.render()
    }
  }
  requestAnimationFrame(animate)
}

export function deinitThree (vueInstance) {
  vueInstance.$three.deinitFuncs.forEach(func => func())
  delete vueInstance.$three
}
