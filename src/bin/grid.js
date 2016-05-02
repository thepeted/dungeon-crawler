export default (height = 0, width = 0) => {
	const grid = [];
	for (let i = 0; i < height; i++) {
		grid.push([]);
		for (let j = 0; j < width; j++) {
			grid[i].push(0);
		}
	}
	return grid;
};
