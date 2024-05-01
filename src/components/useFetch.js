import { useEffect, useState } from "react";

export const useFetch = (apiPromise) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			const response = await apiPromise();
			if (!response.ok) throw new Error(response.statusText);
			const data = await response.json();
			console.log(data);
			setData(data);
		} catch (e) {
			console.log(e);
			setError(e);
		}
	};

	useEffect(() => {
		// clears all the data first then fetch
		setData(null);
		setError(null);

		// fetch
		fetchData();

		return () => {
			// cleanup functions
		};
	}, [apiPromise]);

	return { data, setData, error };
};
