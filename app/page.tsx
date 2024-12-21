import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <TodoList />
        <p className='text-center text-muted-foreground text-xs mt-3'>Amiul Amruh | © 2024</p>
      </div>
    </main>
  );
}