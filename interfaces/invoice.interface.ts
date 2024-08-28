export interface InvoiceInterface {
    id: string,
    dateCreated: string,
    datePaid: string | null,
    status: string,
    type: string,
    supplier: string,
    sum: number,
    refer: string,
    invoiceData: string[],
}

export interface InvoiceData {
    activePage: number,
    invoices: InvoiceInterface[],
    itemsPerPage: number,
    totalItems: number,
}
