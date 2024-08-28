import { TableInvoicesProps } from './TableInvoices.props';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export const TableInvoices = ({ filteredInvoices, getStatusColor }: TableInvoicesProps): JSX.Element => {
    const invoiceFiltersTitle: string[] = ['Invoice ID', 'Date Created', 'Date Paid', 'Status', 'Type',
        'Supplier', 'Sum', 'Refer', 'Invoice Data'];

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
                    <TableRow key={invoice.id + i}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{invoice.dateCreated}</TableCell>
                        <TableCell>{invoice.datePaid || 'N/A'}</TableCell>
                        <TableCell className={getStatusColor(invoice.status)}>{invoice.status}</TableCell>
                        <TableCell>{invoice.type}</TableCell>
                        <TableCell>{invoice.supplier}</TableCell>
                        <TableCell>${invoice.sum.toFixed(2)}</TableCell>
                        <TableCell>{invoice.refer}</TableCell>
                        <TableCell>{invoice.invoiceData.join(', ')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
