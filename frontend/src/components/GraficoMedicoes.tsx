import React, { forwardRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Medicao {
  data: string;
  resultado: string;
}

interface GraficoMedicoesProps {
  medicoes: Medicao[];
}

const GraficoMedicoes = forwardRef<HTMLDivElement, GraficoMedicoesProps>(({ medicoes }, ref) => {
  const datas = medicoes.map((medicao) => medicao.data);
  const sistolica = medicoes.map((medicao) => parseInt(medicao.resultado.split('x')[0]));
  const diastolica = medicoes.map((medicao) => parseInt(medicao.resultado.split('x')[1]));

  const data = {
    labels: datas,
    datasets: [
      {
        label: 'Sistólica',
        data: sistolica,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Diastólica',
        data: diastolica,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div ref={ref} className="my-8 flex justify-center">
      <div className="w-full max-w-6xl">
        <Line data={data} options={options} />
      </div>
    </div>
  );
});

export default GraficoMedicoes;
