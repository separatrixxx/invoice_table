import { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { SearchIcon, FilterIcon } from "lucide-react";
import { format } from "date-fns";
import { getCars, getInvoice } from '../helpers/data.helper';
import { InvoiceInterface } from '../interfaces/invoice.interface';
import { CarInterface } from '../interfaces/car.interface';
import Sidebar from './Sidebar/Sidebar';


export default function Dashboard() {
  const [invoices, setInvoices] = useState<InvoiceInterface[]>([]);
  const [carRentRequests, setCarRentRequests] = useState<CarInterface[]>([]);

  useEffect(() => {
    getInvoice(setInvoices);
    getCars(setCarRentRequests);
  }, []);

  const [activeTab, setActiveTab] = useState<string>('invoices');
  const [invoiceFilters, setInvoiceFilters] = useState({
    search: '',
    dateCreated: null as Date | null,
    datePaid: null as Date | null,
    status: 'All',
    type: 'All',
    supplier: 'All',
    minSum: '',
    maxSum: '',
    refer: 'All'
  });
  const [carFilters, setCarFilters] = useState({
    search: '',
    status: 'All',
    pax: '',
    model: '',
    dateStart: null as Date | null,
    dateEnd: null as Date | null,
    minRentalDays: '',
    maxRentalDays: '',
    location: '',
    pickUpPlace: '',
    supplier: 'All',
    carGroup: 'All',
    insurance: 'all',
    carCategory: 'All',
    clarification: ''
  });

  const uniqueInvoiceStatuses = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.status)))], [invoices]);
  const uniqueInvoiceTypes = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.type)))], [invoices]);
  const uniqueInvoiceSuppliers = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.supplier)))], [invoices]);
  const uniqueInvoiceRefs = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.refer)))], [invoices]);

  const uniqueCarStatuses = useMemo(() => ['All', ...Array.from(new Set(carRentRequests.map(request => request.status)))], [carRentRequests]);
  const uniqueCarSuppliers = useMemo(() => ['All', ...Array.from(new Set(carRentRequests.map(request => request.requestDetail.supplier)))], [carRentRequests]);
  const uniqueCarGroups = useMemo(() => ['All', ...Array.from(new Set(carRentRequests.map(request => request.requestDetail.car_group)))], [carRentRequests]);
  const uniqueCarCategories = useMemo(() => ['All', ...Array.from(new Set(carRentRequests.map(request => request.requestDetail.car_category)))], [carRentRequests]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const searchMatch = invoice.id.toLowerCase().includes(invoiceFilters.search.toLowerCase());
      const dateCreatedMatch = !invoiceFilters.dateCreated || invoice.dateCreated === format(invoiceFilters.dateCreated, 'yyyy-MM-dd');
      const datePaidMatch = !invoiceFilters.datePaid || invoice.datePaid === format(invoiceFilters.datePaid, 'yyyy-MM-dd');
      const statusMatch = invoiceFilters.status === 'All' || invoice.status === invoiceFilters.status;
      const typeMatch = invoiceFilters.type === 'All' || invoice.type === invoiceFilters.type;
      const supplierMatch = invoiceFilters.supplier === 'All' || invoice.supplier.toLowerCase().includes(invoiceFilters.supplier.toLowerCase());
      const sumMatch = 
        (!invoiceFilters.minSum || invoice.sum >= parseFloat(invoiceFilters.minSum)) &&
        (!invoiceFilters.maxSum || invoice.sum <= parseFloat(invoiceFilters.maxSum));
      const referMatch = invoiceFilters.refer === 'All' || invoice.refer.toLowerCase().includes(invoiceFilters.refer.toLowerCase());
      
      return searchMatch && dateCreatedMatch && datePaidMatch && statusMatch && typeMatch && supplierMatch && sumMatch && referMatch;
    });
  }, [invoiceFilters, invoices]);

  const filteredCarRequests = useMemo(() => {
    return carRentRequests.filter(request => {
      const searchMatch = 
        request.id.toLowerCase().includes(carFilters.search.toLowerCase()) ||
        request.supplierName.toLowerCase().includes(carFilters.search.toLowerCase());
      const statusMatch = carFilters.status === 'All' || request.status === carFilters.status;
      const paxMatch = !carFilters.pax || request.requestDetail.pax.includes(carFilters.pax);
      const modelMatch = !carFilters.model || request.requestDetail.model.toLowerCase().includes(carFilters.model.toLowerCase());
      const dateStartMatch = !carFilters.dateStart || (new Date(request.requestDetail.date_start) >= new Date(carFilters.dateStart as Date));
      const dateEndMatch = !carFilters.dateEnd || (new Date(request.requestDetail.date_end) <= new Date(carFilters.dateEnd as Date));
      const rentalDaysMatch = 
        (!carFilters.minRentalDays || request.requestDetail.rental_days >= parseInt(carFilters.minRentalDays)) &&
        (!carFilters.maxRentalDays || request.requestDetail.rental_days <= parseInt(carFilters.maxRentalDays));
      const locationMatch = !carFilters.location || request.requestDetail.location.toLowerCase().includes(carFilters.location.toLowerCase());
      const pickUpPlaceMatch = !carFilters.pickUpPlace || request.requestDetail.pick_up_place.toLowerCase().includes(carFilters.pickUpPlace.toLowerCase());
      const supplierMatch = carFilters.supplier === 'All' || request.requestDetail.supplier === carFilters.supplier;
      const carGroupMatch = carFilters.carGroup === 'All' || request.requestDetail.car_group === carFilters.carGroup;
      const insuranceMatch = carFilters.insurance === 'all' || (carFilters.insurance === 'yes' && request.requestDetail.insurance) || (carFilters.insurance === 'no' && !request.requestDetail.insurance);
      const carCategoryMatch = carFilters.carCategory === 'All' || request.requestDetail.car_category === carFilters.carCategory;
      const clarificationMatch = !carFilters.clarification || request.clarificationText.toLowerCase().includes(carFilters.clarification.toLowerCase());
      
      return searchMatch && statusMatch && paxMatch && modelMatch && dateStartMatch && dateEndMatch && 
             rentalDaysMatch && locationMatch && pickUpPlaceMatch && supplierMatch && carGroupMatch && 
             insuranceMatch && carCategoryMatch && clarificationMatch;
    });
  }, [carFilters, carRentRequests]);

  const updateInvoiceFilter = (key: keyof typeof invoiceFilters, value: any) => {
    setInvoiceFilters(prev => ({ ...prev, [key]: value }));
  };

  const updateCarFilter = (key: keyof typeof carFilters, value: any) => {
    setCarFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status: string) => {
    if (status.toLowerCase() === 'paid') {
      return 'text-green-600';
    } else if (status.toLowerCase() === 'cancelled') {
      return 'text-red-600';
    } else {
      return 'text-gray-600';
    }
  };

  const invoiceFiltersTitle: string[] = ['Invoice ID', 'Date Created', 'Date Paid', 'Status', 'Type', 'Supplier',
    'Sum', 'Refer', 'Invoice Data'];

  const carFiltersTitle: string[] = ['ID', 'Name', 'Status', 'Pax', 'Model', 'Start Date', 'End Date', 'Rental Days',
    'Location', 'Pick Up Place', 'Supplier', 'Car Group', 'Insurance', 'Car Category', 'Clarification'];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle>{activeTab === 'invoices' ? 'Invoices' : 'Car Rent Requests'}</CardTitle>
          </CardHeader>
          <CardContent>
            {activeTab === 'invoices' ? (
              <>
                <div className="flex space-x-2 mb-4">
                  <div className="relative flex-grow">
                    <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ID..."
                      value={invoiceFilters.search}
                      onChange={(e) => updateInvoiceFilter('search', e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <FilterIcon className="mr-2 h-4 w-4" />
                        Filters
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 max-h-96 overflow-y-auto">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Date Created</h4>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                {invoiceFilters.dateCreated ? format(invoiceFilters.dateCreated, 'PPP') : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={invoiceFilters.dateCreated || undefined}
                                onSelect={(date) => updateInvoiceFilter('dateCreated', date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Date Paid</h4>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                {invoiceFilters.datePaid ? format(invoiceFilters.datePaid, 'PPP') : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={invoiceFilters.datePaid || undefined}
                                onSelect={(date) => updateInvoiceFilter('datePaid', date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Status</h4>
                          <Select value={invoiceFilters.status} onValueChange={(value) => updateInvoiceFilter('status', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueInvoiceStatuses.map(status => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Type</h4>
                          <Select value={invoiceFilters.type} onValueChange={(value) => updateInvoiceFilter('type', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueInvoiceTypes.map(type => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Supplier</h4>
                          <Select value={invoiceFilters.supplier} onValueChange={(value) => updateInvoiceFilter('supplier', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select supplier" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueInvoiceSuppliers.map(supplier => (
                                <SelectItem key={supplier} value={supplier}>
                                  {supplier}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Sum Range</h4>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Min"
                              type="number"
                              value={invoiceFilters.minSum}
                              onChange={(e) => updateInvoiceFilter('minSum', e.target.value)}
                            />
                            <Input
                              placeholder="Max"
                              type="number"
                              value={invoiceFilters.maxSum}
                              onChange={(e) => updateInvoiceFilter('maxSum', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Refer</h4>
                          <Select value={invoiceFilters.refer} onValueChange={(value) => updateInvoiceFilter('refer', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select refer" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueInvoiceRefs.map(refer => (
                                <SelectItem key={refer} value={refer}>
                                  {refer}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="overflow-x-auto">
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
                        <TableRow key={invoice.id}>
                          <TableCell>{invoice.id}</TableCell>
                          <TableCell>{invoice.dateCreated}</TableCell>
                          <TableCell>{invoice.datePaid || 'N/A'}</TableCell>
                          <TableCell className={getStatusColor(invoice.status)}>{invoice.status}</TableCell>
                          <TableCell>{invoice.type}</TableCell>
                          <TableCell>{invoice.supplier}</TableCell>
                          <TableCell>${invoice.sum.toFixed(2)}</TableCell>
                          <TableCell>{invoice.refer}</TableCell>
                          <TableCell>{invoice.invoiceData.join(', ')}</TableCell> {/* Отображаем массив через запятую */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            ) : (
              <>
                <div className="flex space-x-2 mb-4">
                  <div className="relative flex-grow">
                    <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ID or name..."
                      value={carFilters.search}
                      onChange={(e) => updateCarFilter('search', e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <FilterIcon className="mr-2 h-4 w-4" />
                        Filters
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 max-h-96 overflow-y-auto">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Status</h4>
                          <Select value={carFilters.status} onValueChange={(value) => updateCarFilter('status', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueCarStatuses.map(status => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Pax</h4>
                          <Input
                            placeholder="Filter by pax"
                            value={carFilters.pax}
                            onChange={(e) => updateCarFilter('pax', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Model</h4>
                          <Input
                            placeholder="Filter by model"
                            value={carFilters.model}
                            onChange={(e) => updateCarFilter('model', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Date Start</h4>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                {carFilters.dateStart ? format(carFilters.dateStart, 'PPP') : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={carFilters.dateStart || undefined}
                                onSelect={(date) => updateCarFilter('dateStart', date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Date End</h4>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                {carFilters.dateEnd ? format(carFilters.dateEnd, 'PPP') : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={carFilters.dateEnd || undefined}
                                onSelect={(date) => updateCarFilter('dateEnd', date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Rental Days</h4>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Min"
                              type="number"
                              value={carFilters.minRentalDays}
                              onChange={(e) => updateCarFilter('minRentalDays', e.target.value)}
                            />
                            <Input
                              placeholder="Max"
                              type="number"
                              value={carFilters.maxRentalDays}
                              onChange={(e) => updateCarFilter('maxRentalDays', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Location</h4>
                          <Input
                            placeholder="Filter by location"
                            value={carFilters.location}
                            onChange={(e) => updateCarFilter('location', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Pick Up Place</h4>
                          <Input
                            placeholder="Filter by pick up place"
                            value={carFilters.pickUpPlace}
                            onChange={(e) => updateCarFilter('pickUpPlace', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Supplier</h4>
                          <Select value={carFilters.supplier} onValueChange={(value) => updateCarFilter('supplier', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select supplier" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueCarSuppliers.map(supplier => (
                                <SelectItem key={supplier} value={supplier}>
                                  {supplier}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Car Group</h4>
                          <Select value={carFilters.carGroup} onValueChange={(value) => updateCarFilter('carGroup', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select car group" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueCarGroups.map(group => (
                                <SelectItem key={group} value={group}>
                                  {group}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Insurance</h4>
                          <Select value={carFilters.insurance} onValueChange={(value) => updateCarFilter('insurance', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select insurance" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Car Category</h4>
                          <Select value={carFilters.carCategory} onValueChange={(value) => updateCarFilter('carCategory', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select car category" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueCarCategories.map(category => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Clarification</h4>
                          <Input
                            placeholder="Filter by clarification"
                            value={carFilters.clarification}
                            onChange={(e) => updateCarFilter('clarification', e.target.value)}
                          />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {carFiltersTitle.map(c => (
                          <TableHead key={c}>{c}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCarRequests.map((request) => (
                        <TableRow key={request.id}>
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
                          <TableCell>{request.clarificationText}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
