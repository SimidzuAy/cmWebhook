import {VK} from 'vk-io'
import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import {confirm, invite} from './handlers'

export const main = async (VKS: VK[]) => {

    const mainUserId = (await VKS[0].api.users.get({}))[0].id

    app.all('*', bodyParser.json(), (req, res) => {
        console.log(req.body)
        switch ( req.body.type) {
            case 'confirm':
                confirm(req.body, res, mainUserId)
                break
            case 'invite':
                invite(req.body.data, res, VKS)
                break
        }
        res.send('ok')
    })

    app.listen(80, () => {
        console.log(`[${COLORS.PINK}INFO${COLORS.NONE}] Webhook успешно запущен`)
    })

}


enum COLORS {
    NONE = '\x1b[0m',
    CYAN = '\x1b[36m',
    PINK = '\x1b[35m',
    RED = '\x1b[31m',
    GREEN = '\x1b[32m',
    YELLOW = '\x1b[33m'
}