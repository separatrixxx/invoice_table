import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CarInterface } from '../../interfaces/car.interface';


export interface TableCarsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    filteredCarRequests: CarInterface[];
    getStatusColor: (status: string) => string;
}
