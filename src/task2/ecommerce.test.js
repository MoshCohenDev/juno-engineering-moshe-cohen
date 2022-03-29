import { fetchOrderById } from '../api';
import { fetchAllOrders, bucketOrdersByUsers, getLast2WeeksOrders, bucketOrdersByDate } from './ecommerce';

// const ORDER_ID = '70ef599e5eca171b2bce84d1';

// test('Ecommerce - fetchOrderById', async () => {
// 	let orders = await fetchOrderById(ORDER_ID);
// 	console.log(orders);
// 	expect(orders).toBeTruthy();
// });

test('Ecommerce - fetchAllOrders', async () => {
	let allOrders = await fetchAllOrders();
	console.log(allOrders);
	expect(allOrders).toBeTruthy();
});

it('Ecommerce - getLast2WeeksOrders', async () => {
	let twoWeeksAgo = await getLast2WeeksOrders();
	console.log(twoWeeksAgo);
	expect(twoWeeksAgo).toBeTruthy();
});
it('Ecommerce - bucketOrdersByUsers', async () => {
	let orderByUsers = await bucketOrdersByUsers();
	console.log(orderByUsers);
	expect(orderByUsers).toBeTruthy();
});

it('Ecommerce - bucketOrdersByDate', async () => {
	let orderByDate = await bucketOrdersByDate();
	console.log(orderByDate);
	expect(orderByDate).toBeTruthy();
});
