import { TableCarsProps } from './TableCars.props';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export const TableCars = ({ filteredCarRequests, getStatusColor }:TableCarsProps): JSX.Element => {
    const carFiltersTitle: string[] = ['ID', 'Name', 'Status', 'Pax', 'Model', 'Start Date', 'End Date', 'Rental Days',
        'Location', 'Pick Up Place', 'Supplier', 'Car Group', 'Insurance', 'Car Category', 'Clarification'];


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {carFiltersTitle.map(c => (
                        <TableHead key={c}>{c}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredCarRequests.map((request, i) => (
                    <TableRow key={request.id + i}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.supplierName}</TableCell>
                        <TableCell className={getStatusColor(request.status)}>{request.status}</TableCell>
                        <TableCell>{request.requestDetail.pax}</TableCell>
                        <TableCell>{request.requestDetail.model}</TableCell>
                        <TableCell>{new Date(request.requestDetail.date_start).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(request.requestDetail.date_end).toLocaleDateString()}</TableCell>
                        <TableCell>{request.requestDetail.rental_days}</TableCell>
                        <TableCell>{request.requestDetail.location}</TableCell>
                        <TableCell>{request.requestDetail.pick_up_place}</TableCell>
                        <TableCell>{request.requestDetail.supplier}</TableCell>
                        <TableCell>{request.requestDetail.car_group}</TableCell>
                        <TableCell>{request.requestDetail.insurance ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{request.requestDetail.car_category}</TableCell>
                        <TableCell className="break-all">{request.clarificationText}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
