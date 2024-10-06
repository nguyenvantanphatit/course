import Dashboard from '@/components/Dashboard';

export default function ProgressPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Progress</h1>
      {Dashboard ? <Dashboard /> : <div>Loading...</div>}
    </div>
  )
}