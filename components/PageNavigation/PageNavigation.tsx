import { PageNavigationProps } from './PageNavigation.props';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';


export const PageNavigation = ({
    activeTab,
    activePageInvoices,
    activePageCars,
    activePageTransfer,
    itemsPerPage,
    totalInvoiceItems,
    totalCarItems,
    totalTransferItems,
    setActivePageInvoices,
    setActivePageCars,
    setActivePageTransfer,
    setItemsPerPage,
}: PageNavigationProps): JSX.Element => {
    const totalPagesInvoices = Math.ceil(totalInvoiceItems / itemsPerPage);
    const totalPagesCars = Math.ceil(totalCarItems / itemsPerPage);
    const totalPagesTransfer = Math.ceil(totalTransferItems / itemsPerPage);

    useEffect(() => {
        const getMaxPage = (totalItems: number) => Math.max(0, Math.ceil(totalItems / itemsPerPage) - 1);

        if (activeTab === 'invoices' && activePageInvoices > getMaxPage(totalInvoiceItems)) {
            setActivePageInvoices(getMaxPage(totalInvoiceItems));
        } else if (activeTab === 'cars' && activePageCars > getMaxPage(totalCarItems)) {
            setActivePageCars(getMaxPage(totalCarItems));
        } else if (activeTab === 'transfer' && activePageTransfer > getMaxPage(totalTransferItems)) {
            setActivePageTransfer(getMaxPage(totalTransferItems));
        }
    }, [itemsPerPage, totalInvoiceItems, totalCarItems, totalTransferItems, activeTab, activePageInvoices, activePageCars,
        activePageTransfer, setActivePageInvoices, setActivePageCars, setActivePageTransfer]);

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        if (activeTab === 'invoices') {
            setActivePageInvoices(0);
        } else if (activeTab === 'cars') {
            setActivePageCars(0);
        } else {
            setActivePageTransfer(0);
        }
    };

    const getActivePage = () => {
        if (activeTab === 'invoices') return activePageInvoices + 1;
        if (activeTab === 'cars') return activePageCars + 1;
        return activePageTransfer + 1;
    };

    const getTotalPages = () => {
        if (activeTab === 'invoices') return totalPagesInvoices;
        if (activeTab === 'cars') return totalPagesCars;
        return totalPagesTransfer;
    };

    const handlePreviousPage = () => {
        if (activeTab === 'invoices') setActivePageInvoices(prev => Math.max(prev - 1, 0));
        else if (activeTab === 'cars') setActivePageCars(prev => Math.max(prev - 1, 0));
        else setActivePageTransfer(prev => Math.max(prev - 1, 0));
    };

    const handleNextPage = () => {
        if (activeTab === 'invoices') setActivePageInvoices(prev => Math.min(prev + 1, totalPagesInvoices - 1));
        else if (activeTab === 'cars') setActivePageCars(prev => Math.min(prev + 1, totalPagesCars - 1));
        else setActivePageTransfer(prev => Math.min(prev + 1, totalPagesTransfer - 1));
    };

    return (
        <div className="mt-4 flex justify-between items-center">
            <Button
                variant="outline"
                onClick={handlePreviousPage}
                disabled={getActivePage() === 1}
            >
                Previous
            </Button>
            <span>
                Page {getActivePage()} of {getTotalPages()}
            </span>
            <div className="flex items-center gap-2">
                <label htmlFor="itemsPerPage" className="mr-2">
                    Items per Page:
                </label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="border border-gray-300 rounded px-2 py-1"
                >
                    {[5, 10, 15, 20, 30, 40, 50].map((number) => (
                        <option key={number} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
            </div>
            <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={getActivePage() >= getTotalPages()}
            >
                Next
            </Button>
        </div>
    );
};
