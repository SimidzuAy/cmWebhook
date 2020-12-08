import {readFileSync} from 'fs'

export interface IVK {
    token: string
    chats: {[key: string]: number}
}

export interface ICfg {
    cm: string
    isProxy: boolean
    visibleMessagesCount: number
    vks: IVK[]
}

const cfg: ICfg = JSON.parse(String(readFileSync(`${__dirname}/../config/main.json`)))

export default cfg