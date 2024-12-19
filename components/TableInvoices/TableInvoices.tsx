import { TableInvoicesProps } from './TableInvoices.props';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditIcon, TrashIcon, CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { InvoiceInterface } from '../../interfaces/invoice.interface';
import { editInvoice, removeRow } from '../../helpers/data.helper';


export const TableInvoices = ({ filteredInvoices, getStatusColor, activePage, itemsPerPage,
  setInvoices, setTotalItems }: TableInvoicesProps): JSX.Element => {
  const invoiceFiltersTitle: string[] = [
    'Actions', 'Invoice ID', 'Name', 'Email', 'Telephone', 'Remarks',
    'Status', 'Type', 'Supplier', 'Confirmed', 'Place of Delivery',
    'Type of car', 'Insurance + Extras', 'Booking Window', 'Sales', 'Discount',
    'Rent Start', 'Rental Ends', 'Date Created', 'Date Paid',
    'Days', 'Left to pay', 'Total Price', 'Commission'
  ];

  const [editableRow, setEditableRow] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<InvoiceInterface>>({});

  const handleEditClick = (invoice: InvoiceInterface) => {
    setEditableRow(invoice.invoice_id);
    setEditData(invoice);
  };

  const handleCancelEdit = () => {
    setEditableRow(null);
    setEditData({});
  };

  const handleSaveEdit = async (id: string) => {
    await editInvoice(id, editData as InvoiceInterface, activePage, itemsPerPage, setInvoices, setTotalItems);

    setEditableRow(null);
    setEditData({});
  };

  const handleInputChange = (field: string, value: any) => {
    setEditData({ ...editData, [field]: value });
  };

  const renderCell = (field: keyof InvoiceInterface, value: any, isEditable: boolean) => {
    return isEditable ? (
      <input
        value={value ?? ''}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="border px-2 py-1 w-full"
      />
    ) : (
      <>{field === 'discount' || field === 'total_price' || field === 'commission' || field === 'left_to_pay' ? `€${value}` : value}</>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {invoiceFiltersTitle.map(i => (
            <TableHead key={i}>{i}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredInvoices.map((invoice) => (
          <TableRow key={invoice.invoice_id}>
            <TableCell>
              {editableRow === invoice.invoice_id ? (
                <>
                  <CheckIcon
                    onClick={() => handleSaveEdit(invoice.invoice_id)}
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
                    onClick={() => handleEditClick(invoice)}
                    className="cursor-pointer text-blue-500 mb-2"
                  />
                  <TrashIcon
                    onClick={() => removeRow(invoice.invoice_id, 'invoice',
                      activePage, itemsPerPage, setInvoices, setTotalItems)}
                    className="cursor-pointer text-red-500"
                  />
                </>
              )}
            </TableCell>
            <TableCell>{invoice.invoice_id}</TableCell>
            <TableCell>{renderCell('name', editableRow === invoice.invoice_id ? editData.name : invoice.name, editableRow === invoice.invoice_id)}</TableCell>
            <TableCell>{renderCell('email', editableRow === invoice.invoice_id ? editData.email : invoice.email, editableRow === invoice.invoice_id)}</TableCell>
            <TableCell>{invoice.telephone}</TableCell>
            <TableCell>{invoice.remarks || ''}</TableCell>
            <TableCell className={getStatusColor(invoice.status)}>{invoice.status}</TableCell>
            <TableCell>{invoice.type}</TableCell>
            <TableCell>{invoice.supplier}</TableCell>
            <TableCell>{invoice.confirmed}</TableCell>
            <TableCell>{invoice.place_of_delivery}</TableCell>
            <TableCell>{invoice.car_type}</TableCell>
            <TableCell>{invoice.insurance} {invoice.extras}</TableCell>
            <TableCell>{invoice.booking_window || ''}</TableCell>
            <TableCell>{invoice.sales || ''}</TableCell>
            <TableCell>{renderCell('discount', editableRow === invoice.invoice_id ? editData.discount : invoice.discount, editableRow === invoice.invoice_id)}</TableCell>
            <TableCell>{invoice.rent_start}</TableCell>
            <TableCell>{invoice.rental_ends}</TableCell>
            <TableCell>{invoice.date_created}</TableCell>
            <TableCell>{invoice.date_paid || 'N/A'}</TableCell>
            <TableCell>{invoice.days}</TableCell>
            <TableCell>{renderCell('left_to_pay', `€${invoice.left_to_pay.toFixed(2)}`, false)}</TableCell>
            <TableCell>{renderCell('total_price', editableRow === invoice.invoice_id ? editData.total_price : invoice.total_price, editableRow === invoice.invoice_id)}</TableCell>
            <TableCell>{renderCell('commission', editableRow === invoice.invoice_id ? editData.commission : invoice.commission, editableRow === invoice.invoice_id)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};