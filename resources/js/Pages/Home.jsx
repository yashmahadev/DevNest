
import MainLayout from '@/components/Layout/MainLayout';

export default function Home() {
  return (
      <MainLayout title="Home">
        <h1 className="text-3xl font-bold mb-4">Welcome to {import.meta.env.VITE_APP_NAME}</h1>
        <p>Choose a tool from the sidebar.</p>
      </MainLayout>
  );
}
