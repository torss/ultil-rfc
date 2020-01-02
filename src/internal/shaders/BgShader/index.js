import vertexShader from './Bg.vert.glsl'
import fragmentShader from './Bg.frag.glsl'

export const BgShader = {
  vertexShader,
  fragmentShader,
  uniforms: {
    tex: { value: null },
    ar: { value: 1.0 },
    time: { value: 1.0 }
  }
}
