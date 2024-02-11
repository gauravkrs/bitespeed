export interface ContactInstance {
    id: number;
    phoneNumber?: string;
    email?: string;
    linkedId?: number;
    linkPrecedence: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface ResponseBody{
  status: Function;
  json : Function;
}