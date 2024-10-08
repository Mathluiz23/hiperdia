import React, { useRef, useState, useEffect } from 'react';
import Usuario from './components/Usuario';
import FormMedicao from './components/FormMedicao';
import TabelaMedicoes from './components/TabelaMedicoes';
import GraficoMedicoes from './components/GraficoMedicoes';
import BotoesAcao from './components/BotoesAcao';
import { salvarMedicoes, exportarRelatorio } from './services/api';
import { RiHeartPulseLine } from 'react-icons/ri';


interface Medicao {
  data: string;
  resultado: string;
  periodo: 'Manhã' | 'Tarde' | 'Noite';
  horario: string;
}

const App: React.FC = () => {
  const [medicoes, setMedicoes] = useState<Medicao[]>([]);
  const [usuario, setUsuario] = useState({ nome: '', idade: '', medicamentos: '' });
  const [medicaoEditando, setMedicaoEditando] = useState<{ index: number; medicao: Medicao } | null>(null);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const tabelaRef = useRef<HTMLDivElement>(null);
  const graficoRef = useRef<HTMLDivElement>(null);

  // Carregar dados do localStorage ao montar o componente
  useEffect(() => {
    const medicoesSalvas = localStorage.getItem('medicoes');
    if (medicoesSalvas) {
      const medicoesParseadas = JSON.parse(medicoesSalvas);
      console.log('Medições carregadas:', medicoesParseadas);
      setMedicoes(medicoesParseadas);
    }
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      const usuarioParseado = JSON.parse(usuarioSalvo);
      console.log('Usuário carregado:', usuarioParseado);
      setUsuario(usuarioParseado);
    }
    setDadosCarregados(true);
  }, []);

  // Salvar as medições no localStorage sempre que elas mudarem, após os dados serem carregados
  useEffect(() => {
    if (dadosCarregados) {
      console.log('Salvando medições no localStorage:', medicoes);
      localStorage.setItem('medicoes', JSON.stringify(medicoes));
    }
  }, [medicoes, dadosCarregados]);

  // Salvar o usuário no localStorage sempre que ele mudar, após os dados serem carregados
  useEffect(() => {
    if (dadosCarregados) {
      console.log('Salvando usuário no localStorage:', usuario);
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }, [usuario, dadosCarregados]);

  const adicionarMedicao = (medicao: Medicao) => {
    if (medicaoEditando) {
      const novasMedicoes = [...medicoes];
      novasMedicoes[medicaoEditando.index] = medicao;
      setMedicoes(novasMedicoes);
      setMedicaoEditando(null);
    } else {
      setMedicoes([...medicoes, medicao]);
    }
  };

  const editarMedicao = (index: number) => {
    setMedicaoEditando({ index, medicao: medicoes[index] });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deletarMedicao = (index: number) => {
    setMedicoes(medicoes.filter((_, i) => i !== index));
  };

  const deletarTodasMedicoes = () => {
    setMedicoes([]);
    localStorage.removeItem('medicoes');
  };

  const handleExportarPDF = async () => {
    try {
      if (!headerRef.current || !tabelaRef.current || !graficoRef.current) {
        console.error('HeaderElement, TabelaElement ou GraficoElement é nulo.');
        return;
      }
      await exportarRelatorio(usuario, headerRef.current, tabelaRef.current, graficoRef.current);
    } catch (error) {
      console.error('Erro ao exportar o PDF:', error);
    }
  };

  const handleUsuarioChange = (dados: { nome: string; idade: string; medicamentos: string }) => {
    setUsuario(dados);
  };

  const salvarNoBanco = async () => {
    try {
      const dados = {
        usuario: {
          nome: usuario.nome,
          idade: usuario.idade,
          medicamentos: usuario.medicamentos,
        },
        medicoes: medicoes.map(medicao => {
          const [pressaoSistolica, pressaoDiastolica] = medicao.resultado.split('x').map(Number);  // Separar a pressão sistólica e diastólica
          
          return {
            data: medicao.data,
            horario: medicao.horario,
            pressaoSistolica,
            pressaoDiastolica,
            periodo: medicao.periodo,
          };
        }),
      };
  
      await salvarMedicoes(dados);  // Chama o serviço que faz a requisição para o backend
      alert('Dados salvos no banco de dados com sucesso!');
    } catch (error: any) {  // Certifique-se de que o error está tipado como 'any' aqui para poder acessar suas propriedades
      if (error.response?.status === 409) {
        alert('Essa medição já foi registrada anteriormente.');
      } else if (error.response) {
        alert(`Erro ao salvar dados: ${error.response.data.message}`);
      } else {
        alert('Erro desconhecido ao salvar dados.');
      }
    }
  };
  
  
  
  
  

  return (
    <div className="container mx-auto p-4">
      <header ref={headerRef} className="flex flex-col items-center mb-8">
        <div className="flex items-center space-x-3">
          <RiHeartPulseLine className="text-red-500 animate-pulse" size={48} />
          <h1 className="text-4xl font-bold text-gray-800">Hiperdia</h1>
        </div>
        <p className="text-gray-600 mt-2 text-center">
          Monitoramento de Pressão Arterial e Saúde
        </p>
      </header>
      <div className="flex flex-col md:flex-row md:justify-center md:space-x-4">
        <Usuario onDadosChange={handleUsuarioChange} />
        <FormMedicao adicionarMedicao={adicionarMedicao} medicaoEditando={medicaoEditando?.medicao} />
      </div>
      <TabelaMedicoes
        medicoes={medicoes}
        editarMedicao={editarMedicao}
        deletarMedicao={deletarMedicao}
        ref={tabelaRef}
      />
      {medicoes.length > 0 && (
        <GraficoMedicoes medicoes={medicoes} ref={graficoRef} />
      )}
      <div className="flex justify-between items-center mt-12 mb-5 ">
        <button
          onClick={deletarTodasMedicoes}
          className="bg-red-500 text-white font-semibold py-2 px-6 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Deletar Todos
        </button>
        <BotoesAcao
          exportarRelatorio={handleExportarPDF}
          salvarNoBanco={salvarNoBanco}
          hasMedicoes={medicoes.length > 0}
        />
      </div>
    </div>
  );
};

export default App;
