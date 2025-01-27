import {defineConfig} from 'vitepress'

const TAG = "CONFIG"

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    base: '/Stuff/',
    title: "南武文库",
    description: "坚忍 奉公 进步 爱国 | 南武人 爱南武",
    ignoreDeadLinks: [
        (url) => {
            console.warn("\n", TAG, "发现死链", url)
            return true
        }
    ],
    head: [['link', { rel: 'icon', href: '/icons/icon_nambu_docs.png' }]],
})
