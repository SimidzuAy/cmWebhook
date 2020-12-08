import {VK} from 'vk-io'

export interface IWHUsers {
    vk: VK
    token: string
    chats: {[key: string]: number}
}