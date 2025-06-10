
export const QueryStringfy = (obj: Record<string, unknown>): string => {
    const params = new URLSearchParams();
    
    Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
            value.forEach((item) => params.append(key, String(item)));
        } else {
            params.set(key, String(value));
        }
        }
    });
    
    return params.toString();
}

export const formatFullDate = (timestamp: number): string => {
  if (timestamp < 1e12) {
    timestamp *= 1000
  }

  const date = new Date(timestamp)

  const diasDaSemana = [
    'Domingo', 'Segunda', 'Terça', 'Quarta',
    'Quinta', 'Sexta', 'Sábado'
  ]

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const diaSemana = diasDaSemana[date.getDay()]
  const dia = date.getDate()
  const mes = meses[date.getMonth()]
  const ano = date.getFullYear()

  return `${diaSemana} - ${dia} de ${mes} de ${ano}`
}

export const formatTime = (timestamp: number): string => {
  if (timestamp < 1e12) {
    timestamp *= 1000
  }

  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}