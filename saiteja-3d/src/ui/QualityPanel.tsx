import { useState } from 'react'
import { useQualityStore, type GrassDensity } from '../store/useQualityStore'
import '../styles/quality.css'

const GRASS_OPTIONS: GrassDensity[] = ['off', 'low', 'medium', 'high']

/** Bottom-right gear that opens graphics-quality toggles (dial effects down for fps). */
export function QualityPanel() {
  const [open, setOpen] = useState(false)
  const q = useQualityStore()

  return (
    <div className="quality">
      <button
        className="quality-gear"
        aria-label="Graphics settings"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        ⚙
      </button>

      {open && (
        <div className="quality-panel">
          <div className="quality-title">Graphics</div>

          <div className="quality-presets">
            <button onClick={() => q.applyPreset('low')}>Low</button>
            <button onClick={() => q.applyPreset('balanced')}>Balanced</button>
            <button onClick={() => q.applyPreset('high')}>High</button>
          </div>

          <label className="quality-row">
            <span>Grass</span>
            <select
              value={q.grass}
              onChange={(e) => q.setGrass(e.target.value as GrassDensity)}
            >
              {GRASS_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>

          <Toggle label="Environment (HDRI)" checked={q.environment} onChange={q.setEnvironment} />
          <Toggle label="Water reflections" checked={q.reflections} onChange={q.setReflections} />
          <Toggle label="Post-processing" checked={q.postFx} onChange={q.setPostFx} />
          <Toggle label="Depth of field" checked={q.depthOfField} onChange={q.setDepthOfField} />
        </div>
      )}
    </div>
  )
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="quality-row">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  )
}
