import {Response} from 'express'
import {Md5} from 'ts-md5/dist/md5';
import {IConfirm, IDeleteForAll, IInvite, IPhotoUpdate, IPin} from './types'
import {findRandomUserByChatUID, getMessageIdsByConversationIds, getUsersByFriend, getVKByToken} from '../utils'
import {ICfg} from '../config'
import {IWHUsers} from '../types'

export const confirm = async (data: IConfirm, res: Response, id: number, cfg: ICfg) => {
    res.send(Md5.hashStr(`${id}${cfg.cm}`))
}

export const invite = async (data: IInvite, VKS: IWHUsers[], cfg: ICfg) => {

    // Пизда я накостылял для мультиюзеринга

    const whoFind = await getUsersByFriend(data.user, VKS, cfg)
    const inChat = cfg.vks.filter(vk => vk.chats[data.chat] )

    if ( whoFind.length ) {

        const main = whoFind.find(x => {
            return inChat.find(y => y.token === x.token)
        })

        if ( main )
            return await getVKByToken(main.token, VKS)!.vk.api.messages.addChatUser({
                chat_id: VKS.find(x => x.token === main.token)!.chats[data.chat],
                user_id: data.user,
                visible_messages_count: cfg.visibleMessagesCount
            })

    }

    return await VKS[0].vk.api.friends.add({
            user_id: data.user
        })

}

export const photoUpdate = async ( data: IPhotoUpdate, VKS: IWHUsers[] ) => {

    const user = findRandomUserByChatUID(data.chat, VKS)

    await user.vk.upload.chatPhoto({
        chat_id: user.chats[data.chat],
        source: {
            value: Buffer.from(data.photo, 'base64'),
            contentType: 'image/jpeg'
        }
    })
}

export const deleteForAll = async ( data: IDeleteForAll, VKS: IWHUsers[] ) => {
    const user = findRandomUserByChatUID(data.chat, VKS)

    return await user.vk.api.messages.delete({
        delete_for_all: 1,
        message_ids: await getMessageIdsByConversationIds(data.conversation_message_ids, user.chats[data.chat], user.vk)
    })
}

export const messagePin = async ( data: IPin, VKS: IWHUsers[] ) => {
    const user = findRandomUserByChatUID(data.chat, VKS)

    return await user.vk.api.messages.pin({
        peer_id: user.chats[data.chat] + 2000000000,
        conversation_message_id: data.conversation_message_id
    })
}