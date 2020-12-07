import {readFileSync} from 'fs'

interface ICfg {
    token: {
        vk: string
        cm: string
    }
}

const cfg: ICfg = JSON.parse(String(readFileSync('../config/main.json')))

export default cfg