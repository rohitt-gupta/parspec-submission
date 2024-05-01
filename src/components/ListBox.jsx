/* eslint-disable react/prop-types */
import "./listbox.css";

const highlightQuery = (text, query) => {
	const regex = new RegExp(`(${query})`, "gi");
	return text.split(regex).map((part, index) =>
		part.toLowerCase() === query.toLowerCase() ? (
			<span key={index} className='highlight'>
				{part}
			</span>
		) : (
			<span key={index}>{part}</span>
		)
	);
};

const ListBox = ({
	data,
	activeIndex,
	setActiveIndex,
	query,
	resultContainer,
}) => {
	return (
		<ul className='listBoxContainer'>
			{data.map((individual, index) => {
				return (
					<li
						onMouseOver={() => setActiveIndex(index)}
						ref={index === activeIndex ? resultContainer : null}
						className={`${
							index === activeIndex ? "activeItem" : ""
						} listBoxItem`}
						key={individual.id}
					>
						<span className='eachitem idelement'>
							{highlightQuery(individual.id, query)}
						</span>
						<span className='eachitem itemName'>
							{highlightQuery(individual.name, query)}
						</span>
						{individual.items.some((item) =>
							item.toLowerCase().includes(query.toLowerCase())
						) && (
							<span className='bullet eachitem userItems'>
								<span style={{ color: "blue", fontWeight: "bold" }}>
									{query}{" "}
								</span>
								found in items
							</span>
						)}
						<span className='eachitem itemDetails'>
							{highlightQuery(individual.address, query)}
						</span>
						<span className='eachitem'>
							{highlightQuery(individual.pincode, query)}
						</span>
					</li>
				);
			})}
		</ul>
	);
};

export default ListBox;
