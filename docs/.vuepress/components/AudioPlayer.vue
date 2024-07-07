<template>
  <div class="audio-player">
    <audio ref="audio" @timeupdate="updateProgress"/>
    <div class="controls">
      {{ title }}
      <button @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</button>
      <div class="progress">
        <input
            type="range"
            min="0"
            :max="duration"
            step="0.1"
            v-model="currentTime"
            @input="seekAudio"/>
      </div>
      <span v-if="showIt">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'

const props = defineProps({
  src: String,
  title: {type: String, default: '页内播放'},
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
  flex-direction: column;
  align-items: center;
}

.controls {
  display: flex;
  align-items: center;
}

.progress {
  margin: 0 10px;
}
</style>
