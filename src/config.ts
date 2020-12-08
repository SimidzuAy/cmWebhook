import {readFileSync} from 'fs'

interface ICfg {
    cm: string
    visibleMessagesCount: number
    vks: {
        token: string
        chats: {[key: string]: number}
    }[]
}

const cfg: ICfg = JSON.parse(String(readFileSync(`${__dirname}/../config/main.json`)))

export default cfg