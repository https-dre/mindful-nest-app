export const GetStringFormatedDate = (date) => {
	const diasSemana = [
		"Domingo",
		"Segunda-Feira",
		"Terça-Feira",
		"Quarta-Feira",
		"Quinta-Feira",
		"Sexta-Feira",
		"Sábado",
	];

	const meses = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];

	return `${diasSemana[date.getDay()]}, ${date.getDate()} de ${meses[date.getMonth()]}`;
};

export function formatDate(date) {
	const now = new Date();
	const options = { hour: "2-digit", minute: "2-digit", hour12: true };
	const startTime = date.toLocaleTimeString([], options);

	if (date.toDateString() === now.toDateString()) {
		return `Hoje ${startTime}`;
	}
	return `${GetStringFormatedDate(date)} às ${startTime}`;
}

export function formatHours(date) {
	return date.toLocaleTimeString('pt-BR', {
		hour: '2-digit',
		minute: '2-digit',
	});
}

export function formatPadDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}