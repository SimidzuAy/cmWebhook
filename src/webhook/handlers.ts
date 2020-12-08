import {Response} from 'express'
import cfg from '../config'
import {Md5} from 'ts-md5/dist/md5';
import {IConfirm, IDeleteForAll, IInvite, IPhotoUpdate} from './types'
import {VK} from 'vk-io'
import {getUserByFriend} from '../utils'

export const confirm = async (data: IConfirm, res: Response, id: number) => {
    res.send(Md5.hashStr(`${id}${cfg.cm}`))
}

export const invite = async (data: IInvite, VKS: VK[]) => {

    const whoFind = await getUserByFriend(data.user, VKS)

    if ( whoFind ) {
        try {
            return await whoFind.vk.api.messages.addChatUser({
                chat_id: cfg.vks[whoFind.num].chats[data.chat],
                user_id: data.user,
                visible_messages_count: cfg.visibleMessagesCount
            })
        } catch (ignored) {
            return
        }
    }

    return await VKS[0].api.friends.add({
            user_id: data.user
        })

}

export const photoUpdate = async ( data: IPhotoUpdate, VKS: VK[] ) => {
    await VKS[0].upload.chatPhoto({
        chat_id: cfg.vks[0].chats[data.chat],
        source: {
            value: Buffer.from(data.photo, 'base64'),
            contentType: 'image/jpeg'
        }
    })
}

export const deleteForAll = async ( data: IDeleteForAll, VKS: VK[] ) => {
    const messages = await VKS[0].api.messages.getByConversationMessageId({
        conversation_message_ids: data.conversation_message_ids,
        peer_id: cfg.vks[0].chats[data.chat] + 2000000000
    })

    const messageIds: number[] = []

    messages.items.forEach(message => {
        messageIds.push(message.id)
    })

    return await VKS[0].api.messages.delete({
        delete_for_all: 1,
        message_ids: messageIds
    })
}