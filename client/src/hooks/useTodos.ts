import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import apiService from "../service/apiService";

export const useTodos = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () => apiService.getAllTodos(),
  });

  const addTodoMutation = useMutation({
    mutationFn: (name: string) => apiService.addTodo({ name, status: "pending" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodo("");
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, name, status }: { id: number; name?: string; status?: string }) =>
      apiService.updateTodo(id, { name, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setEditingId(null);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => apiService.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodoMutation.mutate(newTodo.trim());
    }
  };

  const handleEditSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (editName.trim()) {
      updateTodoMutation.mutate({ id, name: editName.trim() });
    }
  };

  const toggleTodo = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    updateTodoMutation.mutate({ id, status: newStatus });
  };

  const startEditing = (id: number, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  return {
    todos,
    isLoading,
    newTodo,
    setNewTodo,
    editingId,
    editName,
    setEditName,
    isAdding: addTodoMutation.isPending,
    handleAddSubmit,
    handleEditSubmit,
    toggleTodo,
    startEditing,
    cancelEditing,
    deleteTodo: (id: number) => deleteTodoMutation.mutate(id),
  };
};
