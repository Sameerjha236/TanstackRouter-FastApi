import { createLazyFileRoute, Link } from "@tanstack/react-router";

import apiService from "../../service/apiService";
import { useQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/todos/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => apiService.getTodoById(id),
  });

  if (isLoading) return <div className="loading">Loading task details...</div>;

  const todo = data;

  return (
    <div className="todo-container">
      <Link to="/todos" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Tasks
      </Link>
      
      <div className="todo-header">
        <h1 className="todo-title">Task Details</h1>
      </div>

      {todo ? (
        <div style={{ background: 'var(--bg-color)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>#{todo.id}</div>
            <div style={{ padding: '0.5rem 1rem', borderRadius: '2rem', background: todo.status === 'completed' ? 'var(--success-color)' : 'var(--primary-color)', color: 'white', fontWeight: 'bold', fontSize: '0.875rem', textTransform: 'uppercase' }}>
              {todo.status}
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>{todo.name}</h2>
        </div>
      ) : (
        <div className="empty-state">
          <p>Task not found.</p>
        </div>
      )}
    </div>
  );
}
