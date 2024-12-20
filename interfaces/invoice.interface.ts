export interface InvoiceInterface {
    invoice_id: string,
    name: string,
    email: string,
    telephone: string,
    remarks: string | null,
    status: string,
    type: string,
    supplier: string,
    confirmed: string | null,
    place_of_delivery: string,
    car_type: string,
    insurance: string,
    extras: string | null,
    booking_window: string | null,
    sales: string | null,
    discount: string | null,
    rent_start: string,
    rental_ends: string,
    date_created: string,
    date_paid: string | null,
    days: number,
    left_to_pay: number,
    total_price: number,
    commission: number,
}

export interface InvoiceData {
    activePage: number,
    invoices: InvoiceInterface[],
    itemsPerPage: number,
    totalItems: number,
}
