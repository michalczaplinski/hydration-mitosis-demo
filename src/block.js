import { useContext, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { observer, useLocalObservable } from "mobx-react-lite";

function TodoList(props) {
  const state = useLocalObservable(() => ({
    newItem: { name: "", done: false },
    todos: [],
    addItem() {
      state.todos = [...state.todos, state.newItem];
      state.newItem = {
        name: "",
        done: false,
      };
    },
    toggleDoneState(i) {
      state.todos[i].done = !state.todos[i].done;
    },
  }));

  useEffect(() => {
    state.todos = props.todos.slice(0, props.maxTodos);
  }, []);

  return (
    <div>
      <h3>{props.listName}</h3>

      <input
        value={state.newItem.name}
        onChange={(event) => (state.newItem.name = event.target.value)}
      />

      <button
        css={{
          marginLeft: "10px",
        }}
        onClick={(event) => state.addItem()}
      >
        Add todo
      </button>

      <div
        css={{
          padding: "10px",
        }}
      >
        {state.todos?.map((item, i) => (
          <>
            {item.done && props.showDone ? (
              <>
                <div>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onClick={(event) => state.toggleDoneState(i)}
                    css={{
                      marginRight: "10px",
                      verticalAlign: "text-bottom",
                    }}
                  />

                  <s>{item.name}</s>
                </div>
              </>
            ) : null}

            {!item.done ? (
              <>
                <div>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onClick={(event) => state.toggleDoneState(i)}
                    css={{
                      marginRight: "10px",
                      verticalAlign: "text-bottom",
                    }}
                  />

                  <span>{item.name}</span>
                </div>
              </>
            ) : null}
          </>
        ))}

        {state.todos.length > props.maxTodos ? (
          <>
            <div> There are more todos... </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
export default observer(TodoList);
