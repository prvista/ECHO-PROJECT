<template>
  <div
    class="h-100 d-flex flex-column justify-content-center align-items-center"
  >
    <div class="video-container border border-info rounded-4 overflow-hidden">
      <video
        autoplay
        muted
        playsinline
        class="w-100 h-100 bg-black rounded-4"
      ></video>
    </div>
    <div class="mt-3 text-info">
      <h5>AI Visual Feed</h5>
    </div>
  </div>
</template>

<style scoped>
.video-container {
  width: 90%;
  height: 70%;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.3);
}
</style>
