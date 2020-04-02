import createContextHelper from "./create.context.helper";

const initialState = {
	snake: [{ x: 6, y: 5 }],
	direct: "top",
	food: {},
	foodExsit: false,
	stop: true,
	relay: null,
	changeDirect: false
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case actionTypes.CHANGE_DIRECTION:
			return {
				...state,
				direct: payload,
				changeDirect: true
			};
		case actionTypes.MOVE:
			return {
				...state,
				snake: moveSnakeBody(state.snake, state.direct),
				changeDirect: false
			};
		case actionTypes.CREATE_FOOD:
			return {
				...state,
				food: randomFoodPosition(state.snake),
				foodExsit: true
			};
		case actionTypes.EAT_FOOD:
			return {
				...state,
				foodExsit: false,
				snake: [...state.snake, payload],
				food: {}
			};
		case actionTypes.STOP:
			return { ...state, relay: null, stop: true };
		case actionTypes.RESET:
			return { ...initialState };
		case actionTypes.START:
			return { ...initialState, relay: payload, stop: false };
		default:
			return state;
	}
};

const start = (dispatch) => () => {
	dispatch({
		type: actionTypes.START,
		payload: 150
	});
};

const move = (dispatch) => () => {
	dispatch({
		type: actionTypes.MOVE
	});
};

const changeDirection = (dispatch) => (direct) => {
	dispatch({
		type: actionTypes.CHANGE_DIRECTION,
		payload: direct
	});
};

const createFood = (dispatch) => () => {
	dispatch({
		type: actionTypes.CREATE_FOOD
	});
};

const eatFood = (dispatch) => (last_location) => {
	dispatch({
		type: actionTypes.EAT_FOOD,
		payload: last_location
	});
};

const setStop = (dispatch) => () => {
	dispatch({
		type: actionTypes.STOP
	});
};

const reset = (dispatch) => () => {
	dispatch({
		type: actionTypes.RESET
	});
};

export const { Context, Provider } = createContextHelper(
	reducer,
	{ changeDirection, move, createFood, eatFood, setStop, reset, start },
	initialState
);

const actionTypes = {
	MOVE: "MOVE",
	CHANGE_DIRECTION: "CHANGE_DIRECTION",
	CREATE_FOOD: "CREATE_FOOD",
	EAT_FOOD: "EAT_FOOD",
	STOP: "STOP",
	RESET: "RESET",
	START: "START"
};

const randomFoodPosition = (body) => {
	const x = Math.floor(Math.random() * 14);
	const y = Math.floor(Math.random() * 11);
	let food = { x, y };
	body.forEach((piece) => {
		if (piece.x === x && piece.y === y) {
			food = randomFoodPosition(body);
		}
	});

	return food;
};

const moveSnakeBody = (snake, direct) => {
	let head = { ...snake[0] };
	let body = [...snake];
	let { x, y } = head;
	switch (direct) {
		case "left":
			x--;
			break;
		case "right":
			x++;
			break;
		case "down":
			y++;
			break;
		case "top":
		default:
			y--;
			break;
	}

	body = [{ x, y }, ...body];
	body.pop();

	return body;
};
