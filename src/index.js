import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider as SnakeProvider } from "./context/SnakeContext";

ReactDOM.render(
	<SnakeProvider>
		<App />
	</SnakeProvider>,
	document.querySelector("#root")
);
