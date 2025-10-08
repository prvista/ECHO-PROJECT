<template>
  <div class="d-flex">
    <input
      v-model="userText"
      @keyup.enter="submit"
      class="voice-input me-2"
      placeholder="Speak or type your command..."
    />
    <button class="btn btn-info" @click="submit">🎙️</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userText: "",
    };
  },
  methods: {
    submit() {
      if (this.userText.trim() !== "") {
        this.$emit("onSpeak", this.userText.trim());
        this.userText = "";
      }
    },
  },
};
</script>
