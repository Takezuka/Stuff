import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import * as fs from "node:fs"

export default defineUserConfig({
    lang: 'zh',

    title: '南武文库',
    description: '坚忍 奉公 进步 爱国 | 南武人 爱南武',

    theme: defaultTheme({
        logo: '/images/ic_nambu_docs.png',

        navbar: [
            '/',
            {
                text: '南武新闻',
                link: '/news/',
            },
            {
                text: '南武维基',
                link: '/wiki/',
            },
            {
                text: '南武历史',
                link: '/history/',
            },
            {
                text: '南武记忆',
                link: '/memory/',
            },
            {
                text: '南武文学',
                link: '/novels/',
            },
        ],

        sidebar: getSideBar(),

        contributors: false,
    }),

    plugins: [],

    bundler: viteBundler(),


})

function getSideBar() {
    let sidebars = {}

    fs.readdirSync('docs').forEach((dir) => {
            if (!dir.startsWith('.') && fs.lstatSync('docs/' + dir).isDirectory()) {
                sidebars[`/` + dir + '/'] = scanFolder('docs/' + dir)
            }
        }
    )

    return sidebars
}

function scanFolder(dirName, pfx = "") {
    // console.log("文件夹", dirName)

    const groups = []

    const rootFiles = []

    fs.readdirSync(dirName).forEach((file) => {
        // console.log("文件", file)
        if (file.endsWith('.md') && file !== 'readme.md') {
            // console.log("文档", file)
            rootFiles.push(pfx + file.slice(0, file.length - 3))
        } else if (fs.lstatSync(dirName + '/' + file).isDirectory()) {
            // console.log("文件夹", file)
            scanFolder(dirName + '/' + file, file + '/').forEach((group) => groups.push(group))
        } // else console.log("未知", file)
    })

    if (rootFiles.length > 0) groups.push({text: getFirstLetterUpperFolderName(dirName), children: rootFiles})

    return groups
}

function getFirstLetterUpperFolderName(folderName) {
    const lastSlash = folderName.lastIndexOf('/') + 1
    return folderName.charAt(lastSlash).toUpperCase() + folderName.slice(lastSlash + 1)
}