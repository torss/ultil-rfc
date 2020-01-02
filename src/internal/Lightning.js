// Based on the three.js "lightningstrike" example: https://github.com/mrdoob/three.js/blob/45418089bd5633e856384a8c0beefced87143334/examples/webgl_lightningstrike.html

import * as THREE from 'three'
import { LightningStrike } from 'three/examples/jsm/geometries/LightningStrike.js'

export class Lightning {
  constructor (parent, attachObj0, attachObj1) {
    this.parent = parent
    this.mesh = undefined
    this.material = undefined
    this.lightningStrike = undefined
    this.attachObj0 = attachObj0
    this.attachObj1 = attachObj1
    this.attachOffset0 = new THREE.Vector3()
    this.attachOffset1 = new THREE.Vector3()
    this.rayParams = {
      sourceOffset: new THREE.Vector3(),
      destOffset: new THREE.Vector3(1, 0, 0),
      radius0: 0.005,
      radius1: 0.005,
      // radius0Factor: 0.5,
      // radius1Factor: 0.5,
      minRadius: 0.05,
      maxIterations: 7,
      isEternal: true,

      timeScale: 0.0007,

      propagationTimeFactor: 0.05,
      vanishingTimeFactor: 0.95,
      subrayPeriod: 3.5,
      subrayDutyCycle: 0.6,
      maxSubrayRecursion: 3,
      ramification: 7,
      recursionProbability: 0.6,

      roughness: 0.85,
      straightness: 0.6
    }
  }

  create () {
    if (this.mesh) {
      this.parent.remove(this.mesh)
    }

    this.lightningStrike = new LightningStrike(this.rayParams)
    this.mesh = new THREE.Mesh(this.lightningStrike, this.material)

    this.parent.add(this.mesh)
  }

  update (time) {
    this.attachObj0.getWorldPosition(this.rayParams.sourceOffset).add(this.attachOffset0)
    this.attachObj1.getWorldPosition(this.rayParams.destOffset).add(this.attachOffset1)
    this.lightningStrike.update(time)
  }
}
