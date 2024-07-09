<template>
  <div class="audio-player" :class="{'use-margin-up':useMarginUp}">
    <audio ref="audio" @timeupdate="updateProgress"/>
    <div class="title-small label">{{ title }}</div>
    <IconButton :icon="isPlaying?'pause':'play'" @click="togglePlay"/>
    <div class="progress">
      <input
          type="range"
          min="0"
          :max="duration"
          step="0.1"
          v-model="currentTime"
          @input="seekAudio"/>
    </div>
    <div v-if="showIt" class="title-small label">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import IconButton from "./IconButton.vue";

const props = defineProps({
  src: String,
  title: {type: String, default: '页内播放'},
  useMarginUp: {type: Boolean, default: true}
})

const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const showIt = ref(false)

function togglePlay() {
  if (audio.value) {
    if (isPlaying.value) audio.value.pause()
    else audio.value.play()

    isPlaying.value = !isPlaying.value
  }
}

function updateProgress() {
  if (audio.value) {
    showIt.value = true
    currentTime.value = audio.value.currentTime
    duration.value = audio.value.duration
  }
}

function seekAudio(event: Event) {
  const target = event.target as HTMLInputElement
  if (audio.value) {
    audio.value.currentTime = Number(target.value)
  }
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

onMounted(() => watch(() => props.src, (newSrc) => {
  if (audio.value) {
    audio.value.src = newSrc
    currentTime.value = 0
    duration.value = 0
    isPlaying.value = false
    showIt.value = false
  }
}, {immediate: true}))
</script>

<style scoped>
.audio-player {
  display: flex;
  border-radius: 12px;
  background-color: var(--surface-container);
  padding: 0 16px;
  gap: 8px;
  flex-direction: row;
  align-items: center;
  box-shadow: var(--elevation-3);
}

.use-margin-up {
  margin-top: 8px;
}

.progress {
  margin: 0 10px;
}

.label {
  color: var(--on-surface-variant);
}
</style>
