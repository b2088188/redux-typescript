type RepositoriesState = {
	loading: boolean;
	error: string | null;
	data: string[];
};

function reducer(state: RepositoriesState, action: any) {
	if (action.type === "search_repositories") return { ...state, loading: true };
	if (action.type === "search_repositories_success")
		return { ...state, loading: false, error: null, data: action.payload.data };
	if (action.type === "search_repositories_fail")
		return {
			...state,
			loading: false,
			error: action.payload.error,
		};
	throw new Error(`The action type: ${action.type} doesn't exist.`);
}

export default reducer;
