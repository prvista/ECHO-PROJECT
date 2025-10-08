import { createApp } from 'vue'
import App from './App.vue'

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Custom CSS
import './style.css'

import { connect } from 'livekit-client'

async function initLiveKit() {
  try {
    const res = await fetch('http://localhost:8000/get_token?identity=user1')
    const data = await res.json()

    const room = await connect(data.url, data.token, {
      audio: true,
      video: true
    })

    // Subscribe to incoming tracks
        room.on('trackSubscribed', (track) => {
        if (track.kind === 'video') {
            const videoEl = document.createElement('video')
            videoEl.srcObject = new MediaStream([track.mediaStreamTrack])
            videoEl.autoplay = true
            videoEl.playsInline = true
            videoEl.className = 'livekit-video' // optional, for styling

            const container = document.getElementById('video-container')
            if (container) container.appendChild(videoEl)
        }
        })

    console.log('Connected to LiveKit room')
  } catch (err) {
    console.error('Failed to connect to LiveKit:', err)
  }
}

initLiveKit()
createApp(App).mount('#app')
