export interface IMessage {
    id?: string
    userId: string
    text: string
    dateTime: Date
    public: Boolean
    color: number
}