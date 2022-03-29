////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from '../api';

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////
export const fetchAllOrders = () => {
	const ids = allIds;
	return Promise.all(
		ids.map(async (id) => {
			return await fetchOrderById(id);
		})
	);
};

export const bucketOrdersByUsers = async () => {
	let ordersByUsers = {};
	const orders = await fetchAllOrders();
	orders.map((o) => {
		let uid = o.userId;
		if (ordersByUsers[uid]) {
			ordersByUsers[uid].push({ id: o.id, timestamp: o.timestamp, title: o.title });
		} else {
			ordersByUsers[uid] = [];
			ordersByUsers[uid].push({ id: o.id, timestamp: o.timestamp, title: o.title });
		}
	});
	return ordersByUsers;
};

export const getLast2WeeksOrders = async () => {
	let twoWeeksAgo = Date.now() - 1000 * 60 * 60 * 24 * 14;
	let orders = await fetchAllOrders();
	orders = orders.filter((a) => {
		return a.timestamp > twoWeeksAgo;
	});
	return orders;
};

export const bucketOrdersByDate = async () => {
	let ordersByDate = {};
	const ordersByTowWeeksDate = await getLast2WeeksOrders();
	ordersByTowWeeksDate.forEach((o) => {
		let date = new Date(o.timestamp).getDate();
		if (ordersByDate[date]) {
			ordersByDate[date].push({ id: o.id, timestamp: o.timestamp, title: o.title });
		} else {
			ordersByDate[date] = [];
			ordersByDate[date].push({ id: o.id, timestamp: o.timestamp, title: o.title });
		}
	});
	return ordersByDate;
};

fetchAllOrders();
// .then(console.log);

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
