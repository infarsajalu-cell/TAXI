import VehicleShowcase from '@/components/VehicleShowcase';
import Navbar from '@/components/Navbar';

export default function VehiclesPage() {
  return (
    <main className="pt-20 min-h-screen">
      <Navbar />
      <VehicleShowcase />
    </main>
  );
}
