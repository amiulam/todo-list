"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface EditTodoDialogProps {
  todo: {
    id: string;
    text: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, newText: string) => void;
}

export default function EditTodoDialog({ todo, open, onOpenChange, onSave }: EditTodoDialogProps) {
  const [editedText, setEditedText] = useState(todo.text);

  const handleSave = () => {
    if (editedText.trim()) {
      onSave(todo.id, editedText.trim());
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            placeholder="Edit your todo..."
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}