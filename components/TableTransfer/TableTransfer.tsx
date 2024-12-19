import { TableTransferProps } from './TableTransfer.props';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditIcon, TrashIcon, CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { editTransfer, removeRow } from '../../helpers/data.helper';

export const TableTransfer = ({ filteredTransferRequests, getStatusColor, activePage, itemsPerPage,
    setTransfer, setTotalItems }: TableTransferProps): JSX.Element => {
    const transferFiltersTitle: string[] = [
        'Actions', 'Transfer ID', 'Supplier', 'Status', 'Flight Number', 'Arrival Date', 'Return Date', 'Hotel', 'Vehicle Type',
        'Payment Method', 'Representative', 'Base Cost', 'Total Cost', 'Discount', 'Deposit', 'Is Return',
        'Child Seat Cost', 'Child Age', 'Hours', 'Commission', 'Gross Cost', 'Net Cost', 'Big Suitcases', 'Cabin Bags',
        'Sky Bags', 'Clarification'
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
        await editTransfer(id, editData, activePage, itemsPerPage, setTransfer, setTotalItems);
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
            <>{field.includes('cost') || field === 'discount' || field === 'deposit' ? `€${value}` : value}</>
        );
    };

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
                                        onClick={() => removeRow(request.id, 'transfer',
                                            activePage, itemsPerPage, setTransfer, setTotalItems)}
                                        className="cursor-pointer text-red-500"
                                    />
                                </>
                            )}
                        </TableCell>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.supplierName}</TableCell>
                        <TableCell className={getStatusColor(request.status)}>{renderCell('status', editableRow === request.id ? editData.status : request.status, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('flight_number', editableRow === request.id ? editData.requestDetail.flight_number : request.requestDetail.flight_number, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('arrival_date', editableRow === request.id ? editData.requestDetail.arrival_date : request.requestDetail.arrival_date, editableRow === request.id, 'date')}</TableCell>
                        <TableCell>{renderCell('return_date', editableRow === request.id ? editData.requestDetail.return_date : request.requestDetail.return_date, editableRow === request.id, 'date')}</TableCell>
                        <TableCell>{renderCell('hotel', editableRow === request.id ? editData.requestDetail.hotel : request.requestDetail.hotel, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('vehicle_type', editableRow === request.id ? editData.requestDetail.vehicle_type : request.requestDetail.vehicle_type, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('payment_method', editableRow === request.id ? editData.requestDetail.payment_method : request.requestDetail.payment_method, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('representative', editableRow === request.id ? editData.requestDetail.representative : request.requestDetail.representative, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('base_cost', editableRow === request.id ? editData.requestDetail.base_cost : request.requestDetail.base_cost, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('total_cost', editableRow === request.id ? editData.requestDetail.total_cost : request.requestDetail.total_cost, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('discount', editableRow === request.id ? editData.requestDetail.discount : request.requestDetail.discount, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('deposit', editableRow === request.id ? editData.requestDetail.deposit : request.requestDetail.deposit, editableRow === request.id)}</TableCell>
                        <TableCell>{request.requestDetail.is_return ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{renderCell('child_seat_cost', editableRow === request.id ? editData.requestDetail.child_seat_cost : request.requestDetail.child_seat_cost, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('child_age', editableRow === request.id ? editData.requestDetail.child_age : request.requestDetail.child_age, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('hours', editableRow === request.id ? editData.requestDetail.additional_driver.hours : request.requestDetail.additional_driver.hours, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('commission', editableRow === request.id ? editData.requestDetail.additional_driver.commission : request.requestDetail.additional_driver.commission, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('gross_cost', editableRow === request.id ? editData.requestDetail.additional_driver.gross_cost : request.requestDetail.additional_driver.gross_cost, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('net_cost', editableRow === request.id ? editData.requestDetail.additional_driver.net_cost : request.requestDetail.additional_driver.net_cost, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('big_suitcases', editableRow === request.id ? editData.requestDetail.luggage.big_suitcases : request.requestDetail.luggage.big_suitcases, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('cabin_bags', editableRow === request.id ? editData.requestDetail.luggage.cabin_bags : request.requestDetail.luggage.cabin_bags, editableRow === request.id)}</TableCell>
                        <TableCell>{renderCell('sky_bags', editableRow === request.id ? editData.requestDetail.luggage.sky_bags : request.requestDetail.luggage.sky_bags, editableRow === request.id)}</TableCell>
                        <TableCell className="break-all">{renderCell('clarificationText', editableRow === request.id ? editData.clarificationText : request.clarificationText, editableRow === request.id)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
