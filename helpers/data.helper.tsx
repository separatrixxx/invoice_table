import { CarInterface } from "../interfaces/car.interface";
import { InvoiceInterface } from "../interfaces/invoice.interface";

export function getInvoice(setInvoices: (e: InvoiceInterface[]) => void) {
    const invoices: InvoiceInterface[] = [
        {
            id: '123e4567-e89b-12d3-a456-426614174000',
            dateCreated: '2023-07-01',
            datePaid: '2023-07-05',
            status: 'Paid',
            type: 'Service',
            supplier: 'ABC Corp',
            sum: 1500.00,
            refer: 'INV-2023-001',
            invoiceData: ["Item1", "Item2", "Item3"],
        },
        {
            id: '987e6543-e21b-12d3-a456-426614174001',
            dateCreated: '2023-07-02',
            datePaid: null,
            status: 'Pending',
            type: 'Product',
            supplier: 'XYZ Ltd',
            sum: 2000.50,
            refer: 'INV-2023-002',
            invoiceData: ["ItemA", "ItemB"],
        },
    ];

    setInvoices(invoices);
}

export function getCars(setCars: (e: CarInterface[]) => void) {
    const carRentRequests: CarInterface[] = [
        {
            id: 'REQ-2023-001',
            supplierName: 'STAR',
            status: 'Confirmed',
            requestDetail: {
                pax: "123",
                model: "Honda Civic",
                date_start: "2024-07-10T16:12:48",
                date_end: "2024-07-13T16:12:48",
                location: "Rhodes Airport",
                pick_up_place: "Rhodes Airport",
                supplier: "STAR",
                car_group: "economy",
                insurance: false,
                car_category: "CA",
                rental_days: 3,
            },
            clarificationText: 'No additional information required.'
        },
        {
            id: 'REQ-2023-002',
            supplierName: 'AVIS',
            status: 'Pending',
            requestDetail: {
                pax: "456",
                model: "Toyota Corolla",
                date_start: "2024-08-15T10:00:00",
                date_end: "2024-08-20T10:00:00",
                location: "Athens International Airport",
                pick_up_place: "Athens International Airport",
                supplier: "AVIS",
                car_group: "compact",
                insurance: true,
                car_category: "CB",
                rental_days: 5,
            },
            clarificationText: 'Please confirm insurance details.'
        },
    ];

    setCars(carRentRequests);
}
