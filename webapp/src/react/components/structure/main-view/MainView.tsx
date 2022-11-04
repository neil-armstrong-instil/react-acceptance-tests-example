import "./MainView.scss";
import type {FC} from "react";
import React, {useCallback, useState} from "react";
import type {Todo} from "@src/react/components/structure/main-view/components/todos/components/todo-card/types/Todo";
import {Todos} from "@src/react/components/structure/main-view/components/todos/Todos";
import type {OnTodoChanged, OnTodoDeleted} from "@src/react/components/structure/main-view/components/todos/types/Callbacks";
import {Toolbar} from "@src/react/components/structure/main-view/components/toolbar/Toolbar";

export const MainView: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((): void => {
    setTodos([...todos, {
      textContent: "New todo!"
    }]);
  }, [todos]);

  const onTodoChanged: OnTodoChanged = useCallback((updatedTodo: Todo, indexToUpdate: number): void => {
    setTodos(todos.map((todo, index) => {
      if (index !== indexToUpdate) return todo;

      return updatedTodo;
    }));
  }, [todos]);

  const onDelete: OnTodoDeleted = useCallback((indexToDelete: number): void => {
    setTodos(todos.filter((todo, index) => {
      return index !== indexToDelete;
    }));
  }, [todos]);

  return (
    <div className="mainView">
      <Toolbar
        onTodoAdded={addTodo}
      />

      <Todos
        todos={todos}
        onTodosChanged={setTodos}
        onTodoChanged={onTodoChanged}
        onDelete={onDelete}
      />
    </div>
  );
};
