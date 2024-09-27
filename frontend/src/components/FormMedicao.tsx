import React, { useState, useEffect } from 'react';

interface Medicao {
  data: string;
  resultado: string;
  periodo: 'Manhã' | 'Tarde' | 'Noite';
  horario: string;
}

interface FormMedicaoProps {
  adicionarMedicao: (medicao: Medicao) => void;
  medicaoEditando?: Medicao;
}

const FormMedicao: React.FC<FormMedicaoProps> = ({ adicionarMedicao, medicaoEditando }) => {
  const [data, setData] = useState('');
  const [resultado, setResultado] = useState('');
  const [periodo, setPeriodo] = useState<'Manhã' | 'Tarde' | 'Noite'>('Manhã');
  const [horario, setHorario] = useState('');

  useEffect(() => {
    if (horario) {
      const hora = parseInt(horario.split(':')[0], 10);
      if (hora >= 5 && hora < 12) {
        setPeriodo('Manhã');
      } else if (hora >= 12 && hora < 18) {
        setPeriodo('Tarde');
      } else {
        setPeriodo('Noite');
      }
    }
  }, [horario]);

  useEffect(() => {
    if (medicaoEditando) {
      setData(medicaoEditando.data);
      setResultado(medicaoEditando.resultado);
      setHorario(medicaoEditando.horario);
      setPeriodo(medicaoEditando.periodo);
    } else {
      setData('');
      setResultado('');
      setHorario('');
      setPeriodo('Manhã');
    }
  }, [medicaoEditando]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!data || !resultado || !horario) {
      alert('Preencha todos os campos');
      return;
    }

    const regex = /^\d{1,3}x\d{1,3}$/;
    if (!regex.test(resultado)) {
      alert('Formato incorreto (ex: 120x80).');
      return;
    }

    const novaMedicao: Medicao = { data, resultado, periodo, horario };
    adicionarMedicao(novaMedicao);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 p-4 bg-white border border-gray-200 rounded-lg shadow-md max-w-md"
    >
      <h2 className="mt-2 text-lg font-bold mb-4">
        {medicaoEditando ? 'Editar Medição' : 'Adicionar Medição'}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-md font-semibold">Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>
        <div>
          <label className="block mb-1 text-md font-semibold">Horário:</label>
          <input
            type="time"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>
        <div>
          <label className="block mb-1 text-md font-semibold">Resultado:</label>
          <input
            type="text"
            value={resultado}
            onChange={(e) => setResultado(e.target.value)}
            placeholder="Ex: 120x80"
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>
        <div>
          <label className="block mb-1 text-md font-semibold">Período:</label>
          <input
            type="text"
            value={periodo}
            disabled
            className="border border-gray-300 rounded-md p-2 w-full bg-gray-100 text-sm"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white font-bold py-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      >
        {medicaoEditando ? 'Atualizar Medição' : 'Adicionar Medição'}
      </button>
    </form>
  );
};

export default FormMedicao;
