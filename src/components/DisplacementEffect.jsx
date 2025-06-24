
import { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'
import { useTick } from '@pixi/react'

export default function DisplacementEffect({ texture, width, height }) {
  const spriteRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!texture || !spriteRef.current || !containerRef.current) return

    const sprite = spriteRef.current
    const container = containerRef.current

    sprite.texture.baseTexture.resource.style.addressMode = 'repeat'

    const filter = new PIXI.DisplacementFilter({
      sprite,
      scale: 50,
    })

    container.filters = [filter]
  }, [texture])

  useTick(() => {
    const sprite = spriteRef.current
    if (sprite) {
      sprite.x += 1
      sprite.y += 1
    }
  })

  return (
    <container ref={containerRef}>
      <sprite
        ref={spriteRef}
        texture={texture}
        width={width}
        height={height}
        visible={false} 
      />
    </container>
  )
}
