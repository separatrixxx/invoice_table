import { DetailedHTMLProps, HTMLAttributes, SetStateAction } from 'react';


export interface PageNavigationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    activeTab: string,
    activePageInvoices: number,
    activePageCars: number,
    itemsPerPage: number,
    totalInvoiceItems: number,
    totalCarItems: number,
    setActivePageInvoices: (e: SetStateAction<number>) => void,
    setActivePageCars: (e: SetStateAction<number>) => void,
    setItemsPerPage: (e: SetStateAction<number>) => void,
}
