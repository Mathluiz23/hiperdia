import React from 'react';

interface BotoesAcaoProps {
  exportarRelatorio: () => void;
  salvarNoBanco: () => void;
  hasMedicoes: boolean;
}

const BotoesAcao: React.FC<BotoesAcaoProps> = ({ exportarRelatorio, salvarNoBanco, hasMedicoes }) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={exportarRelatorio}
        className={`bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 ${
          !hasMedicoes ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!hasMedicoes}
      >
        Exportar PDF
      </button>
      <button
        onClick={salvarNoBanco}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
      >
        Salvar Dados
      </button>
    </div>
  );
};

export default BotoesAcao;
