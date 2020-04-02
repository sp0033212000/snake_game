import React, { useContext, useMemo } from "react";
import { Context as SnakeContext } from "../context/SnakeContext";
import Cell from "./Cell";

const Row = ({ yaxis }) => {
	const {
		state: { snake, food }
	} = useContext(SnakeContext);

	const row = useMemo(() => {
		return [...Array(14)].map((v, i) => {
			let active = false;
			let _food = false;
			snake.forEach((piece) => {
				if (piece.x === i && piece.y === yaxis) {
					active = true;
				}
			});
			if (food.x === i && food.y === yaxis) {
				_food = true;
			}
			return <Cell key={i} food={_food} active={active} />;
		});
	}, [snake, food]);

	return <div className="row">{row}</div>;
};

export default React.memo(Row, (prev, next) => {
	console.log("prev", prev);
	console.log("next", next);
});
