import { DetailedHTMLProps, HTMLAttributes, SetStateAction } from 'react';


export interface PageNavigationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    activeTab: string,
    activePageInvoices: number,
    activePageCars: number,
    activePageTransfer: number,
    itemsPerPage: number,
    totalInvoiceItems: number,
    totalCarItems: number,
    totalTransferItems: number,
    setActivePageInvoices: (e: SetStateAction<number>) => void,
    setActivePageCars: (e: SetStateAction<number>) => void,
    setActivePageTransfer: (e: SetStateAction<number>) => void,
    setItemsPerPage: (e: SetStateAction<number>) => void,
}
