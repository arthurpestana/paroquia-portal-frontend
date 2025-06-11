export const QueryStringfy = (obj: Record<string, unknown>): string => {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          params.append(key, typeof item === 'object' ? JSON.stringify(item) : String(item));
        });
      } else {
        const stringifiedValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        params.set(key, stringifiedValue);
      }
    }
  });

  return params.toString();
};

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

export const getDateTimestamp = (dateStr: string) => {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
};

export const getTimeMilliseconds = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * 60 + minutes) * 60 * 1000;
};

export const msToHHMM = (ms: number) => {
    const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
    return `${hours}:${minutes}`;
};

export const hhmmToMs = (hhmm: string) => {
    const [hours, minutes] = hhmm.split(':').map(Number);
    return (hours * 60 + minutes) * 60 * 1000;
};
