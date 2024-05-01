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
		// console.log("query", query);
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
				styles={{
					label: "label",
					input: "input",
				}}
				listBox={<ListBox />}
				noItemMessage={() => (
					<div className='errorCard listBoxContainer'>No users found</div>
				)}
				errorMessage={() => (
					<div className='errorCard listBoxContainer'>Something went wrong</div>
				)}
				data={filteredData}
				error={error}
				handleChange={handleChange}
			/>
		</div>
	);
}

export default App;
