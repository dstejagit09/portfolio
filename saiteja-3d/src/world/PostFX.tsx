import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  EffectComposer,
  N8AO,
  Bloom,
  SMAA,
  DepthOfField,
  HueSaturation,
  BrightnessContrast,
  ToneMapping,
} from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { useQualityStore } from '../store/useQualityStore'

const EXPOSURE = 0.9

/**
 * Deterministically own the renderer's tone mapping so it never double-applies:
 * while the composer is on, ACES lives in the pipeline (renderer = None); when
 * off, the renderer does ACES itself. Guarded so it only reassigns on change.
 */
function ToneMappingController({ post }: { post: boolean }) {
  useFrame(({ gl }) => {
    gl.toneMappingExposure = EXPOSURE
    const want = post ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping
    if (gl.toneMapping !== want) gl.toneMapping = want
  })
  return null
}

function Composer({ dof }: { dof: boolean }) {
  if (dof) {
    return (
      <EffectComposer multisampling={0}>
        <N8AO aoRadius={1.6} intensity={1.6} distanceFalloff={1} halfRes color="#0a0f18" />
        <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={2.2} />
        <Bloom intensity={0.28} luminanceThreshold={0.9} luminanceSmoothing={0.25} mipmapBlur />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <HueSaturation saturation={-0.08} />
        <BrightnessContrast brightness={-0.04} contrast={0.16} />
        <SMAA />
      </EffectComposer>
    )
  }

  return (
    <EffectComposer multisampling={0}>
      <N8AO aoRadius={1.6} intensity={1.6} distanceFalloff={1} halfRes color="#0a0f18" />
      <Bloom intensity={0.28} luminanceThreshold={0.9} luminanceSmoothing={0.25} mipmapBlur />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <HueSaturation saturation={-0.08} />
      <BrightnessContrast brightness={-0.04} contrast={0.16} />
      <SMAA />
    </EffectComposer>
  )
}

/**
 * Subtle, tunable post stack: N8AO (grounded AO), gentle Bloom, ACES tone
 * mapping, a touch of vibrance + contrast for a richer/moodier image, SMAA, and
 * optional DoF. Disabled (composer removed) when `postFx` is off.
 */
export function PostFX() {
  const postFx = useQualityStore((s) => s.postFx)
  const dof = useQualityStore((s) => s.depthOfField)

  return (
    <>
      <ToneMappingController post={postFx} />
      {postFx && <Composer dof={dof} />}
    </>
  )
}
