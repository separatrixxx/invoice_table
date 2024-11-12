export interface TransferInterface {
    clarificationText: string;
    dates: {
        created: string;
        last_update: string;
    };
    id: string;
    requestDetail: {
        additional_driver: {
            commission: number;
            gross_cost: number;
            hours: number;
            net_cost: number;
        };
        arrival_date: string;
        base_cost: number;
        child_age: string;
        child_seat_cost: number;
        child_seats: number;
        deposit: number;
        discount: number;
        flight_number: string;
        hotel: string;
        is_return: boolean;
        luggage: {
            big_suitcases: string;
            cabin_bags: string;
            sky_bags: string;
        };
        payment_method: string;
        representative: string;
        return_date: string;
        total_cost: number;
        vehicle_type: string;
    };
    status: string;
    supplierName: string;
}

export interface TransferData {
    activePage: number;
    transferRequests: TransferInterface[];
    itemsPerPage: number;
    totalItems: number;
}
