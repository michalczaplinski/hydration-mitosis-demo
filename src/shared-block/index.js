import { useState, Show, For } from "@builder.io/mitosis";

export default function TodoList(props) {
	const state = useState({
		newItem: { name: "", done: false },
		list: [],
		addItem() {
			state.list = [...state.list, state.newItem];
			state.newItem = { name: "", done: false };
		},
		toggleDoneState(i) {
			state.list[i].done = !state.list[i].done;
		},
	});

	onMount(() => {
		state.list = props.todos;
	});

	return (
		<div>
			<h3> {props.listName} </h3>
			<input
				value={state.newItem.name}
				onChange={(event) => (state.newItem.name = event.target.value)}
			/>
			<button css={{ marginLeft: "10px" }} onClick={() => state.addItem()}>
				Add todo
			</button>
			<div css={{ padding: "10px" }}>
				<For each={state.list.slice(0, props.maxTodos)}>
					{(item, i) => (
						<>
							<Show when={item.done && props.showDone}>
								<div>
									<input
										type="checkbox"
										checked={item.done}
										onClick={() => toggleDoneState(i)}
										css={{ marginRight: "10px", verticalAlign: "text-bottom" }}
									/>
									<s>{item.name}</s>
								</div>
							</Show>
							<Show when={!item.done}>
								<div>
									<input
										type="checkbox"
										checked={item.done}
										onClick={() => toggleDoneState(i)}
										css={{ marginRight: "10px", verticalAlign: "text-bottom" }}
									/>
									<span>{item.name}</span>
								</div>
							</Show>
						</>
					)}
				</For>
				<Show when={state.list.length > props.maxTodos}>
					<div> There are more todos... </div>
				</Show>
			</div>
		</div>
	);
}
