import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface Medicao {
  data: string;
  resultado: string;
  periodo: 'Manhã' | 'Tarde' | 'Noite';
  horario: string;
}

export const exportarRelatorio = async (
  dadosUsuario: { nome: string; idade: string; medicamentos: string },
  headerElement: HTMLDivElement,
  tabelaElement: HTMLDivElement,
  graficoElement: HTMLDivElement
) => {
  if (headerElement && tabelaElement && graficoElement) {
    console.log('Iniciando exportação do PDF...');
    await new Promise((resolve) => setTimeout(resolve, 500)); // Aguarda renderização

    const headerCanvas = await html2canvas(headerElement, { useCORS: true, scale: 2 });
    const headerImgData = headerCanvas.toDataURL('image/png');

    const tabelaCanvas = await html2canvas(tabelaElement, { useCORS: true, scale: 2 });
    const tabelaImgData = tabelaCanvas.toDataURL('image/png');

    const graficoCanvas = await html2canvas(graficoElement, { useCORS: true, scale: 2 });
    const graficoImgData = graficoCanvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 297;

    // Ajusta a altura da imagem do cabeçalho 
    const headerWidth = headerCanvas.width;
    const headerHeight = headerCanvas.height;
    const headerRatio = headerHeight / headerWidth;
    const headerImgWidth = 220;
    const headerImgHeight = headerImgWidth  * headerRatio + 10;

    const headerX = imgWidth - headerImgWidth + 4;
    const headerY = 5;

    pdf.addImage(headerImgData, 'PNG', headerX, headerY, headerImgWidth, headerImgHeight, undefined, 'FAST');

    let contentY = headerY + headerImgHeight + 14;

    const marginLeft = 10;
    const marginRight = 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - marginLeft - marginRight;

    pdf.setFontSize(14);
    pdf.text('Relatório de Medições', marginLeft - 2, contentY, { maxWidth: maxLineWidth });
    contentY += 10;

    pdf.setFontSize(12);
    pdf.text(`Nome: ${dadosUsuario.nome}`, 8, contentY);
    contentY += 10;
    pdf.text(`Idade: ${dadosUsuario.idade}`, 8, contentY);
    contentY += 10;
    pdf.text(`Medicamentos: ${dadosUsuario.medicamentos}`, 8, contentY);
    contentY += 10;

    const tabelaHeight = (tabelaCanvas.height * imgWidth) / tabelaCanvas.width + 10;
    const graficoHeight = (graficoCanvas.height * imgWidth) / graficoCanvas.width + 20;

    pdf.addImage(tabelaImgData, 'PNG', 0, contentY, imgWidth, tabelaHeight, undefined, 'FAST');
    contentY += tabelaHeight + 10;

    // adicona nova página se necessário
    if (contentY + graficoHeight > pageHeight) {
      pdf.addPage();
      contentY = 10;
    }

    pdf.addImage(graficoImgData, 'PNG', 0, contentY, imgWidth, graficoHeight, undefined, 'FAST');

    pdf.save('hiperdia_relatorio.pdf');
  } else {
    console.error('HeaderElement, TabelaElement ou GraficoElement é nulo.');
  }
};

export const salvarMedicoes = async (dados: { usuario: any; medicoes: any[] }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/medicoes', dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar dados na API:', error);
    throw error;
  }
};
