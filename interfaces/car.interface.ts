export interface CarDetail {
    pax: string,
    model: string,
    date_start: string,
    date_end: string,
    location: string,
    pick_up_place: string,
    supplier: string,
    car_group: string,
    insurance: boolean,
    car_category: string,
    rental_days: number,
    baby_seat_cost: number,
    baby_seats: number,
    babys_age: number | null,
    base_rental_cost: number,
    client_email: string,
    client_name: string,
    client_phone: string,
    discount: number | null,
    discount_amount: number,
    driver_age: string,
    insurance_cost: number,
    service_fee: number,
    total_cost: number,
}

export interface CarInterface {
    id: string,
    supplierName: string,
    status: string,
    requestDetail: CarDetail,
    clarificationText: string,
}

export interface CarData {
    activePage: number,
    carRentalRequests: CarInterface[],
    itemsPerPage: number,
    totalItems: number,
}
