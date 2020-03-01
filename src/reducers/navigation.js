import { TOGGLE_SIDEBAR, OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../actions/navigation";

const initialState = {
	sidebarOpened: false,
	sidebarStatic: false,
};

export default function navigation(state = initialState, action) {
	switch (action.type) {
	case TOGGLE_SIDEBAR:

		state.sidebarOpened = !state.sidebarOpened;

		return {
			...state,
			// sidebarOpened: !state.sidebarOpened,
		};
	case OPEN_SIDEBAR:
		return {
			...state,
			sidebarOpened: true,
		};
	case CLOSE_SIDEBAR:
		return {
			...state,
			sidebarOpened: false,
		};
	default:
		return state;
	}
}
