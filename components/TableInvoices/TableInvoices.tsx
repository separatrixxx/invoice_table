import { TableInvoicesProps } from './TableInvoices.props';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export const TableInvoices = ({ filteredInvoices, getStatusColor }: TableInvoicesProps): JSX.Element => {
    const invoiceFiltersTitle: string[] = [
      'Invoice ID', 'Name', 'Email', 'Telephone', 'Remarks',
      'Status', 'Type', 'Supplier', 'Confirmed', 'Place of Delivery',
      'Type of car', 'Insurance + Extras', 'Booking Window', 'Sales', 'Discount',
      'Rent Start', 'Rental Ends', 'Date Created', 'Date Paid',
      'Days', 'Left to pay', 'Total Price', 'Commission'
    ];
  
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
          {filteredInvoices.map((invoice, i) => (
            <TableRow key={invoice.invoice_id + i}>
              <TableCell>{invoice.invoice_id}</TableCell>
              <TableCell>{invoice.name}</TableCell>
              <TableCell>{invoice.email}</TableCell>
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
              <TableCell>{invoice.discount || ''}</TableCell>
              <TableCell>{invoice.rent_start}</TableCell>
              <TableCell>{invoice.rental_ends}</TableCell>
              <TableCell>{invoice.date_created}</TableCell>
              <TableCell>{invoice.date_paid || 'N/A'}</TableCell>
              <TableCell>{invoice.days}</TableCell>
              <TableCell>€{invoice.left_to_pay.toFixed(2)}</TableCell>
              <TableCell>€{invoice.total_price.toFixed(2)}</TableCell>
              <TableCell>€{invoice.commission.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  
