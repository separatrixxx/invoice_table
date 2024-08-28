import { PageNavigationProps } from './PageNavigation.props';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export const PageNavigation = ({
    activeTab,
    activePageInvoices,
    activePageCars,
    itemsPerPage,
    totalInvoiceItems,
    totalCarItems,
    setActivePageInvoices,
    setActivePageCars,
    setItemsPerPage,
}: PageNavigationProps): JSX.Element => {
    const totalPagesInvoices = Math.ceil(totalInvoiceItems / itemsPerPage);
    const totalPagesCars = Math.ceil(totalCarItems / itemsPerPage);

    // Корректируем номер страницы при изменении количества элементов на странице
    useEffect(() => {
        if (activeTab === 'invoices') {
            const maxPage = Math.max(0, Math.ceil(totalInvoiceItems / itemsPerPage) - 1);
            if (activePageInvoices > maxPage) {
                setActivePageInvoices(maxPage);
            }
        } else {
            const maxPage = Math.max(0, Math.ceil(totalCarItems / itemsPerPage) - 1);
            if (activePageCars > maxPage) {
                setActivePageCars(maxPage);
            }
        }
    }, [itemsPerPage, totalInvoiceItems, totalCarItems, activeTab, activePageInvoices, activePageCars, setActivePageInvoices, setActivePageCars]);

    return (
        <div className="mt-4 flex justify-between items-center">
            <Button
                variant="outline"
                onClick={() =>
                    activeTab === 'invoices'
                        ? setActivePageInvoices((prev) => Math.max(prev - 1, 0))
                        : setActivePageCars((prev) => Math.max(prev - 1, 0))
                }
                disabled={activeTab === 'invoices' ? activePageInvoices === 0 : activePageCars === 0}
            >
                Previous
            </Button>
            <span>
                Page {activeTab === 'invoices' ? activePageInvoices + 1 : activePageCars + 1} of{' '}
                {activeTab === 'invoices' ? totalPagesInvoices : totalPagesCars}
            </span>
            <div className="flex items-center gap-2">
                <label htmlFor="itemsPerPage" className="mr-2">
                    Items per Page:
                </label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
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
                onClick={() =>
                    activeTab === 'invoices'
                        ? setActivePageInvoices((prev) => Math.min(prev + 1, totalPagesInvoices - 1))
                        : setActivePageCars((prev) => Math.min(prev + 1, totalPagesCars - 1))
                }
                disabled={
                    activeTab === 'invoices'
                        ? activePageInvoices >= totalPagesInvoices - 1
                        : activePageCars >= totalPagesCars - 1
                }
            >
                Next
            </Button>
        </div>
    );
};
