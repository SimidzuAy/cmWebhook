import {VK} from 'vk-io'
import express from 'express'
import bodyParser from 'body-parser'
import {confirm, deleteForAll, invite, messagePin, photoUpdate} from './handlers'

const app = express()

export const main = async (VKS: VK[]) => {

    const mainUserId = (await VKS[0].api.users.get({}))[0].id

    app.all('/', bodyParser.json(), async (req, res) => {
        if ( req.body.type ) {
            try {
                switch (req.body.type) {
                    case 'confirm':
                        return await confirm(req.body, res, mainUserId)
                    case 'invite':
                        await invite(req.body.data, VKS)
                        break
                    case 'photo_update':
                        await photoUpdate(req.body.data, VKS)
                        break
                    case 'ban_expired':
                        await invite(req.body.data, VKS)
                        break
                    case 'delete_for_all':
                        await deleteForAll(req.body.data, VKS)
                        break
                    // Чм оказывается и сам уже может....
                    case 'message_pin':
                        await messagePin(req.body.data, VKS)
                }
            } catch ( ignored ) {}
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