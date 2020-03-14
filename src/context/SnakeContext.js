import createContextHelper from "./create.context.helper";

const initialState = {
	snake: [{ x: 6, y: 5 }],
	direct: "top",
	food: {},
	foodExsit: false,
	stop: false
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case actionTypes.CHANGE_DIRECTION:
			return { ...state, direct: payload };
		case actionTypes.MOVE:
			return { ...state, snake: payload };
		case actionTypes.CREATE_FOOD:
			return { ...state, ...payload };
		case actionTypes.EAT_FOOD:
			return { ...state, ...payload };
		case actionTypes.STOP:
			return { ...state, stop: true };
		case actionTypes.RESET:
			return { ...initialState };
		default:
			return state;
	}
};

const move = (dispatch, state) => () => {
	const { direct, snake } = state;
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
	dispatch({
		type: actionTypes.MOVE,
		payload: body
	});
};

const changeDirection = (dispatch) => (direct) => {
	dispatch({
		type: actionTypes.CHANGE_DIRECTION,
		payload: direct
	});
};

const createFood = (dispatch, state) => () => {
	const { snake } = state;
	const food = randomFoodPosition(snake);
	dispatch({
		type: actionTypes.CREATE_FOOD,
		payload: { food, foodExsit: true }
	});
};

const eatFood = (dispatch, state) => (last_location) => {
	const { snake } = state;
	const newSnake = [...snake, last_location];
	dispatch({
		type: actionTypes.EAT_FOOD,
		payload: { foodExsit: false, snake: newSnake, food: {} }
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
	{ changeDirection, move, createFood, eatFood, setStop, reset },
	initialState
);

const actionTypes = {
	MOVE: "MOVE",
	CHANGE_DIRECTION: "CHANGE_DIRECTION",
	CREATE_FOOD: "CREATE_FOOD",
	EAT_FOOD: "EAT_FOOD",
	STOP: "STOP",
	RESET: "RESET"
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
