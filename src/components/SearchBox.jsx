/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import ListBox from "./ListBox";
const SearchBox = ({
	id,
	name,
	label,
	placeholder,
	autoComplete,
	styles,
	listBox,
	noItemMessage,
	errorMessage,
	debounceWait,
	apiPromise,
	data,
	error,
	handleChange,
}) => {
	const [query, setQuery] = useState("");
	const [isAutoComplete, setIsAutoComplete] = useState(autoComplete);
	const [activeIndex, setActiveIndex] = useState(null);

	console.log("filteredData", data);

	const nativeChangeHandler = (event) => {
		setQuery(event.target.value);
		handleChange(event.target.value.toLowerCase());
	};

	return (
		<div className='search'>
			<label className={styles.label} htmlFor={name}>
				{label}
			</label>
			<br />
			<input
				name={name}
				className={styles.input}
				id={id}
				value={query}
				onChange={nativeChangeHandler}
				placeholder={placeholder}
				autoComplete='off'
				// onKeyUp={handleKeyUp}
			/>
			{data && data.length > 0 && (
				<ListBox
					// handleKeyUp={handleKeyUp}
					data={data}
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
					query={query}
				/>
			)}
			{query !== "" && data && data.length === 0 && noItemMessage()}
			{error && errorMessage()}
		</div>
	);
};

export default SearchBox;
