import cfg from './config'
import { VK } from 'vk-io'
import { main } from './webhook'

const VKS: VK[] = []

cfg.vks.forEach(vk => {
    VKS.push(new VK({
        token: vk.token,
        apiBaseUrl:  cfg.isProxy ? 'https://vk-api-proxy.xtrafrancyz.net/method' : 'https://api.vk.com/method'
    }))
})

main(VKS)