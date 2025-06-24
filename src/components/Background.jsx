
export default function Background({ texture, width, height }) {
  if (!texture) return null

  let scaleX = 1
  let scaleY = 1
  const aspectRatio = width / height

  if (aspectRatio > 1) {
    scaleX = (width * 1.2) / texture.width
    scaleY = scaleX
  } else {
    scaleY = (height * 1.2) / texture.height
    scaleX = scaleY
  }

  return (
    <pixiSprite
      texture={texture}
      anchor={0.5}
      x={width / 2}
      y={height / 2}
      scale={{ x: scaleX, y: scaleY }}
    />
  )
}
