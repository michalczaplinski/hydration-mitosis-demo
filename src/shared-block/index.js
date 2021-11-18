import { useState, onMount } from "@builder.io/mitosis";

export default function MyComponent(props) {
	const [name, setName] = useState(null);

	onMount(() => {
		state.name = props.username;
	});

	return (
		<div>
			<input value={name} onChange={(event) => setName(event.target.value)} />
			Hello {name}!
		</div>
	);
}
