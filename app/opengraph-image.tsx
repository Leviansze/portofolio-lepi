import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Muhammad Desta Portfolio'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 60, marginBottom: 20 }}>Rico Eriansyah</div>
        <div style={{ fontSize: 30, color: '#888' }}>Software Engineer & Teacher</div>
      </div>
    ),
    {
      ...size,
    }
  )
}