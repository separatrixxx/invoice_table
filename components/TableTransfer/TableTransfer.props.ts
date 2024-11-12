import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CarInterface } from '../../interfaces/car.interface';
import { TransferInterface } from '../../interfaces/transfer.interface';


export interface TableTransferProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    filteredTransferRequests: TransferInterface[];
    getStatusColor: (status: string) => string;
}
