<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark text-light"
  >
    <div
      class="card bg-secondary bg-opacity-25 text-center p-5 shadow-lg"
      style="width: 24rem; border-radius: 1rem"
    >
      <h1 class="mb-3 text-warning fw-bold">🎧 ECHO</h1>
      <p class="mb-4">
        Your AI-powered voice and camera assistant is ready to help you.
      </p>
      <button
        class="btn btn-warning btn-lg fw-semibold shadow-sm"
        @click="launchAssistant"
      >
        Launch Assistant
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    launchAssistant() {
      alert("🚀 Launching your AI assistant...");
      // later: connect to FastAPI or LiveKit backend here
    },
  },
};
</script>

<style>
body {
  background-color: #121212;
}
</style>
