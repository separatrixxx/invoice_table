import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { InvoiceInterface } from '../../interfaces/invoice.interface';


export interface TableInvoicesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    filteredInvoices: InvoiceInterface[],
    getStatusColor: (status: string) => string,
    activePage: number,
    itemsPerPage: number,
    setInvoices: (e: any) => void,
    setTotalItems: (e: number) => void
}
