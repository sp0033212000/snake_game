import React, { createContext, useReducer, useMemo } from "react";

export default (reducer, actions, initialState) => {
	const Context = createContext();

	const Provider = ({ children }) => {
		const [state, dispatch] = useReducer(reducer, initialState);

		const boundActions = useMemo(() => {
			const actionsObject = {};
			Object.keys(actions).forEach((key) => {
				actionsObject[key] = actions[key](dispatch);
			});
			return actionsObject;
		}, []);

		return (
			<Context.Provider value={{ state, ...boundActions }}>
				{children}
			</Context.Provider>
		);
	};

	return { Context, Provider };
};
