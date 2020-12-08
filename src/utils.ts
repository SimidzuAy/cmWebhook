import {FriendsGetResponse} from 'vk-io/lib/api/schemas/responses'
import {ICfg, IVK} from './config'
import {IWHUsers} from './types'
import {VK} from 'vk-io'

export const getUsersByFriend = async ( userId: number, VKS: IWHUsers[], cfg: ICfg ) => {
    const promises: Promise<FriendsGetResponse>[] = []

    VKS.forEach(user => {
        const vk = user.vk
        promises.push(vk.api.friends.get({
            count: 10000
        }))
    })

    const friends = await Promise.all(promises)
    let whoFind: IVK[] = []

    for (let i = 0; i < friends.length; i++) {
        const fr = friends[i]
        if ( fr.items.includes(userId) ) {
            whoFind.push(cfg.vks[i])
        }
    }

    return whoFind
}


export const getMessageIdsByConversationIds = async ( conversationIds: number[] | number, chatId: number, vk: VK) => {

    const messages = await vk.api.messages.getByConversationMessageId({
        conversation_message_ids: conversationIds,
        peer_id: chatId + 2000000000
    })

    const messageIds: number[] = []

    messages.items.forEach(message => {
        messageIds.push(message.id)
    })

    return messageIds
}

export const findRandomUserByChatUID = ( UID: string, VKS: IWHUsers[]) => {
    const users = VKS.filter(vk => vk.chats[UID])
    return users[randomInteger(0, users.length - 1)]
}

export const getVKByToken = ( token: string, users: IWHUsers[] ) => {
    return users.find(user => user.token === token )
}

export const randomInteger = (min: number, max: number) => {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}