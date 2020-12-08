import {VK} from 'vk-io'
import express from 'express'
import bodyParser from 'body-parser'
import {confirm, invite, photoUpdate} from './handlers'

const app = express()

export const main = async (VKS: VK[]) => {

    const mainUserId = (await VKS[0].api.users.get({}))[0].id

    app.all('/', bodyParser.json(), (req, res) => {
        if ( req.body.type ) {
            switch (req.body.type) {
                case 'confirm':
                    return confirm(req.body, res, mainUserId)
                case 'invite':
                    invite(req.body.data, res, VKS)
                    break
                case 'photo_update':
                    photoUpdate(req.body.data, VKS)
            }
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