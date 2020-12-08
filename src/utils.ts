import {FriendsGetResponse} from 'vk-io/lib/api/schemas/responses'
import {VK} from 'vk-io'

export const getUserByFriend = async ( userId: number, VKS: VK[] ) => {
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
        if ( fr.items.includes(userId) ) {
            whoFind = {
                vk: VKS[i],
                num: i
            }
            break
        }
    }

    return whoFind
}
