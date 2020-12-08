export interface IInvite {
    chat: string
    user: number
}

export interface IConfirm {
    user: number
}

export interface IPhotoUpdate {
    chat: string
    photo: string
}