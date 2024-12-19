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

        console.log(response)

        setTransfer(response.transferRequests);
        setTotalItems(response.totalItems);
    } catch (err: any) {
        console.log(err)
    }    
}

export async function removeRow(id: string, type: 'invoice' | 'car_rental' | 'transfer',
    activePage: number, itemsPerPage: number, setData: (e: any) => void,
    setTotalItems: (e: number) => void) {
    try {
        await axios.delete(process.env.NEXT_PUBLIC_DOMAIN +
            `/delete_row/${type}/${id}`).then(() => {
                if (type === 'invoice') {
                    getInvoice(activePage, itemsPerPage, setData, setTotalItems);
                } else if (type === 'car_rental') {
                    getCars(activePage, itemsPerPage, setData, setTotalItems);
                } else {
                    getTransfer(activePage, itemsPerPage, setData, setTotalItems);
                }
            });
    } catch (err: any) {
        console.log(err)
    }    
}

export async function editInvoice(id: string, data: InvoiceInterface, activePage: number, itemsPerPage: number,
    setInvoices: (e: InvoiceInterface[]) => void, setTotalItems: (e: number) => void) {
    try {
        await axios.put(process.env.NEXT_PUBLIC_DOMAIN +
            `/edit_data/invoice/${id}`, {
                client_info: {
                    name: data.name,
                    email: data.email
                },
                pricing: {
                    total_cost: data.total_price,
                    service_fee: data.commission,
                    discount: data.discount
                }
            }).then(() => {
                getInvoice(activePage, itemsPerPage, setInvoices, setTotalItems);
            });
    } catch (err: any) {
        console.log(err)
    }    
}

export async function editCars(id: string, data: CarInterface, activePage: number, itemsPerPage: number,
    setCars: (e: CarInterface[]) => void, setTotalItems: (e: number) => void) {
    try {
        await axios.put(process.env.NEXT_PUBLIC_DOMAIN +
            `/edit_data/car_rental/${id}`, {
                car_info: {
                    car_category: data.requestDetail.car_category,
                    car_group: data.requestDetail.car_group,
                    model: data.requestDetail.model,
                    supplier: data.requestDetail.supplier
                },
                rental_info: {
                    date_start: data.requestDetail.date_start,
                    date_end: data.requestDetail.date_end,
                    rental_days: data.requestDetail.rental_days,
                    location: data.requestDetail.location,
                    pick_up_place: data.requestDetail.pick_up_place
                },
                client_info: {
                    client_name: data.requestDetail.client_name,
                    client_email: data.requestDetail.client_email,
                    client_phone: data.requestDetail.client_phone,
                    driver_age: data.requestDetail.driver_age,
                    pax: data.requestDetail.pax
                },
                child_seats_info: {
                    baby_seats: data.requestDetail.baby_seats,
                    babys_age: data.requestDetail.babys_age,
                    baby_seat_cost:  data.requestDetail.baby_seat_cost
                },
                costs: {
                    base_rental_cost: data.requestDetail.base_rental_cost,
                    insurance: data.requestDetail.insurance,
                    insurance_cost: data.requestDetail.insurance_cost,
                    total_cost: data.requestDetail.total_cost,
                    service_fee: data.requestDetail.service_fee,
                    discount: data.requestDetail.discount,
                    discount_amount: data.requestDetail.discount_amount
                }
            }).then(() => {
                getCars(activePage, itemsPerPage, setCars, setTotalItems);
            });
    } catch (err: any) {
        console.log(err)
    }    
}

export async function editTransfer(id: string, data: TransferInterface, activePage: number, itemsPerPage: number,
    setTransfer: (e: TransferInterface[]) => void, setTotalItems: (e: number) => void) {
    try {
        await axios.put(process.env.NEXT_PUBLIC_DOMAIN +
            `/edit_data/transfer/${id}`, {
                base_data: {
                    flight_num: data.requestDetail.flight_number,
                    hotel: data.requestDetail.hotel,
                    arrival_date: data.requestDetail.arrival_date,
                    return_date: data.requestDetail.return_date,
                    payment_method: data.requestDetail.payment_method
                },
                vehicle: {
                    car_type: data.requestDetail.vehicle_type
                },
                costs: {
                    base_cost: data.requestDetail.base_cost,
                    child_seat_cost: data.requestDetail.child_seat_cost,
                    total_cost: data.requestDetail.total_cost,
                    deposit: data.requestDetail.deposit,
                    discount: data.requestDetail.discount
                },
                additional_services: {
                    child_age: data.requestDetail.child_age,
                    rep: data.requestDetail.representative,
                    additional_driver: {
                        hours: data.requestDetail.additional_driver.hours,
                        net_cost: data.requestDetail.additional_driver.net_cost,
                        commission: data.requestDetail.additional_driver.commission,
                        gross_cost: data.requestDetail.additional_driver.gross_cost
                    }
                },
                luggage: {
                    sky_bags: data.requestDetail.luggage.sky_bags,
                    big_suitcases: data.requestDetail.luggage.big_suitcases,
                    cabin_bag: data.requestDetail.luggage.cabin_bags
                }
            }).then(() => {
                getTransfer(activePage, itemsPerPage, setTransfer, setTotalItems);
            });
    } catch (err: any) {
        console.log(err)
    }    
}
