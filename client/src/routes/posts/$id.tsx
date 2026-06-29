import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const id = Number(params.id);

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  },
  pendingComponent: () => <div>Loading....</div>,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const data = Route.useLoaderData();
  return (
    <div>
      <div>ID: {id}</div>
      <div>Title: {data?.title}</div>
      <div>Body: {data?.body}</div>
    </div>
  );
}
