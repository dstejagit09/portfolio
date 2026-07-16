import { create } from 'zustand'

export type GrassDensity = 'off' | 'low' | 'medium' | 'high'

/** Instanced-blade counts per density tier (first performance lever to cut). */
export const GRASS_COUNTS: Record<GrassDensity, number> = {
  off: 0,
  low: 30000,
  medium: 60000,
  high: 95000,
}

type QualityState = {
  /** image-based lighting (HDRI environment) + its reflections */
  environment: boolean
  /** instanced grass density */
  grass: GrassDensity
  /** planar water reflections (MeshReflectorMaterial) */
  reflections: boolean
  /** EffectComposer post-processing (SSAO, Bloom, SMAA) */
  postFx: boolean
  /** depth of field (off by default — cut this before reflections) */
  depthOfField: boolean

  setEnvironment: (v: boolean) => void
  setGrass: (v: GrassDensity) => void
  setReflections: (v: boolean) => void
  setPostFx: (v: boolean) => void
  setDepthOfField: (v: boolean) => void
  /** one-tap performance preset */
  applyPreset: (p: 'low' | 'balanced' | 'high') => void
}

export const useQualityStore = create<QualityState>((set) => ({
  environment: true,
  grass: 'medium',
  reflections: true,
  postFx: true,
  depthOfField: false,

  setEnvironment: (v) => set({ environment: v }),
  setGrass: (v) => set({ grass: v }),
  setReflections: (v) => set({ reflections: v }),
  setPostFx: (v) => set({ postFx: v }),
  setDepthOfField: (v) => set({ depthOfField: v }),

  applyPreset: (p) =>
    set(
      p === 'low'
        ? { environment: true, grass: 'low', reflections: false, postFx: false, depthOfField: false }
        : p === 'high'
          ? { environment: true, grass: 'high', reflections: true, postFx: true, depthOfField: true }
          : { environment: true, grass: 'medium', reflections: true, postFx: true, depthOfField: false },
    ),
}))
