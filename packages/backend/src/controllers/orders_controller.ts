// src/controllers/orders_controller.ts

import { Elysia, t } from 'elysia';
import orders, { Order } from '../data/db';

const calculateCommission = (order: Order): number => {
  const orderDate = new Date(order.orderDate);
  const day = orderDate.getDay();
  const hour = orderDate.getHours();
  let commission = 0;

  const isWeekend = (day === 5 || day === 6);
  const isNight = hour >= 20;

  if (isWeekend) {
    commission = Math.min(order.total, 50);
    if (order.total > 50) {
      commission += (order.total - 50) * 0.03;
    }
  } else if (isNight) {
    commission = Math.min(order.total, 100) * 0.03;
    if (order.total > 100) {
      commission += (order.total - 100) * 0.05;
    }
  } else {
    commission = order.total * 0.03;
  }

  console.log(`Calculated commission for order ${order.id}: $${commission.toFixed(2)}`);
  return commission;
};

export const orderRoutes = new Elysia()
  .get('/orders', () => orders)
  .get('/orders/:id', ({ params }) => {
    const order = orders.find(order => order.id === params.id);
    return order || { message: 'Order not found' };
  })
  .post('/orders', ({ body }) => {
    const newOrder: Order = { ...body, commissionInDollars: calculateCommission(body) };
    orders.push(newOrder);
    console.log('New order created:', newOrder);
    return newOrder;
  }, {
    body: t.Object({
      id: t.String(),
      orderDate: t.String(),
      customerName: t.String(),
      attributedStaffName: t.String(),
      total: t.Number(),
      commissionInDollars: t.Optional(t.Number())
    })
  })
  .put('/orders/:id', ({ params, body }) => {
    const orderIndex = orders.findIndex(order => order.id === params.id);
    if (orderIndex !== -1) {
      const updatedOrder = { ...orders[orderIndex], ...body };
      updatedOrder.commissionInDollars = calculateCommission(updatedOrder);
      orders[orderIndex] = updatedOrder;
      console.log('Order updated:', updatedOrder);
      return orders[orderIndex];
    }
    return { message: 'Order not found' };
  }, {
    body: t.Object({
      orderDate: t.Optional(t.String()),
      customerName: t.Optional(t.String()),
      attributedStaffName: t.Optional(t.String()),
      total: t.Optional(t.Number()),
      commissionInDollars: t.Optional(t.Number())
    })
  })
  .delete('/orders/:id', ({ params }) => {
    const orderIndex = orders.findIndex(order => order.id === params.id);
    if (orderIndex !== -1) {
      const deletedOrder = orders.splice(orderIndex, 1)[0];
      console.log('Order deleted:', deletedOrder);
      return { message: 'Order deleted' };
    }
    return { message: 'Order not found' };
  });
