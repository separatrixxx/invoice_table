import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TransferInterface } from '../../interfaces/transfer.interface';


export interface TableTransferProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    filteredTransferRequests: TransferInterface[],
    getStatusColor: (status: string) => string,
    activePage: number,
    itemsPerPage: number,
    setTransfer: (e: any) => void,
    setTotalItems: (e: number) => void
}
