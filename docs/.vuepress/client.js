import {defineClientConfig} from 'vuepress/client'
import AudioPlayer from "./components/AudioPlayer.vue"
import "./styles/styles.scss"
import IconButton from "./components/IconButton.vue";
import TextButton from "./components/TextButton.vue";
import ChatView from "./components/ChatView.vue";

export default defineClientConfig({
    enhance({app}) {
        app.component('AudioPlayer', AudioPlayer)
        app.component('IconButton', IconButton)
        app.component('TextButton', TextButton)
        app.component('ChatView', ChatView)
    }
})
