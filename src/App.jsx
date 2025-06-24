// App.jsx
import { useEffect, useRef, useState } from 'react'
import { Assets, Sprite,  DisplacementFilter, Ticker } from 'pixi.js'
import { Application } from '@pixi/react'

import useResize from './hooks/useResize'
import Background from './components/Background'
import Fishes from './components/Fishes'
import WaterOverlay from './components/WaterOverlay'

export default function App() {
  const { width, height } = useResize()
  const [textures, setTextures] = useState(null)
  const sceneRef = useRef(null)
  const displacementSpriteRef = useRef(null)

  // Load textures
  useEffect(() => {
    const loadAssets = async () => {
      const assets = [
        { alias: 'background', src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg' },
        { alias: 'fish1', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish1.png' },
        { alias: 'fish2', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish2.png' },
        { alias: 'fish3', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish3.png' },
        { alias: 'fish4', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish4.png' },
        { alias: 'fish5', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish5.png' },
        { alias: 'overlay', src: 'https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png' },
        { alias: 'displacement', src: 'https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png' },
      ]
      const result = await Assets.load(assets)
      setTextures(result)
    }

    loadAssets()
  }, [])


  useEffect(() => {
    if (!textures || !sceneRef.current) return

    const sprite = Sprite.from(textures['displacement'])
    sprite.texture.baseTexture.wrapMode = WRAP_MODES.REPEAT
    sprite.visible = false
    displacementSpriteRef.current = sprite

    const filter = new DisplacementFilter({
      sprite: sprite,
      scale: 60
    })

    sceneRef.current.addChild(sprite)
    sceneRef.current.filters = [filter]


    const ticker = Ticker.shared
    const animate = () => {
      if (displacementSpriteRef.current) {
        displacementSpriteRef.current.x += 1
        displacementSpriteRef.current.y += 1
      }
    }

    ticker.add(animate)

    return () => {
      ticker.remove(animate)
    }
  }, [textures])

  if (!textures) return null

  return (
    <Application
      options={{
        background: '#1099bb',
        width,
        height,
        antialias: true,
        autoDensity: true,
      }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <pixiContainer ref={sceneRef} sortableChildren={true}>
        <Background texture={textures['background']} width={width} height={height} />
        <WaterOverlay texture={textures['overlay']} width={width} height={height} />
        <Fishes textures={textures} width={width} height={height} />
      </pixiContainer>
    </Application>
  )
}
