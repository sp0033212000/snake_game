import React, { useRef, useEffect } from "react";

const useInterval = (cb, delay) => {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = cb;
	}, [cb]);

	useEffect(() => {
		function tick() {
			savedCallback.current();
		}

		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
};

export default useInterval;
