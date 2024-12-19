import { TableCarsProps } from './TableCars.props';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditIcon, TrashIcon, CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { editCars, removeRow } from '../../helpers/data.helper';


export const TableCars = ({ filteredCarRequests, getStatusColor, activePage, itemsPerPage,
    setCars, setTotalItems }: TableCarsProps): JSX.Element => {
    const carFiltersTitle: string[] = ['Actions', 'Car ID', 'Name', 'Status', 'Pax', 'Model', 'Start Date', 'End Date', 
        'Rental Days', 'Location', 'Pick Up Place', 'Supplier', 'Car Group', 'Car Category', 'Clarification',
        'Baby Seat Cost', 'Baby Seats', "Baby's Age", 'Base Rental Cost', 'Client Email', 'Client Name', 'Client Phone',
        'Discount', 'Discount Amount', 'Driver Age', 'Insurance', 'Insurance Cost', 'Service Fee', 'Total Cost'
    ];

    const [editableRow, setEditableRow] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});

    const handleEditClick = (request: any) => {
        setEditableRow(request.id);
        setEditData(request);
    };

    const handleCancelEdit = () => {
        setEditableRow(null);
        setEditData({});
    };

    const handleSaveEdit = async (id: string) => {
        await editCars(id, editData, activePage, itemsPerPage, setCars, setTotalItems);
        setEditableRow(null);
        setEditData({});
    };

    const handleInputChange = (field: string, value: any) => {
        setEditData({ ...editData, [field]: value });
    };

    const renderCell = (field: string, value: any, isEditable: boolean, type: string = 'text') => {
        return isEditable ? (
            <input
                type={type}
                value={value ?? ''}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="border px-2 py-1 w-full"
            />
        ) : (
            <>{field.includes('cost') || field === 'discount' || field === 'discount_amount' ? `€${value}` : value}</>
        );
    };

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
                        <TableCell>
                            {editableRow === request.id ? (
                                <>
                                    <CheckIcon
                                        onClick={() => handleSaveEdit(request.id)}
                                        className="cursor-pointer text-green-500 mb-2"
                                    />
                                    <XIcon
                                        onClick={handleCancelEdit}
                                        className="cursor-pointer text-red-500"
                                    />
                                </>
                            ) : (
                                <>
                                    <EditIcon
                                        onClick={() => handleEditClick(request)}
                                        className="cursor-pointer text-blue-500 mb-2"
                                    />
                                    <TrashIcon
                                        onClick={() => removeRow(request.id, 'car_rental',
                                            activePage, itemsPerPage, setCars, setTotalItems)}
                                        className="cursor-pointer text-red-500"
                                    />
                                </>
                            )}
                        </TableCell>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.supplierName}</TableCell>
                        <TableCell className={getStatusColor(request.status)}>{request.status}</TableCell>
                        <TableCell>{renderCell('pax', editableRow === request.id ? editData.requestDetail.pax : request.requestDetail.pax, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('model', editableRow === request.id ? editData.requestDetail.model : request.requestDetail.model, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('date_start', editableRow === request.id ? editData.requestDetail.date_start : request.requestDetail.date_start, editableRow === request.id, 'date')}</TableCell>
                        <TableCell>{renderCell('date_end', editableRow === request.id ? editData.requestDetail.date_end : request.requestDetail.date_end, editableRow === request.id, 'date')}</TableCell>
                        <TableCell>{renderCell('rental_days', editableRow === request.id ? editData.requestDetail.rental_days : request.requestDetail.rental_days, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('location', editableRow === request.id ? editData.requestDetail.location : request.requestDetail.location, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('pick_up_place', editableRow === request.id ? editData.requestDetail.pick_up_place : request.requestDetail.pick_up_place, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('supplier', editableRow === request.id ? editData.requestDetail.supplier : request.requestDetail.supplier, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('car_group', editableRow === request.id ? editData.requestDetail.car_group : request.requestDetail.car_group, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('car_category', editableRow === request.id ? editData.requestDetail.car_category : request.requestDetail.car_category, editableRow === request.id)}</TableCell>
                        <TableCell className="break-all">{renderCell('clarificationText', editableRow === request.id ? editData.clarificationText : request.clarificationText, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('baby_seat_cost', editableRow === request.id ? editData.baby_seat_cost : request.requestDetail.baby_seat_cost, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('baby_seats', editableRow === request.id ? editData.baby_seats : request.requestDetail.baby_seats, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('babys_age', editableRow === request.id ? editData.babys_age : request.requestDetail.babys_age, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('base_rental_cost', editableRow === request.id ? editData.base_rental_cost : request.requestDetail.base_rental_cost, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('client_email', editableRow === request.id ? editData.client_email : request.requestDetail.client_email, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('client_name', editableRow === request.id ? editData.client_name : request.requestDetail.client_name, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('client_phone', editableRow === request.id ? editData.client_phone : request.requestDetail.client_phone, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('discount', editableRow === request.id ? editData.discount : request.requestDetail.discount, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('discount_amount', editableRow === request.id ? editData.discount_amount : request.requestDetail.discount_amount, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('driver_age', editableRow === request.id ? editData.driver_age : request.requestDetail.driver_age, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('insurance', editableRow === request.id ? editData.requestDetail.insurance : (request.requestDetail.insurance ? 'Yes' : 'No'), editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('insurance_cost', editableRow === request.id ? editData.insurance_cost : request.requestDetail.insurance_cost, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('service_fee', editableRow === request.id ? editData.service_fee : request.requestDetail.service_fee, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('total_cost', editableRow === request.id ? editData.total_cost : request.requestDetail.total_cost, editableRow === request.id)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};