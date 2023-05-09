export type State = {
    store: Store;
};

export type Store = {
    records: Record[];
    isLoading: boolean;
    modalRecord: Record | null;
};

export type Record = {
    _id?: string;
    name: string;
    address: string;
    amount: number;
    role: Role;
    status: Status;
};

export enum Role {
    Customer = 'Customer',
    Business = 'Business',
    Admin = 'Admin'
}

export enum Status {
    Open = 'Open',
    Pending = 'Pending',
    Close = 'Close',
}

export type Query = {
    id: string;
};

export enum ModalTypes {
    create = 'create',
    update = 'update',
}