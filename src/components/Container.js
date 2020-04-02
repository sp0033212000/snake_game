import React, { useContext, useEffect } from "react";
import { Context as SnakeContext } from "../context/SnakeContext";
import useInterval from "../hooks/useInterval";
import _ from "lodash";

let LAST_LOCATION = {};

const Container = ({ children }) => {
	const {
		state: { direct, snake, foodExsit, food, relay, changeDirect },
		changeDirection,
		move,
		createFood,
		eatFood,
		setStop,
		start
	} = useContext(SnakeContext);

	useEffect(() => {
		document.addEventListener("keydown", onKeyDownHandler);
		return () => {
			document.removeEventListener("keydown", onKeyDownHandler);
		};
	}, [direct, changeDirect, relay]);

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

		if (keyCode === 13 && relay === null) {
			start();
		}

		if (
			directObj[keyCode] !== direct &&
			keyCode >= 37 &&
			keyCode <= 40 &&
			!changeDirect
		) {
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

	useInterval(move, relay);

	return (
		<div className="body">
			<div className="container">
				<div className="score">Your Score: {snake.length - 1}</div>
				{children}
			</div>
		</div>
	);
};

export default Container;
