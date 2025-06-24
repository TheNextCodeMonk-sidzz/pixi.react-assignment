
import { useTick } from '@pixi/react'
import { useRef } from 'react'

export default function WaterOverlay({ texture, width, height }) {
  const tilePosition = useRef({ x: 0, y: 0 })

  useTick((delta) => {
    tilePosition.current.x -= delta * 1.5
    tilePosition.current.y -= delta * 0.8
  })

  if (!texture || width === 0 || height === 0) return null

  return (
    <pixiTilingSprite
      texture={texture}
      width={width}
      height={height}
      tilePosition={tilePosition.current}
      alpha={0.25}
      zIndex={1000}
    />
  )
}
