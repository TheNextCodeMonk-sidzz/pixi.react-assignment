import { useEffect, useRef, useState } from 'react'
import { useTick } from '@pixi/react'

const fishAssets = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5']
const fishCount = 20

export default function Fishes({ textures, width, height }) {
  const [_, forceRender] = useState(0)
  const fishesRef = useRef([])

  useEffect(() => {
    const newFishes = []

    for (let i = 0; i < fishCount; i++) {
      const texture = textures[fishAssets[i % fishAssets.length]]
      newFishes.push({
        texture,
        anchor: { x: 0.5, y: 0.5 },
        direction: Math.random() * Math.PI * 2,
        speed: 2 + Math.random() * 2,
        turnSpeed: Math.random() - 0.8,
        x: Math.random() * width,
        y: Math.random() * height,
        scale: 0.5 + Math.random() * 0.2,
        rotation: 0,
      })
    }

    fishesRef.current = newFishes
    forceRender((n) => n + 1)
  }, [textures, width, height])

  useTick(() => {
    const fishes = fishesRef.current
    const padding = 100
    const boundWidth = width + padding * 2
    const boundHeight = height + padding * 2

    for (let fish of fishes) {
      fish.direction += fish.turnSpeed * 0.01
      fish.x += Math.sin(fish.direction) * fish.speed
      fish.y += Math.cos(fish.direction) * fish.speed
      fish.rotation = -fish.direction - Math.PI / 2

      if (fish.x < -padding) fish.x += boundWidth
      if (fish.x > width + padding) fish.x -= boundWidth
      if (fish.y < -padding) fish.y += boundHeight
      if (fish.y > height + padding) fish.y -= boundHeight
    }

    forceRender((n) => n + 1)
  })

  return (
    <pixiContainer>
      {fishesRef.current.map((fish, index) => (
        <pixiSprite
          key={index}
          texture={fish.texture}
          anchor={fish.anchor}
          x={fish.x}
          y={fish.y}
          rotation={fish.rotation}
          scale={fish.scale}
        />
      ))}
    </pixiContainer>
  )
}
