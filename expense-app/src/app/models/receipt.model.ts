export interface Receipt {
    id: number;
    date: string;
    amount: number;
    description: string;
    fileUrl: File;
    status: string;
}

export interface ReceiptUpdate {
    status: string;
}