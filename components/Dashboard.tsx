import { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { SearchIcon, FilterIcon } from "lucide-react";
import { format } from "date-fns";
import { getCars, getInvoice } from '../helpers/data.helper';
import { InvoiceInterface } from '../interfaces/invoice.interface';
import { CarInterface } from '../interfaces/car.interface';
import { Sidebar } from './Sidebar/Sidebar';
import { TableInvoices } from './TableInvoices/TableInvoices';
import { TableCars } from './TableCars/TableCars';
import { PageNavigation } from './PageNavigation/PageNavigation';


export default function Dashboard() {
  const [invoices, setInvoices] = useState<InvoiceInterface[]>([]);
  const [carRentRequests, setCarRentRequests] = useState<CarInterface[]>([]);
  const [activePageInvoices, setActivePageInvoices] = useState<number>(0);
  const [activePageCars, setActivePageCars] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('invoices');
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalInvoiceItems, setTotalInvoiceItems] = useState<number>(0);
  const [totalCarItems, setTotalCarItems] = useState<number>(0);

  useEffect(() => {
    if (activeTab === 'invoices') {
      getInvoice(activePageInvoices, itemsPerPage, setInvoices, setTotalInvoiceItems);
    } else {
      getCars(activePageCars, itemsPerPage, setCarRentRequests, setTotalCarItems);
    }
  }, [activePageInvoices, activePageCars, itemsPerPage, activeTab]);

  const [invoiceFilters, setInvoiceFilters] = useState({
    search: '',
    name: '',
    email: '',
    telephone: '',
    remarks: '',
    dateCreated: null as Date | null,
    datePaid: null as Date | null,
    status: 'All',
    type: 'All',
    supplier: 'All',
    confirmed: 'All',
    placeOfDelivery: 'All',
    carType: 'All',
    insurance: 'All',
    extras: 'All',
    bookingWindow: 'All',
    sales: 'All',
    discount: 'All',
    rentStart: null as Date | null,
    rentalEnds: null as Date | null,
    minDays: '',
    maxDays: '',
    minLeftToPay: '',
    maxLeftToPay: '',
    minTotalPrice: '',
    maxTotalPrice: '',
    minCommission: '',
    maxCommission: '',
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

  const uniqueInvoiceStatuses = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.status).filter(Boolean)))], [invoices]);
  const uniqueInvoiceTypes = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.type).filter(Boolean)))], [invoices]);
  const uniqueInvoiceSuppliers = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.supplier).filter(Boolean)))], [invoices]);
  const uniqueInvoiceConfirmations = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.confirmed).filter(Boolean)))], [invoices]);
  const uniquePlaceOfDeliveries = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.place_of_delivery).filter(Boolean)))], [invoices]);
  const uniqueCarTypes = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.car_type).filter(Boolean)))], [invoices]);
  const uniqueInsurances = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.insurance).filter(Boolean)))], [invoices]);
  const uniqueExtras = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.extras).filter(Boolean)))], [invoices]);
  const uniqueBookingWindows = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.booking_window).filter(Boolean)))], [invoices]);
  const uniqueSales = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.sales).filter(Boolean)))], [invoices]);
  const uniqueDiscounts = useMemo(() => ['All', ...Array.from(new Set(invoices.map(invoice => invoice.discount).filter(Boolean)))], [invoices]);

  const uniqueCarStatuses = useMemo(() => ['All', ...Array.from(new Set(carRentRequests.map(request => request.status)))], [carRentRequests]);
  const uniqueCarSuppliers = useMemo(() => ['All', ...Array.from(new Set(carRentRequests.map(request => request.requestDetail.supplier)))], [carRentRequests]);
  const uniqueCarGroups = useMemo(() => ['All', ...Array.from(new Set(carRentRequests.map(request => request.requestDetail.car_group)))], [carRentRequests]);
  const uniqueCarCategories = useMemo(() => ['All', ...Array.from(new Set(carRentRequests.map(request => request.requestDetail.car_category)))], [carRentRequests]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const searchMatch =
        invoice.invoice_id.toLowerCase().includes(invoiceFilters.search.toLowerCase()) ||
        invoice.name.toLowerCase().includes(invoiceFilters.search.toLowerCase()) ||
        invoice.email.toLowerCase().includes(invoiceFilters.search.toLowerCase()) ||
        invoice.telephone.toLowerCase().includes(invoiceFilters.search.toLowerCase()) ||
        (invoice.remarks && invoice.remarks.toLowerCase().includes(invoiceFilters.search.toLowerCase()));
      const statusMatch = invoiceFilters.status === 'All' || invoice.status === invoiceFilters.status;
      const typeMatch = invoiceFilters.type === 'All' || invoice.type === invoiceFilters.type;
      const supplierMatch = invoiceFilters.supplier === 'All' || invoice.supplier === invoiceFilters.supplier;
      const confirmedMatch = invoiceFilters.confirmed === 'All' || invoice.confirmed === invoiceFilters.confirmed;
      const placeOfDeliveryMatch = invoiceFilters.placeOfDelivery === 'All' || invoice.place_of_delivery === invoiceFilters.placeOfDelivery;
      const carTypeMatch = invoiceFilters.carType === 'All' || invoice.car_type === invoiceFilters.carType;
      const insuranceMatch = invoiceFilters.insurance === 'All' || invoice.insurance === invoiceFilters.insurance;
      const extrasMatch = invoiceFilters.extras === 'All' || invoice.extras === invoiceFilters.extras;
      const bookingWindowMatch = invoiceFilters.bookingWindow === 'All' || invoice.booking_window === invoiceFilters.bookingWindow;
      const salesMatch = invoiceFilters.sales === 'All' || invoice.sales === invoiceFilters.sales;
      const discountMatch = invoiceFilters.discount === 'All' || invoice.discount === invoiceFilters.discount;

      const dateCreatedMatch = !invoiceFilters.dateCreated || invoice.date_created === format(invoiceFilters.dateCreated, 'yyyy-MM-dd');
      const datePaidMatch = !invoiceFilters.datePaid || invoice.date_paid === format(invoiceFilters.datePaid, 'yyyy-MM-dd');
      const rentStartMatch = !invoiceFilters.rentStart || invoice.rent_start === format(invoiceFilters.rentStart, 'yyyy-MM-dd');
      const rentalEndsMatch = !invoiceFilters.rentalEnds || invoice.rental_ends === format(invoiceFilters.rentalEnds, 'yyyy-MM-dd');

      const daysMatch =
        (!invoiceFilters.minDays || invoice.days >= parseInt(invoiceFilters.minDays)) &&
        (!invoiceFilters.maxDays || invoice.days <= parseInt(invoiceFilters.maxDays));

      const leftToPayMatch =
        (!invoiceFilters.minLeftToPay || invoice.left_to_pay >= parseFloat(invoiceFilters.minLeftToPay)) &&
        (!invoiceFilters.maxLeftToPay || invoice.left_to_pay <= parseFloat(invoiceFilters.maxLeftToPay));

      const totalPriceMatch =
        (!invoiceFilters.minTotalPrice || invoice.total_price >= parseFloat(invoiceFilters.minTotalPrice)) &&
        (!invoiceFilters.maxTotalPrice || invoice.total_price <= parseFloat(invoiceFilters.maxTotalPrice));

      const commissionMatch =
        (!invoiceFilters.minCommission || invoice.commission >= parseFloat(invoiceFilters.minCommission)) &&
        (!invoiceFilters.maxCommission || invoice.commission <= parseFloat(invoiceFilters.maxCommission));

      return searchMatch && statusMatch && typeMatch && supplierMatch && confirmedMatch && placeOfDeliveryMatch &&
        carTypeMatch && insuranceMatch && extrasMatch && bookingWindowMatch && salesMatch && discountMatch &&
        dateCreatedMatch && datePaidMatch && rentStartMatch && rentalEndsMatch &&
        daysMatch && leftToPayMatch && totalPriceMatch && commissionMatch;
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
      const dateStartMatch = !carFilters.dateStart || new Date(request.requestDetail.date_start) >= new Date(carFilters.dateStart as Date);
      const dateEndMatch = !carFilters.dateEnd || new Date(request.requestDetail.date_end) <= new Date(carFilters.dateEnd as Date);
      const rentalDaysMatch =
        (!carFilters.minRentalDays || request.requestDetail.rental_days >= parseInt(carFilters.minRentalDays)) &&
        (!carFilters.maxRentalDays || request.requestDetail.rental_days <= parseInt(carFilters.maxRentalDays));
      const locationMatch = !carFilters.location || request.requestDetail.location.toLowerCase().includes(carFilters.location.toLowerCase());
      const pickUpPlaceMatch = !carFilters.pickUpPlace || request.requestDetail.pick_up_place.toLowerCase().includes(carFilters.pickUpPlace.toLowerCase());
      const supplierMatch = carFilters.supplier === 'All' || request.requestDetail.supplier === carFilters.supplier;
      const carGroupMatch = carFilters.carGroup === 'All' || request.requestDetail.car_group === carFilters.carGroup;
      const insuranceMatch =
        carFilters.insurance === 'all' ||
        (carFilters.insurance === 'yes' && request.requestDetail.insurance) ||
        (carFilters.insurance === 'no' && !request.requestDetail.insurance);
      const carCategoryMatch = carFilters.carCategory === 'All' || request.requestDetail.car_category === carFilters.carCategory;
      const clarificationMatch =
        !carFilters.clarification || request.clarificationText.toLowerCase().includes(carFilters.clarification.toLowerCase());

      return (
        searchMatch && statusMatch && paxMatch && modelMatch && dateStartMatch && dateEndMatch && rentalDaysMatch && locationMatch
        && pickUpPlaceMatch && supplierMatch && carGroupMatch && insuranceMatch && carCategoryMatch && clarificationMatch);
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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-8 w-2/3">
        <Card className="h-[85vh]">
          <CardHeader>
            <CardTitle>{activeTab === 'invoices' ? 'Invoices' : 'Car Rent Requests'}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="flex space-x-2 mb-4">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={activeTab === 'invoices' ? "Search by ID, Name, Email or Phone" : "Search by ID or name..."}
                  value={activeTab === 'invoices' ? invoiceFilters.search : carFilters.search}
                  onChange={(e) => activeTab === 'invoices' ? updateInvoiceFilter('search', e.target.value) : updateCarFilter('search', e.target.value)}
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
                    {activeTab === 'invoices' ? (
                      <>
                        {/* Invoice Filters */}
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Name</h4>
                          <Input
                            placeholder="Filter by name"
                            value={invoiceFilters.name}
                            onChange={(e) => updateInvoiceFilter('name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Email</h4>
                          <Input
                            placeholder="Filter by email"
                            value={invoiceFilters.email}
                            onChange={(e) => updateInvoiceFilter('email', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Phone</h4>
                          <Input
                            placeholder="Filter by phone"
                            value={invoiceFilters.telephone}
                            onChange={(e) => updateInvoiceFilter('telephone', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Remarks</h4>
                          <Input
                            placeholder="Filter by remarks"
                            value={invoiceFilters.remarks}
                            onChange={(e) => updateInvoiceFilter('remarks', e.target.value)}
                          />
                        </div>
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
                              {uniqueInvoiceStatuses.map((status, i) => (
                                <SelectItem key={status + i} value={status}>
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
                              {uniqueInvoiceTypes.map((type, i) => (
                                <SelectItem key={type + i} value={type}>
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
                              {uniqueInvoiceSuppliers.map((supplier, i) => (
                                <SelectItem key={supplier + i} value={supplier}>
                                  {supplier}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Confirmed</h4>
                          <Select value={invoiceFilters.confirmed} onValueChange={(value) => updateInvoiceFilter('confirmed', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select confirmation" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueInvoiceConfirmations.map((confirmed, i) => (
                                <SelectItem key={confirmed || '' + i} value={confirmed || ''}>
                                  {confirmed}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Place of Delivery</h4>
                          <Select value={invoiceFilters.placeOfDelivery} onValueChange={(value) => updateInvoiceFilter('placeOfDelivery', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select place of delivery" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniquePlaceOfDeliveries.map((placeOfDelivery, i) => (
                                <SelectItem key={placeOfDelivery + i} value={placeOfDelivery}>
                                  {placeOfDelivery}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Type of Car</h4>
                          <Select value={invoiceFilters.carType} onValueChange={(value) => updateInvoiceFilter('carType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select car type" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueCarTypes.map((carType, i) => (
                                <SelectItem key={carType + i} value={carType}>
                                  {carType}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Insurance + Extras</h4>
                          <div className="flex space-x-2">
                            <Select value={invoiceFilters.insurance} onValueChange={(value) => updateInvoiceFilter('insurance', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select insurance" />
                              </SelectTrigger>
                              <SelectContent>
                                {uniqueInsurances.map((insurance, i) => (
                                  <SelectItem key={insurance + i} value={insurance}>
                                    {insurance}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select value={invoiceFilters.extras} onValueChange={(value) => updateInvoiceFilter('extras', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select extras" />
                              </SelectTrigger>
                              <SelectContent>
                                {uniqueExtras.map((extras, i) => (
                                  <SelectItem key={extras || '' + i} value={extras || ''}>
                                    {extras}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Booking Window</h4>
                          <Select value={invoiceFilters.bookingWindow} onValueChange={(value) => updateInvoiceFilter('bookingWindow', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select booking window" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueBookingWindows.map((bookingWindow, i) => (
                                <SelectItem key={bookingWindow || '' + i} value={bookingWindow || ''}>
                                  {bookingWindow}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Sales</h4>
                          <Select value={invoiceFilters.sales} onValueChange={(value) => updateInvoiceFilter('sales', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sales" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueSales.map((sales, i) => (
                                <SelectItem key={sales || '' + i} value={sales || ''}>
                                  {sales}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Discount</h4>
                          <Select value={invoiceFilters.discount} onValueChange={(value) => updateInvoiceFilter('discount', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select discount" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueDiscounts.map((discount, i) => (
                                <SelectItem key={discount || '' + i} value={discount || ''}>
                                  {discount}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Rent Start</h4>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                {invoiceFilters.rentStart ? format(invoiceFilters.rentStart, 'PPP') : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={invoiceFilters.rentStart || undefined}
                                onSelect={(date) => updateInvoiceFilter('rentStart', date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Rental Ends</h4>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                {invoiceFilters.rentalEnds ? format(invoiceFilters.rentalEnds, 'PPP') : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={invoiceFilters.rentalEnds || undefined}
                                onSelect={(date) => updateInvoiceFilter('rentalEnds', date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Days</h4>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Min"
                              type="number"
                              value={invoiceFilters.minDays}
                              onChange={(e) => updateInvoiceFilter('minDays', e.target.value)}
                            />
                            <Input
                              placeholder="Max"
                              type="number"
                              value={invoiceFilters.maxDays}
                              onChange={(e) => updateInvoiceFilter('maxDays', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Left to Pay</h4>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Min"
                              type="number"
                              value={invoiceFilters.minLeftToPay}
                              onChange={(e) => updateInvoiceFilter('minLeftToPay', e.target.value)}
                            />
                            <Input
                              placeholder="Max"
                              type="number"
                              value={invoiceFilters.maxLeftToPay}
                              onChange={(e) => updateInvoiceFilter('maxLeftToPay', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Total Price</h4>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Min"
                              type="number"
                              value={invoiceFilters.minTotalPrice}
                              onChange={(e) => updateInvoiceFilter('minTotalPrice', e.target.value)}
                            />
                            <Input
                              placeholder="Max"
                              type="number"
                              value={invoiceFilters.maxTotalPrice}
                              onChange={(e) => updateInvoiceFilter('maxTotalPrice', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Commission</h4>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Min"
                              type="number"
                              value={invoiceFilters.minCommission}
                              onChange={(e) => updateInvoiceFilter('minCommission', e.target.value)}
                            />
                            <Input
                              placeholder="Max"
                              type="number"
                              value={invoiceFilters.maxCommission}
                              onChange={(e) => updateInvoiceFilter('maxCommission', e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Car Rent Request Filters */}
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Status</h4>
                          <Select value={carFilters.status} onValueChange={(value) => updateCarFilter('status', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueCarStatuses.map((status, i) => (
                                <SelectItem key={status + i} value={status}>
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
                              {uniqueCarSuppliers.map((supplier, i) => (
                                <SelectItem key={supplier + i} value={supplier}>
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
                              {uniqueCarGroups.map((group, i) => (
                                <SelectItem key={group + i} value={group}>
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
                              {uniqueCarCategories.map((category, i) => (
                                <SelectItem key={category + i} value={category}>
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
                      </>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="overflow-y-auto flex-1">
              {activeTab === 'invoices' ? (
                <TableInvoices filteredInvoices={filteredInvoices} getStatusColor={getStatusColor} />
              ) : (
                <TableCars filteredCarRequests={filteredCarRequests} getStatusColor={getStatusColor} />
              )}
            </div>
            <PageNavigation activeTab={activeTab} activePageInvoices={activePageInvoices} activePageCars={activePageCars}
              itemsPerPage={itemsPerPage} totalInvoiceItems={totalInvoiceItems} totalCarItems={totalCarItems}
              setActivePageInvoices={setActivePageInvoices} setActivePageCars={setActivePageCars} setItemsPerPage={setItemsPerPage} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
