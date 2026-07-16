import * as THREE from 'three'
import { valueNoise } from './noise'

function fbmPix(x: number, y: number, oct: number): number {
  let a = 0.5
  let f = 1
  let s = 0
  let n = 0
  for (let i = 0; i < oct; i++) {
    s += a * valueNoise(x * f, y * f)
    n += a
    a *= 0.5
    f *= 2
  }
  return s / n
}

export type GrassTextures = {
  map: THREE.CanvasTexture
  normalMap: THREE.CanvasTexture
  roughnessMap: THREE.CanvasTexture
}

/**
 * Procedurally generate a tileable PBR grass set (color + normal + roughness)
 * on canvases — self-contained (no external downloads). Swap in a PolyHaven /
 * ambientCG grass set later for extra fidelity if desired.
 */
export function makeGrassTextures(repeat = 40, anisotropy = 8): GrassTextures {
  const S = 256
  const height = new Float32Array(S * S)
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) height[y * S + x] = fbmPix(x * 0.06, y * 0.06, 4)
  }
  const idx = (x: number, y: number) => ((y + S) % S) * S + ((x + S) % S)

  const color = document.createElement('canvas')
  const normal = document.createElement('canvas')
  const rough = document.createElement('canvas')
  color.width = color.height = normal.width = normal.height = rough.width = rough.height = S
  const cImg = color.getContext('2d')!.createImageData(S, S)
  const nImg = normal.getContext('2d')!.createImageData(S, S)
  const rImg = rough.getContext('2d')!.createImageData(S, S)

  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const o = (y * S + x) * 4
      const n = height[idx(x, y)]
      const patch = fbmPix(x * 0.02 + 100, y * 0.02 + 100, 3)

      // color — rich, uniform saturated green (low variance so it reads even
      // across the whole meadow), with only faint tonal variation
      cImg.data[o] = 46 + n * 18 + patch * 14
      cImg.data[o + 1] = 108 + n * 44
      cImg.data[o + 2] = 32 + n * 14
      cImg.data[o + 3] = 255

      // roughness — grass is rough (0.82–0.98), slight variation
      const r = 210 + n * 40
      rImg.data[o] = rImg.data[o + 1] = rImg.data[o + 2] = r
      rImg.data[o + 3] = 255

      // normal — from the noise heightfield gradient
      const hl = height[idx(x - 1, y)]
      const hr = height[idx(x + 1, y)]
      const hd = height[idx(x, y - 1)]
      const hu = height[idx(x, y + 1)]
      const st = 2.4
      let nx = (hl - hr) * st
      let ny = (hd - hu) * st
      let nz = 1
      const len = Math.hypot(nx, ny, nz)
      nx /= len
      ny /= len
      nz /= len
      nImg.data[o] = (nx * 0.5 + 0.5) * 255
      nImg.data[o + 1] = (ny * 0.5 + 0.5) * 255
      nImg.data[o + 2] = (nz * 0.5 + 0.5) * 255
      nImg.data[o + 3] = 255
    }
  }
  color.getContext('2d')!.putImageData(cImg, 0, 0)
  normal.getContext('2d')!.putImageData(nImg, 0, 0)
  rough.getContext('2d')!.putImageData(rImg, 0, 0)

  const mk = (canvas: HTMLCanvasElement, srgb: boolean) => {
    const t = new THREE.CanvasTexture(canvas)
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(repeat, repeat)
    if (srgb) t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = anisotropy
    return t
  }
  return { map: mk(color, true), normalMap: mk(normal, false), roughnessMap: mk(rough, false) }
}
