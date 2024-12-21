"use client";

import { useEffect, useState } from "react";
import { Plus, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TodoItem from "@/components/TodoItem";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [todo, ...prev]);
    setNewTodo("");
    toast.success("Todo added successfully");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    toast.success("Todo updated successfully");
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    toast.error("Todo deleted");
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
    toast.success("Todo list reordered");
  };

  const activeTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center justify-between">
          <span>My Todo List</span>
          <span className="text-sm font-normal">
            {activeTodos} active {activeTodos === 1 ? "task" : "tasks"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1"
          />
          <Button type="submit" size={"icon"}>
            <Plus className="size-4" />
          </Button>
        </form>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {todos.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    No todos yet. Add one above!
                  </p>
                ) : (
                  todos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <TodoItem
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                            onEdit={editTodo}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {todos.length > 1 && (
          <p className="text-xs text-muted-foreground mt-3">
            Drag and drop to reorder todos
          </p>
        )}
      </CardContent>
    </Card>
  );
}
