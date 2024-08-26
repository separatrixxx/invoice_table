export interface CarDetail {
    pax: string;
    model: string;
    date_start: string;
    date_end: string;
    location: string;
    pick_up_place: string;
    supplier: string;
    car_group: string;
    insurance: boolean;
    car_category: string;
    rental_days: number;
}

export interface CarInterface {
    id: string;
    supplierName: string;
    status: string;
    requestDetail: CarDetail;
    clarificationText: string;
}
