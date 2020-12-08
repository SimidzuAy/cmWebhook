import cfg from './config'
import { VK } from 'vk-io'
import { main } from './webhook'

const VKS: VK[] = []

cfg.vks.forEach(vk => {
    VKS.push(new VK({
        token: vk.token,

        // Слава Украине
        apiBaseUrl: 'https://vk-api-proxy.xtrafrancyz.net/method'
    }))
})

main(VKS)