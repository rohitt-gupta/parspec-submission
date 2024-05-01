export function findMatchingItems(query, items) {
	// Iterate through the items array
	for (let i = 0; i < items.length; i++) {
		// Check if the query matches the current item
		if (items[i].toLowerCase().includes(query)) {
			// If a match is found, return true
			return true;
		}
	}

	// If no match is found, return false
	return false;
}
