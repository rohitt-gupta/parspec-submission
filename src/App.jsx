import "./App.css";
import { useState } from "react";
import ListBox from "./components/ListBox";
import SearchBox from "./components/SearchBox";
import { useFetch } from "./components/useFetch";
import { findMatchingItems } from "./utils";

const apiPromise = async () =>
	await fetch(
		"https://fe-take-home-assignment.s3.us-east-2.amazonaws.com/Data.json"
	);

function App() {
	const { data, error } = useFetch(apiPromise);
	const [filteredData, setFilteredData] = useState(data);

	const handleChange = (query) => {
		if (query === "") return setFilteredData([]);

		const filteredValue = data.filter((profile) => {
			const items = profile.items;
			const itemMatchResult = findMatchingItems(query, items);
			return (
				profile.name.toLowerCase().includes(query) ||
				profile.id.toLowerCase().includes(query) ||
				profile.address.toLowerCase().includes(query) ||
				profile.pincode.toLowerCase().includes(query) ||
				itemMatchResult
			);
		});
		setFilteredData(filteredValue);
	};

	return (
		<div className='wrapper'>
			<SearchBox
				id='users'
				name='users'
				label='Search users'
				placeholder='Search users by ID, name, address'
				autoComplete={true}
				styles={{
					label: "label",
					input: "input",
				}}
				debounceWait={400}
				listBox={<ListBox />}
				noItemMessage={() => <div>No users found</div>}
				errorMessage={() => <div>Something went wrong</div>}
				apiPromise={apiPromise}
				data={filteredData}
				error={error}
				handleChange={handleChange}
			/>
		</div>
	);
}

export default App;

// //const [data, setData] = useState(null);
// 	const [error, setError] = useState(null);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await apiPromise();
// 				if (!response.ok) throw new Error(response.statusText);
// 				const data = await response.json();
// 				setData(data);
// 			} catch (e) {
// 				console.log(e);
// 				setError(e);
// 			}
// 		};

// 		setData(null);
// 		setError(null);

// 		fetchData();
// 	}, []);
