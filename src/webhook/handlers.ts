import {Response} from 'express'
import cfg from '../config'
import {Md5} from 'ts-md5/dist/md5';
import {IConfirm, IInvite} from './types'
import {VK} from 'vk-io'
import {FriendsGetResponse} from 'vk-io/lib/api/schemas/responses'

export const confirm = async (data: IConfirm, res: Response, id: number) => {
    res.send(Md5.hashStr(`${id}${cfg.cm}`))
}

export const invite = async (data: IInvite, res: Response, VKS: VK[]) => {
    const promises: Promise<FriendsGetResponse>[] = []

    VKS.forEach(vk => {
        promises.push(vk.api.friends.get({
            count: 10000
        }))
    })

    const friends = await Promise.all(promises)
    let whoFind: {
        vk: VK,
        num: number
    } | undefined

    for (let i = 0; i < friends.length; i++) {
        const fr = friends[i]
        if ( fr.items.includes(data.user) ) {
            whoFind = {
                vk: VKS[i],
                num: i
            }
            break
        }
    }

    if ( whoFind ) {
        try {
            return await whoFind.vk.api.messages.addChatUser({
                chat_id: cfg.vks[whoFind.num].chats[data.chat],
                user_id: data.user
            })
        } catch (ignored) {
            return
        }
    }

    return Promise.all([
        VKS[0].api.friends.add({
            user_id: data.user
        }),
        VKS[0].api.messages.send({
            random_id: 0,
            disable_mentions: 1,
            chat_id: cfg.vks[0].chats[data.chat],
            message: 'Пользователь не найден в друзьях, отправлена заявка!'
        })
    ])


}