export const formatarValor = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

export const formatarDataEHora = (dataEHora) => {
  if (!dataEHora) return '';
  const [data, hora] = dataEHora.split(' - ');
  const [dia, mes, ano] = data.split('/');
  const dataFormatada = `${ano}-${mes}-${dia}`;
  const horaFormatada = hora.split(':')[0] + ':' + hora.split(':')[1];
  return `${dataFormatada}T${horaFormatada}`;
};