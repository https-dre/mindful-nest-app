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
		"Novembro",
		"Dezembro",
	];

	return `${diasSemana[date.getDay()]}, ${date.getDate()} de ${meses[date.getMonth() - 1]}`;
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
