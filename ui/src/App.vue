<template>
  <div class="app-container">
    <!-- Navbar -->
    <nav
      class="navbar navbar-dark glass-nav px-4 py-2 d-flex align-items-center justify-content-between"
    >
      <h5 class="fw-bold mb-0 logo">ECHO Voice Assistant</h5>
      <button class="btn btn-cyber btn-sm">Connect</button>
    </nav>

    <!-- Animated background grid -->
    <div class="animated-bg"></div>

    <!-- Main Content -->
    <div class="container-fluid content">
      <div class="row g-4 align-items-stretch">
        <!-- Left Panel -->
        <div class="col-lg-5 d-flex flex-column gap-4">
          <div class="glass-panel flex-grow-1">
            <h6 class="section-title">VIDEO</h6>
            <div class="panel-body">
              No video track. Connect to get started.
            </div>
          </div>
          <div class="glass-panel" style="height: 220px">
            <h6 class="section-title">AUDIO</h6>
            <div class="panel-body">
              No audio track. Connect to get started.
            </div>
          </div>
        </div>

        <!-- Center (Assistant) -->
        <div class="col-lg-4 d-flex justify-content-center align-items-center">
          <div class="assistant-panel text-center">
            <div class="siri-container">
              <div class="siri-ball"></div>
              <div class="siri-ring"></div>
            </div>
            <h6 class="section-title mt-4">ASSISTANT</h6>
            <p class="assistant-text">
              “Hello Reinier, how can I assist you today?”
            </p>
          </div>
        </div>

        <!-- Right Panel -->
        <div class="col-lg-3 d-flex flex-column gap-4">
          <div class="glass-panel">
            <h6 class="section-title">STATUS</h6>
            <p class="mb-1 small text-secondary">
              Room connected:
              <span class="text-danger fw-bold">DISCONNECTED</span>
            </p>
            <p class="mb-0 small text-secondary">
              Agent connected: <span class="text-danger fw-bold">FALSE</span>
            </p>
          </div>

          <div class="glass-panel">
            <h6 class="section-title">SETTINGS</h6>
            <input
              type="text"
              class="form-control form-control-sm bg-dark border-0 text-white mb-2"
              placeholder="Room Name"
            />
            <input
              type="text"
              class="form-control form-control-sm bg-dark border-0 text-white mb-2"
              placeholder="Participant ID"
            />
            <button class="btn btn-cyber w-100 btn-sm">Perform RPC Call</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* ------------------------------
   GLOBAL APP STYLES
------------------------------ */
.app-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #040507 0%, #0a0d14 100%);
  color: #e8e8e8;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}

/* NAVBAR */
.glass-nav {
  background: rgba(15, 17, 25, 0.95);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.logo {
  color: #00d1ff;
  letter-spacing: 1px;
}

/* ANIMATED GRID BACKGROUND */
.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at center,
      rgba(0, 120, 255, 0.05),
      transparent 80%
    ),
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.02) 0px,
      transparent 1px,
      transparent 50px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.02) 0px,
      transparent 1px,
      transparent 50px
    );
  z-index: -1;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% {
    background-position: 0 0, 0 0, 0 0;
  }
  100% {
    background-position: 0 0, 50px 50px, 50px 50px;
  }
}

/* PANELS */
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  backdrop-filter: blur(18px);
  box-shadow: inset 0 0 15px rgba(0, 255, 255, 0.05);
  padding: 1rem;
  transition: all 0.3s ease;
}
.glass-panel:hover {
  box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.15);
}

.panel-body {
  color: #888;
  text-align: center;
  font-size: 0.9rem;
  padding: 40px 0;
}

.section-title {
  font-size: 0.75rem;
  color: #7f8fa6;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

/* ASSISTANT PANEL */
.assistant-panel {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2rem;
  border-radius: 10px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 40px rgba(0, 150, 255, 0.1);
  width: 100%;
  height: 100%;
}

.assistant-text {
  font-size: 0.9rem;
  color: #9bb2c9;
  margin-top: 8px;
}

/* SIRI BALL */
.siri-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.siri-ball {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(from 180deg, #00f0ff, #007bff, #8a2be2, #00f0ff);
  filter: blur(2px);
  animation: rotate 6s linear infinite, pulse 3s ease-in-out infinite;
  box-shadow: 0 0 40px rgba(0, 200, 255, 0.6);
}

.siri-ring {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #00ffff, #0057ff);
  filter: blur(8px);
  opacity: 0.7;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

/* BUTTONS */
.btn-cyber {
  background: #00bfff;
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  transition: 0.3s;
}
.btn-cyber:hover {
  background: #00bfff;
}

/* CONTENT */
.content {
  margin-top: 80px;
  padding: 0 20px;
}
</style>
