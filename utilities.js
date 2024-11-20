export const GetStringFormatedDate = (date) => {
    const diasSemana = [
        "Domingo",
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sábado"
    ]

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
        "Dezembro"
    ]

    return `${diasSemana[date.getDay()]}, ${date.getDate()} de ${meses[date.getMonth()-1]}`
}