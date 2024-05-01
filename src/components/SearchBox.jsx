/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import ListBox from "./ListBox";
const SearchBox = ({
	id,
	name,
	label,
	placeholder,
	styles,
	noItemMessage,
	errorMessage,
	data,
	error,
	handleChange,
}) => {
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(null);
	const resultContainer = useRef(null);

	const nativeChangeHandler = (event) => {
		setQuery(event.target.value);
		handleChange(event.target.value.toLowerCase());
	};

	const handleKeyDown = (e) => {
		const { key } = e;
		let nextIndexCount = 0;

		// move down
		if (key === "ArrowDown") nextIndexCount = (activeIndex + 1) % data.length;

		// move up
		if (key === "ArrowUp")
			nextIndexCount = (activeIndex + data.length - 1) % data.length;

		setActiveIndex(nextIndexCount);
	};

	useEffect(() => {
		if (!resultContainer.current) return;

		resultContainer.current.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
		});
	}, [activeIndex]);

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
				onKeyDown={handleKeyDown}
			/>
			{data && data.length > 0 && (
				<ListBox
					data={data}
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
					query={query}
					resultContainer={resultContainer}
				/>
			)}
			{query !== "" && data && data.length === 0 && noItemMessage()}
			{error && errorMessage()}
		</div>
	);
};

export default SearchBox;
