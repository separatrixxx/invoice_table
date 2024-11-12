import axios, { AxiosResponse } from "axios";
import { CarData, CarInterface } from "../interfaces/car.interface";
import { InvoiceData, InvoiceInterface } from "../interfaces/invoice.interface";
import { TransferData, TransferInterface } from "../interfaces/transfer.interface";


export async function getInvoice(activePage: number, itemsPerPage: number,
    setInvoices: (e: InvoiceInterface[]) => void, setTotalItems: (e: number) => void) {
    try {
        const { data : response }: AxiosResponse<InvoiceData> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            `/invoices_data?activePage=${activePage + 1}&itemsPerPage=${itemsPerPage}`);

        setInvoices(response.invoices);
        setTotalItems(response.totalItems);
    } catch (err: any) {
        console.log(err)
    }
}

export async function getCars(activePage: number, itemsPerPage: number,
    setCars: (e: CarInterface[]) => void, setTotalItems: (e: number) => void) {
    try {
        const { data : response }: AxiosResponse<CarData> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            `/car_rental_requests?activePage=${activePage + 1}&itemsPerPage=${itemsPerPage}`);

        setCars(response.carRentalRequests);
        setTotalItems(response.totalItems);
    } catch (err: any) {
        console.log(err)
    }    
}

export async function getTransfer(activePage: number, itemsPerPage: number,
    setTransfer: (e: TransferInterface[]) => void, setTotalItems: (e: number) => void) {
    try {
        const { data : response }: AxiosResponse<TransferData> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            `/transfer_requests?activePage=${activePage + 1}&itemsPerPage=${itemsPerPage}`);

        setTransfer(response.transferRequests);
        setTotalItems(response.totalItems);
    } catch (err: any) {
        console.log(err)
    }    
}
