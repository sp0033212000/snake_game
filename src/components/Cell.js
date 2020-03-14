import React from "react";

const Cell = ({ active, food }) => {
	return (
		<div
			className={`cell ${active ? "active" : ""} ${food ? "food" : ""}`}
		></div>
	);
};

export default Cell;
