import {defineClientConfig} from 'vuepress/client'
import AudioPlayer from "./components/AudioPlayer.vue"

export default defineClientConfig({
    enhance({app}) {
        app.component('AudioPlayer', AudioPlayer)
    }
})
