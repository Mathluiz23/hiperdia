import React, { forwardRef } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';

interface Medicao {
  data: string;
  resultado: string;
  periodo: 'Manhã' | 'Tarde' | 'Noite';
  horario: string;
}

interface TabelaMedicoesProps {
  medicoes: Medicao[];
  editarMedicao: (index: number) => void;
  deletarMedicao: (index: number) => void;
}

const TabelaMedicoes = forwardRef<HTMLDivElement, TabelaMedicoesProps>(({
  medicoes,
  editarMedicao,
  deletarMedicao,
}, ref) => {
  return (
    <div ref={ref} className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Medições</h2>
      {medicoes.length === 0 ? (
      <div className="flex flex-col justify-center items-center h-60 bg-gray-50 border border-gray-200 rounded-lg shadow-inner">
      <AiOutlineClockCircle className="w-16 h-16 text-gray-400 mb-1 animate-bounce" />
      <p className="text-gray-600 text-lg font-medium">Ainda não há dados disponíveis.</p>
    </div>
     
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Resultado
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Período
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Horário
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {medicoes.map((medicao, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {medicao.data}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {medicao.resultado}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {medicao.periodo}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {medicao.horario}
                  </td>
                  <td className="px-4 py-3 text-center text-sm">
                    <button
                      onClick={() => editarMedicao(index)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deletarMedicao(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

export default TabelaMedicoes;



// import React, { forwardRef } from 'react';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// interface Medicao {
//   data: string;
//   resultado: string;
//   periodo: 'Manhã' | 'Tarde' | 'Noite';
//   horario: string;
// }

// interface TabelaMedicoesProps {
//   medicoes: Medicao[];
//   editarMedicao: (index: number) => void;
//   deletarMedicao: (index: number) => void;
//   deletarTodasMedicoes: () => void;
//   dadosUsuario: { nome: string; idade: string; medicamentos: string };
// }

// const TabelaMedicoes = forwardRef<HTMLDivElement, TabelaMedicoesProps>(({
//   medicoes,
//   editarMedicao,
//   deletarMedicao,
//   deletarTodasMedicoes,
// }, ref) => {
//   return (
//     <div ref={ref} className="my-8">
//       <h2 className="text-2xl font-bold mb-6 text-center">Medições</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 shadow-sm rounded-lg">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                 Data
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                 Resultado
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                 Período
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                 Horário
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                 Ações
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {medicoes.map((medicao, index) => (
//               <tr key={index} className="odd:bg-white even:bg-gray-50">
//                 <td className="px-4 py-3 text-center text-sm text-gray-700">
//                   {medicao.data}
//                 </td>
//                 <td className="px-4 py-3 text-center text-sm text-gray-700">
//                   {medicao.resultado}
//                 </td>
//                 <td className="px-4 py-3 text-center text-sm text-gray-700">
//                   {medicao.periodo}
//                 </td>
//                 <td className="px-4 py-3 text-center text-sm text-gray-700">
//                   {medicao.horario}
//                 </td>
//                 <td className="px-4 py-3 text-center text-sm">
//                   <button
//                     onClick={() => editarMedicao(index)}
//                     className="text-blue-500 hover:text-blue-700 mr-2"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => deletarMedicao(index)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <FaTrashAlt />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-6 flex justify-end">
//         <button
//           onClick={deletarTodasMedicoes}
//           className="bg-red-500 text-white font-semibold py-2 px-6 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
//         >
//           Deletar Todas as Medições
//         </button>
//       </div>
//     </div>
//   );
// });

// export default TabelaMedicoes;
