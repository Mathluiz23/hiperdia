import React, { useState, useEffect } from 'react';

interface UsuarioProps {
  onDadosChange: (dados: { nome: string; idade: string; medicamentos: string }) => void;
}

const Usuario: React.FC<UsuarioProps> = ({ onDadosChange }) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [medicamentos, setMedicamentos] = useState('');

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuario');
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      setNome(dados.nome);
      setIdade(dados.idade);
      setMedicamentos(dados.medicamentos);
      onDadosChange(dados); // Atualiza o estado com os dados salvos
    }
  }, []); 

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoNome = e.target.value;
    setNome(novoNome);
    onDadosChange({ nome: novoNome, idade, medicamentos });
  };

  const handleIdadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novaIdade = e.target.value;
    setIdade(novaIdade);
    onDadosChange({ nome, idade: novaIdade, medicamentos });
  };

  const handleMedicamentosChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const novosMedicamentos = e.target.value;
    setMedicamentos(novosMedicamentos);
    onDadosChange({ nome, idade, medicamentos: novosMedicamentos });
  };

  return (
    <form className="mb-10 p-4 bg-white border border-gray-200 rounded-lg shadow-md max-w-sm">
      <h2 className="mt-2 text-lg font-bold mb-4">Dados do Usuário</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Campo Nome  */}
        <div className="col-span-3 sm:col-span-2">
          <label htmlFor="nome" className="block mb-1 text-md font-semibold text-gray-700">
            Nome:
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={handleNomeChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>
        
        {/* Campo Idade */}
        <div className="col-span-3 sm:col-span-1">
          <label htmlFor="idade" className="block mb-1 text-md font-semibold text-gray-700">
            Idade:
          </label>
          <input
            id="idade"
            type="number"
            value={idade}
            onChange={handleIdadeChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        {/* Campo Medicamentos */}
        <div className="col-span-3">
          <label htmlFor="medicamentos" className="block mb-1 text-md font-semibold text-gray-700">
            Medicamentos:
          </label>
          <textarea
            id="medicamentos"
            value={medicamentos}
            onChange={handleMedicamentosChange}
            maxLength={200}
            rows={3}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
          ></textarea>
          <div className="text-right text-xs text-gray-500">{medicamentos.length}/200</div>
        </div>
      </div>
    </form>
  );
};

export default Usuario;
