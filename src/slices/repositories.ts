import axios from "axios";
import { Dispatch } from "redux";

type RepositoriesState = {
	loading: boolean;
	error: string | null;
	data: string[];
};

enum ActionType {
	SEARCH_REPOSOTORIES = "search_repositories",
	SEARCH_REPOSOTORIES_SUCCESS = "search_repositories_success",
	SEARCH_REPOSOTORIES_FAIL = "search_repositories_fail",
}

type SearchRepositoriesAction = {
	type: ActionType.SEARCH_REPOSOTORIES;
};
type SearchRepositoriesSuccessAction = {
	type: ActionType.SEARCH_REPOSOTORIES_SUCCESS;
	payload: {
		data: string[];
	};
};
type SearchRepositoriesFailAction = {
	type: ActionType.SEARCH_REPOSOTORIES_FAIL;
	payload: {
		error: string;
	};
};

type Action =
	| SearchRepositoriesAction
	| SearchRepositoriesSuccessAction
	| SearchRepositoriesFailAction;

const initialState = {
	loading: false,
	error: null,
	data: [],
};

function searchRepositories(term: string) {
	return async function (dispatch: Dispatch<Action>) {
		dispatch({ type: ActionType.SEARCH_REPOSOTORIES });
		try {
			const { data } = await axios.get(
				"https://registry.npmjs.org/-/v1/search",
				{
					params: {
						text: term,
					},
				}
			);
			const names = data.objects.map((el: any) => {
				return el.package.name;
			});
			dispatch({
				type: ActionType.SEARCH_REPOSOTORIES_SUCCESS,
				payload: { data: names },
			});
		} catch (err) {
			dispatch({
				type: ActionType.SEARCH_REPOSOTORIES_FAIL,
				payload: { error: err.message },
			});
		}
	};
}

function reducer(
	state: RepositoriesState = initialState,
	action: Action
): RepositoriesState {
	if (action.type === ActionType.SEARCH_REPOSOTORIES)
		return { ...state, loading: true };
	if (action.type === ActionType.SEARCH_REPOSOTORIES_SUCCESS)
		return { ...state, loading: false, error: null, data: action.payload.data };
	if (action.type === ActionType.SEARCH_REPOSOTORIES_FAIL)
		return {
			...state,
			loading: false,
			error: action.payload.error,
		};
	return state;
}

export { searchRepositories };
export default reducer;
