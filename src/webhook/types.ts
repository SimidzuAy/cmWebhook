
interface IDefault {
    chat: string
}

export interface IInvite extends IDefault{
    user: number
}

export interface IConfirm {
    user: number
}

export interface IPhotoUpdate extends IDefault{
    photo: string
}

export interface IDeleteForAll extends IDefault{
    conversation_message_ids: number[]
}