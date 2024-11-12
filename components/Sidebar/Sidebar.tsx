import { SidebarProps } from './Sidebar.props';
import { Button } from "@/components/ui/button";
import { FileTextIcon, CarIcon, FileInput } from "lucide-react";


export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps): JSX.Element => {
  return (
    <div className="w-16 bg-white shadow-md">
        <div className="flex flex-col items-center py-4">
          <Button
            variant={activeTab === 'invoices' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveTab('invoices')}
            className="mb-4"
          >
            <FileTextIcon className="h-6 w-6" />
            <span className="sr-only">Invoices</span>
          </Button>
          <Button
            variant={activeTab === 'cars' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveTab('cars')}
            className="mb-4"
          >
            <CarIcon className="h-6 w-6" />
            <span className="sr-only">Cars</span>
          </Button>
          <Button
            variant={activeTab === 'transfer' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveTab('transfer')}
          >
            <FileInput className="h-6 w-6" />
            <span className="sr-only">Transfer Requests</span>
          </Button>
        </div>
      </div>
  );
}
