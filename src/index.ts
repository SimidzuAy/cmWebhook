import cfg from './config'
import { VK } from 'vk-io'
import { main } from './webhook'
import {IWHUsers} from './types'

const VKS: IWHUsers[] = []

cfg.vks.forEach(vk => {
    VKS.push({
        vk: new VK({
            token: vk.token,
            apiBaseUrl:  cfg.isProxy ? 'https://vk-api-proxy.xtrafrancyz.net/method' : 'https://api.vk.com/method'
        }),
        token: vk.token,
        chats: vk.chats
    })
})



main(VKS, cfg)