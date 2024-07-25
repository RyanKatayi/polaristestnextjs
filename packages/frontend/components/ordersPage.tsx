'use client';
import { useEffect, useState, useCallback } from 'react';
import { Page, Layout, Card, IndexTable, useIndexResourceState, Filters as PolarisFilters, TextField, Button, DatePicker } from '@shopify/polaris';

interface Order {
  id: string;
  orderDate: string;
  customerName: string;
  attributedStaffName: string;
  total: number;
  commission: number;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Filters: React.FC<{ filters: { customerName?: string; attributedStaffName?: string; dateRange?: { start: Date; end: Date } }; setFilters: (filters: any) => void }> = ({ filters, setFilters }) => {
  const [customerName, setCustomerName] = useState(filters.customerName || '');
  const [attributedStaffName, setAttributedStaffName] = useState(filters.attributedStaffName || '');
  const [dateRange, setDateRange] = useState(filters.dateRange || { start: undefined, end: undefined });

  const handleCustomerNameChange = useCallback((value: string) => {
    setCustomerName(value);
    setFilters({ ...filters, customerName: value });
  }, [filters, setFilters]);

  const handleAttributedStaffNameChange = useCallback((value: string) => {
    setAttributedStaffName(value);
    setFilters({ ...filters, attributedStaffName: value });
  }, [filters, setFilters]);

  const handleDateRangeChange = useCallback(({ start, end }: { start: Date; end: Date }) => {
    setDateRange({ start, end });
    setFilters({ ...filters, dateRange: { start, end } });
  }, [filters, setFilters]);

  const appliedFilters = [
    customerName && {
      key: 'customerName',
      label: `Customer: ${customerName}`,
      onRemove: () => {
        setCustomerName('');
        setFilters({ ...filters, customerName: '' });
      },
    },
    attributedStaffName && {
      key: 'attributedStaffName',
      label: `Staff: ${attributedStaffName}`,
      onRemove: () => {
        setAttributedStaffName('');
        setFilters({ ...filters, attributedStaffName: '' });
      },
    },
    dateRange.start && dateRange.end && {
      key: 'dateRange',
      label: `Date Range: ${dateRange.start.toDateString()} - ${dateRange.end.toDateString()}`,
      onRemove: () => {
        setDateRange({ start: undefined, end: undefined });
        setFilters({ ...filters, dateRange: { start: undefined, end: undefined } });
      },
    },
  ].filter(Boolean) as { key: string; label: string; onRemove: () => void }[]; // Ensure type is correct

  return (
    <Card>
      <PolarisFilters
        queryValue={customerName}
        onQueryChange={handleCustomerNameChange}
        onQueryClear={() => handleCustomerNameChange('')}
        filters={[
          {
            key: 'customerName',
            label: 'Customer Name',
            filter: (
              <TextField
                label="Customer Name"
                value={customerName}
                onChange={handleCustomerNameChange}
                autoComplete="off"
              />
            ),
          },
          {
            key: 'attributedStaffName',
            label: 'Attributed Staff Name',
            filter: (
              <TextField
                label="Attributed Staff Name"
                value={attributedStaffName}
                onChange={handleAttributedStaffNameChange}
                autoComplete="off"
              />
            ),
          },
          {
            key: 'dateRange',
            label: 'Date Range',
            filter: (
              <DatePicker
                month={dateRange.start ? dateRange.start.getMonth() : new Date().getMonth()}
                year={dateRange.start ? dateRange.start.getFullYear() : new Date().getFullYear()}
                onChange={handleDateRangeChange}
                onMonthChange={(month, year) => handleDateRangeChange({ start: new Date(year, month), end: dateRange.end || new Date() })} // Provide default for end
                selected={{
                  start: dateRange.start || new Date(), // Provide default for start
                  end: dateRange.end || new Date(),     // Provide default for end
                }} 
               
                multiMonth
                allowRange
              />
            ),
          },
        ]}
        appliedFilters={appliedFilters}
        onClearAll={() => {
          setCustomerName('');
          setAttributedStaffName('');
          setDateRange({ start: undefined, end: undefined });
          setFilters({ customerName: '', attributedStaffName: '', dateRange: { start: undefined, end: undefined } });
        }}
      />
    </Card>
  );
};

const OrdersTable = ({ orders }: { orders: Order[] }) => {
  const resourceName = { singular: 'order', plural: 'orders' };

  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(
    orders.map(order => ({ id: order.id }))
  );

  const rowMarkup = orders.map((order, index) => (
    <IndexTable.Row id={order.id} key={order.id} selected={selectedResources.includes(order.id)} position={index}>
      <IndexTable.Cell>{order.id}</IndexTable.Cell>
      <IndexTable.Cell>{order.orderDate}</IndexTable.Cell>
      <IndexTable.Cell>{order.customerName}</IndexTable.Cell>
      <IndexTable.Cell>{order.attributedStaffName}</IndexTable.Cell>
      <IndexTable.Cell>{order.total}</IndexTable.Cell>
      <IndexTable.Cell>{order.commission}</IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: 'Order ID' },
          { title: 'Order Date' },
          { title: 'Customer Name' },
          { title: 'Attributed Staff Name' },
          { title: 'Total' },
          { title: 'Commission' },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};

const SyncButton: React.FC<{ onSync: () => void }> = ({ onSync }) => {
  return (
    <Button onClick={onSync}>
      Sync
    </Button>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState({ customerName: '', attributedStaffName: '', dateRange: { start: undefined, end: undefined } });

  const fetchOrders = useCallback(async () => {
    try {
      const data = await fetcher('http://localhost:3000/orders');
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
//
  const filteredOrders = orders.filter(order => {
    const matchesCustomerName = filters.customerName ? order.customerName.toLowerCase().includes(filters.customerName.toLowerCase()) : true;
    const matchesAttributedStaffName = filters.attributedStaffName ? order.attributedStaffName.toLowerCase().includes(filters.attributedStaffName.toLowerCase()) : true;
    const matchesDateRange = filters.dateRange.start instanceof Date && filters.dateRange.end instanceof Date
    ? new Date(order.orderDate) >= filters.dateRange.start && new Date(order.orderDate) <= filters.dateRange.end
    : true;

    return matchesCustomerName && matchesAttributedStaffName && matchesDateRange;
  });

  return (
    <Page title="Orders Commissions Viewer">
      <Layout>
        <Layout.Section>
          <Filters filters={filters} setFilters={setFilters} />
        </Layout.Section>
        <Layout.Section>
          <SyncButton onSync={fetchOrders} />
        </Layout.Section>
        <Layout.Section>
          <OrdersTable orders={filteredOrders} />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default OrdersPage;
