import { TableTransferProps } from './TableTransfer.props';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export const TableTransfer = ({ filteredTransferRequests, getStatusColor }: TableTransferProps): JSX.Element => {
    const transferFiltersTitle: string[] = [
        'Transfer ID', 'Supplier', 'Status', 'Flight Number', 'Arrival Date', 'Return Date', 'Hotel', 'Vehicle Type', 
        'Payment Method', 'Representative', 'Base Cost', 'Total Cost', 'Discount', 'Deposit', 'Is Return', 
        'Child Seat Cost', 'Additional Driver (Hours)', 'Additional Driver (Commission)', 
        'Additional Driver (Gross Cost)', 'Additional Driver (Net Cost)', 'Luggage (Big Suitcases)', 
        'Luggage (Cabin Bags)', 'Luggage (Sky Bags)', 'Clarification'
    ];

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {transferFiltersTitle.map(title => (
                        <TableHead key={title}>{title}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredTransferRequests.map((request, i) => (
                    <TableRow key={request.id + i}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.supplierName}</TableCell>
                        <TableCell className={getStatusColor(request.status)}>{request.status}</TableCell>
                        <TableCell>{request.requestDetail.flight_number}</TableCell>
                        <TableCell>{new Date(request.requestDetail.arrival_date).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(request.requestDetail.return_date).toLocaleDateString()}</TableCell>
                        <TableCell>{request.requestDetail.hotel}</TableCell>
                        <TableCell>{request.requestDetail.vehicle_type}</TableCell>
                        <TableCell>{request.requestDetail.payment_method}</TableCell>
                        <TableCell>{request.requestDetail.representative}</TableCell>
                        <TableCell>{request.requestDetail.base_cost}</TableCell>
                        <TableCell>{request.requestDetail.total_cost}</TableCell>
                        <TableCell>{request.requestDetail.discount}</TableCell>
                        <TableCell>{request.requestDetail.deposit}</TableCell>
                        <TableCell>{request.requestDetail.is_return ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{request.requestDetail.child_seat_cost}</TableCell>
                        <TableCell>{request.requestDetail.additional_driver.hours}</TableCell>
                        <TableCell>{request.requestDetail.additional_driver.commission}</TableCell>
                        <TableCell>{request.requestDetail.additional_driver.gross_cost}</TableCell>
                        <TableCell>{request.requestDetail.additional_driver.net_cost}</TableCell>
                        <TableCell>{request.requestDetail.luggage.big_suitcases}</TableCell>
                        <TableCell>{request.requestDetail.luggage.cabin_bags}</TableCell>
                        <TableCell>{request.requestDetail.luggage.sky_bags}</TableCell>
                        <TableCell className="break-all">{request.clarificationText}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
