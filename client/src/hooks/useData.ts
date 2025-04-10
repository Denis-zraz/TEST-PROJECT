import { useEffect, useState } from 'react';
import { Items } from '../interfaces/Interfaces';

function useData(): Items[] {
	const [items, setItems] = useState<Items[]>([]);
	
	function fetchItems() {
		fetch(`${process.env.API_URL}/items`)
			.then(res => {
				console.log(res);
				return res.json();
			})
			.then(data => setItems(data))
			.catch(err => {
				console.error('Failed to fetch items', err);
			})
	}
	
	useEffect(() => {
		fetchItems();
		const interval = setInterval(fetchItems, 10000);
		return () => clearInterval(interval);
	}, []);
	
	return items;
}

export default useData;
