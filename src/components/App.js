import React, { useContext } from "react";
import { Context as SnakeContext } from "../context/SnakeContext";
import "./css/style.css";
import Container from "./Container";
import Row from "./Row";

const App = () => {
	const {
		state: { stop },
		reset
	} = useContext(SnakeContext);

	const uiResetBtn = () => {
		return (
			<div className="die">
				<div>
					<div className="die-title">You Dead</div>
					<button onClick={reset} className="die-btn">
						Reset
					</button>
				</div>
			</div>
		);
	};

	return (
		<Container>
			{stop && uiResetBtn()}
			{[...Array(11)].map((v, i) => (
				<Row key={i} yaxis={i} />
			))}
		</Container>
	);
};

export default App;
