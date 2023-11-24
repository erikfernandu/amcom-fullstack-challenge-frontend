export const formatarValor = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

export const formatarDataEHora = (dataEHora) => {
  if (!dataEHora) return '';
  const [data, hora] = dataEHora.split('T');
  const [ano, mes, dia] = data.split('-');
  const dataFormatada = `${dia}/${mes}/${ano}`;
  const horaFormatada = hora.split(':')[0] + ':' + hora.split(':')[1];
  return `${dataFormatada} ${horaFormatada}`;
};