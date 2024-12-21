"use client";

import { useState } from "react";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import EditTodoDialog from "./EditTodoDialog";

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
    createdAt: string;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  dragHandleProps?: any;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit, dragHandleProps }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const formattedDate = new Date(todo.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <>
      <Card className="border border-border group">
        <CardContent className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing">
              <GripVertical className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo.id)}
            />
            <div className="flex-1">
              <p className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                {todo.text}
              </p>
              <p className="text-xs text-muted-foreground">{formattedDate}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="text-muted-foreground hover:text-primary"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(todo.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditTodoDialog
        todo={todo}
        open={isEditing}
        onOpenChange={setIsEditing}
        onSave={onEdit}
      />
    </>
  );
}