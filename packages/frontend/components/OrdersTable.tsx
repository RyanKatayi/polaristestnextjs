import { Card, IndexTable, useIndexResourceState } from '@shopify/polaris';
import { Order } from '@/types/order';

const OrdersTable = ({ orders }: { orders: Order[] }) => {
  const resourceName = { singular: 'order', plural: 'orders' };

  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(orders.map(order => ({ id: order.id })));

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

export default OrdersTable;
