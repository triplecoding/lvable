import { CalculatorRenderer } from '@/components/CalculatorRenderer';
import { api } from '@/lib/api';

export default async function CalculatorsPage() {
  const calculators = await api.getCalculators();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Calculators</h1>
      <p className="text-slate-600">Dynamic calculator interface rendered from backend JSON definitions.</p>
      <CalculatorRenderer calculators={calculators} />
    </div>
  );
}
