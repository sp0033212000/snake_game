import React, { useContext } from "react";
import { Context as SnakeContext } from "../context/SnakeContext";
import "../css/style.css";
import Container from "./Container";
import Row from "./Row";

const App = () => {
	const {
		state: { relay },
		start
	} = useContext(SnakeContext);

	const uiResetBtn = () => {
		return (
			<div className="die">
				<div>
					<div className="die-title">Start Game</div>
					<button onClick={start} className="die-btn">
						Start
					</button>
				</div>
			</div>
		);
	};

	return (
		<Container>
			{relay === null && uiResetBtn()}
			{[...Array(11)].map((v, i) => (
				<Row key={i} yaxis={i} />
			))}
		</Container>
	);
};

export default App;
