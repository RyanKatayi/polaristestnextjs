

import { Order } from '../data/db';

export const calculateCommission = (order: Order): number => {
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

  return commission;
};
