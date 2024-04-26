import { UPDATE_WINNER } from "../actions/actions";

const initialState = {
	winner: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_WINNER:
			return {
				...state,
				winner: action.payload
			};
		default:
			return state;
	}
}

export default reducer;
