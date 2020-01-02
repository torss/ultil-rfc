uniform float ar;
uniform float time;
uniform float scrollY;
uniform sampler2D tex;
varying vec2 vUv;

vec2 rotate(vec2 point, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  mat2 m = mat2(c, -s, s, c);
  return m * point;
}

// See https://gist.github.com/mairod/a75e7b44f68110e1576d77419d608786
vec3 hueShift(vec3 color, float hueAdjust) {
  const vec3 kRGBToYPrime = vec3(0.299, 0.587, 0.114);
  const vec3 kRGBToI = vec3(0.596, -0.275, -0.321);
  const vec3 kRGBToQ = vec3(0.212, -0.523, 0.311);

  const vec3 kYIQToR = vec3(1.0, 0.956, 0.621);
  const vec3 kYIQToG = vec3(1.0, -0.272, -0.647);
  const vec3 kYIQToB = vec3(1.0, -1.107, 1.704);

  float YPrime = dot(color, kRGBToYPrime);
  float I = dot(color, kRGBToI);
  float Q = dot(color, kRGBToQ);
  float hue = atan(Q, I);
  float chroma = sqrt(I * I + Q * Q);

  hue += hueAdjust;

  Q = chroma * sin(hue);
  I = chroma * cos(hue);

  vec3 yIQ = vec3(YPrime, I, Q);

  return vec3(dot(yIQ, kYIQToR), dot(yIQ, kYIQToG), dot(yIQ, kYIQToB));
}

void main() {
  vec2 uv = vUv;
  uv.y -= scrollY;
  uv *= 5.;
  uv.x *= ar;
  float time1 = time * 0.5;
  float time2 = time1;
  float time3 = time1 * 0.1;
  float time4 = time1 * 0.5;
  vec4 texel = texture2D(tex, uv);
  texel.rgb *= vec3(0, 1, 1);

  vec2 ruv = rotate(uv, 0.5 + time3);
  float tmd0 = sin(time1);
  time2 += ruv.x;
  texel.rgb = 0.125 * mix(hueShift(texel.rgb, time4), 0.75 * hueShift(texel.rgb, time4), min(1., tmd0 + 10. * cos(time2)));

  gl_FragColor = texel;
}
