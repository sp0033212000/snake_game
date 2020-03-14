import React, { useContext, useState, useEffect } from "react";
import { Context as SnakeContext } from "../context/SnakeContext";
import useInterval from "../hooks/useInterval";
import _ from "lodash";

let LAST_LOCATION = {};

const Container = ({ children }) => {
	const {
		state: { direct, snake, foodExsit, food, stop },
		changeDirection,
		move,
		createFood,
		eatFood,
		setStop,
		reset
	} = useContext(SnakeContext);

	useEffect(() => {
		const length = snake.length;
		if (
			snake[0].x < 0 ||
			snake[0].y < 0 ||
			snake[0].x > 13 ||
			snake[0].y > 10 ||
			(snake.length > 3 && _.findIndex(snake.slice(1), snake[0]) !== -1)
		) {
			setStop();
		}

		if (foodExsit) {
			if (snake[0].x === food.x && snake[0].y === food.y) {
				eatFood(LAST_LOCATION);
			}
		} else {
			createFood();
		}

		LAST_LOCATION = snake[length - 1];
	}, [snake, foodExsit]);

	const onKeyDownHandler = (e) => {
		const directObj = { 37: "left", 38: "top", 39: "right", 40: "down" };
		const { keyCode } = e;

		if (keyCode === 13) {
			reset();
		}

		if (directObj[keyCode] !== direct) {
			if (
				(direct === "left" && keyCode !== 39) ||
				(direct === "right" && keyCode !== 37) ||
				(direct === "top" && keyCode !== 40) ||
				(direct === "down" && keyCode !== 38)
			) {
				changeDirection(directObj[keyCode]);
			}
		}
	};

	useInterval(move, !stop ? 250 : null);

	return (
		<div tabIndex="0" onKeyDown={onKeyDownHandler} className="body">
			<div className="container">
				<div className="score">Your Score: {snake.length - 1}</div>
				{children}
			</div>
		</div>
	);
};

export default Container;
