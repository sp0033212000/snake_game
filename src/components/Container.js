import React, { useContext, useEffect, useRef } from "react";
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
		start,
	} = useContext(SnakeContext);

	const ref = useRef();

	useEffect(() => {
		ref.current.focus();
	}, []);

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

		if (
			(keyCode === 13 && relay === null) ||
			(keyCode >= 37 && keyCode <= 40 && relay === null)
		) {
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
		<div className="body" ref={ref} tabIndex="0" onKeyDown={onKeyDownHandler}>
			<div className="container">
				<div className="content">
					<div className="score">Your Score: {snake.length - 1}</div>
					{children}
				</div>
			</div>
			<div className="controller">
				<div className="ctrl-container">
					<div
						onClick={() => onKeyDownHandler({ keyCode: 38 })}
						className="arrow-container top"
					>
						<div className="arrow" />
						<div className="arrow-root" />
					</div>
					<div
						onClick={() => onKeyDownHandler({ keyCode: 37 })}
						className="arrow-container left"
					>
						<div className="arrow" />
						<div className="arrow-root" />
					</div>
					<div
						onClick={() => onKeyDownHandler({ keyCode: 39 })}
						className="arrow-container right"
					>
						<div className="arrow" />
						<div className="arrow-root" />
					</div>
					<div
						onClick={() => onKeyDownHandler({ keyCode: 40 })}
						className="arrow-container bottom"
					>
						<div className="arrow" />
						<div className="arrow-root" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Container;
