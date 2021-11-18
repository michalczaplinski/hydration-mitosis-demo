import { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";

function MyComponent(props) {
	const state = useLocalObservable(() => ({ name: null }));

	useEffect(() => {
		state.name = props.username;
	}, [props.username]);

	return (
		<div>
			<input
				value={state.name}
				onChange={(event) => (state.name = event.target.value)}
			/>
			Hello
			{state.name}!
		</div>
	);
}

export default observer(MyComponent);
