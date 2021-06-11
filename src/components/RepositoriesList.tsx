import { useState } from "react";
import { useDispatch } from "react-redux";
import useTypedSelector from "../hooks/useTypedSelector";
import { searchRepositories } from "../slices/repositories";

function RepositoriesList(): React.ReactElement {
	const [term, setTerm] = useState("");
	const dispatch = useDispatch();
	const { data, loading, error } = useTypedSelector(
		(state) => state.repositories
	);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(searchRepositories(term));
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					value={term}
					onChange={(e) => setTerm(e.target.value)}
				/>
				<button>Search</button>
			</form>
			{loading ? (
				<h3>{loading}</h3>
			) : error ? (
				<h3>{error}</h3>
			) : (
				data.map((el, i) => <div key={i}>{el}</div>)
			)}
		</div>
	);
}

export default RepositoriesList;
