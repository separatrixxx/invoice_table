export interface InvoiceInterface {
    id: string;
    dateCreated: string;
    datePaid: string | null;
    status: string;
    type: string;
    supplier: string;
    sum: number;
    refer: string;
    invoiceData: string[];
}