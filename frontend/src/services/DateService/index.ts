// Função para obter o número da semana do ano

function mesmaSemana(hoje: Date, dataAComparar: Date): boolean {
  const inicioSemana = (data: Date): Date => {
    const diaDaSemana = data.getDay();
    return new Date(
      data.getFullYear(),
      data.getMonth(),
      data.getDate() - diaDaSemana
    );
  };
  const inicioSemanaHoje = inicioSemana(hoje);
  const inicioSemanaComparar = inicioSemana(dataAComparar);
  return inicioSemanaHoje.getTime() === inicioSemanaComparar.getTime();
}

export const dateService = {
  datetimeToHumanDate(value: Date | string) {
    if (value != null) {
      const dtAtual = new Date();
      const dtFormatada = new Date(value);
      if (
        dtAtual.getDate() === dtFormatada.getDate() &&
        dtAtual.getMonth() === dtFormatada.getMonth() &&
        dtAtual.getFullYear() === dtFormatada.getFullYear()
      ) {
        let result = dtFormatada.toLocaleDateString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "UTC", // Defina o fuso horário como UTC
        });
        const index = result.indexOf(",");
        if (index !== -1) {
          result = result.substring(index + 2);
        }
        return `Hoje, ${result.trim()}`;
      } else if (mesmaSemana(dtAtual, dtFormatada)) {
        if (dtAtual.getDay() - dtFormatada.getDay() === 1) {
          let result = dtFormatada.toLocaleDateString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "UTC", // Defina o fuso horário como UTC
          });
          const index = result.indexOf(",");
          if (index !== -1) {
            result = result.substring(index + 2);
          }
          return `Ontem, ${result.trim()}`;
        } else {
          const result = dtFormatada.toLocaleDateString("pt-BR", {
            weekday: `long`,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "UTC", // Defina o fuso horário como UTC
          });
          return result;
        }
      } else {
        const result = dtFormatada.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "UTC", // Defina o fuso horário como UTC
        });
        return result;
      }
    } else {
      return "-";
    }
  },
  datetimeToHumanDateWithoutSeconds(value: Date | string) {
    if (value != null) {
      const dtFormatada = new Date(value);
      const result = dtFormatada.toLocaleDateString("pt-BR", {
        timeZone: "UTC", // Defina o fuso horário como UTC
      });
      return result;
    } else {
      return "-";
    }
  },
};
