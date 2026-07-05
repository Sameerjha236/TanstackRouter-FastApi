import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useTodos } from "../../../hooks/useTodos";

export const Route = createLazyFileRoute("/_authenticated/todos/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    todos,
    isLoading,
    newTodo,
    setNewTodo,
    editingId,
    editName,
    setEditName,
    isAdding,
    handleAddSubmit,
    handleEditSubmit,
    toggleTodo,
    startEditing,
    cancelEditing,
    deleteTodo,
  } = useTodos();

  return (
    <div className="layout-container">
      <div className="layout-left">
        <div className="todo-header" style={{ textAlign: "left" }}>
          <h1 className="todo-title">My Tasks</h1>
        </div>

        {isLoading ? (
          <div className="loading">Loading your tasks...</div>
        ) : todos?.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: "3rem" }}>✨</div>
            <p>No tasks yet. Add one from the right panel!</p>
          </div>
        ) : (
          <ul className="todo-list">
            {todos?.map((todo: any) => (
              <li key={todo.id} className={`todo-item ${todo.status === 'completed' ? 'completed' : ''}`}>
                {editingId === todo.id ? (
                  <form 
                    className="edit-form" 
                    onSubmit={(e) => handleEditSubmit(e, todo.id)}
                  >
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="edit-input"
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button type="submit" className="action-btn success" title="Save">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </button>
                      <button type="button" className="action-btn danger" onClick={cancelEditing} title="Cancel">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="todo-content">
                      <input
                        type="checkbox"
                        className="todo-checkbox"
                        checked={todo.status === "completed"}
                        onChange={() => toggleTodo(todo.id, todo.status)}
                      />
                      <Link to="/todos/$id" params={{ id: todo.id.toString() }} className="todo-text">
                        {todo.name}
                      </Link>
                    </div>
                    <div className="todo-actions">
                      <button
                        type="button"
                        className="action-btn edit"
                        onClick={() => startEditing(todo.id, todo.name)}
                        title="Edit Task"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button
                        type="button"
                        className="action-btn delete"
                        onClick={() => deleteTodo(todo.id)}
                        title="Delete Task"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="layout-right">
        <div className="add-todo-card">
          <h2>Create New Task</h2>
          <form onSubmit={handleAddSubmit} className="todo-form-vertical">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <button 
              type="submit" 
              className="todo-button"
              disabled={isAdding || !newTodo.trim()}
              style={{ padding: '1rem' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
