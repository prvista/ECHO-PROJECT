<template>
  <div class="jarvis-bg d-flex flex-column vh-100 text-light">
    <div class="container-fluid flex-grow-1 d-flex">
      <ControlPanel class="col-3 p-3 border-end border-info" />
      <VideoFeed class="col-9 p-4" />
    </div>

    <footer class="text-center py-2 small bg-dark bg-opacity-50 text-info">
      Echo AI System © 2025 | Connected to LiveKit Server
    </footer>
  </div>
</template>

<script>
import ControlPanel from "./components/ControlPanel.vue";
import VideoFeed from "./components/VideoFeed.vue";

export default {
  components: { ControlPanel, VideoFeed },
};
</script>

<style>
.jarvis-bg {
  background: radial-gradient(circle at top left, #0b1a24, #020c12);
  backdrop-filter: blur(10px);
}
</style>
