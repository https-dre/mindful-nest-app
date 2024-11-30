export const tasks = [
    {
        name: "Reunião com o Cliente",
        date: new Date().toISOString(),
        status: 0,
    },
    {
        name: "Hospedagem",
        date: new Date(2024, 11, 30, 10, 0, 0).toISOString(),
        status: 1,
    },
    {
        name: "Definição de Arquitetura",
        date: new Date().toISOString(),
        status: 2,
    },
    {
        name: "Entrega do App",
        date: new Date(2024, 11, 3, 23, 59, 0 ).toISOString(),
        status: 1,
    }
]

export const projects = [
    {
        name: "Simple App Design",
        progress: "57%",
        deadline: "01/12",
        users: ["andre_dias"],
        backColor: "#3D7DE5",
        key: Math.random(),
        tasks: [tasks[0]]
    },
    {
        name: "Crypto Wallet",
        progress: "38%",
        deadline: "01/12",
        users: ["andre_dias"],
        backColor: "#22272F",
        key: Math.random(),
        tasks: [tasks[1]]
    },
    {
        name: "Square Kernel",
        progress: "27%",
        deadline: "No Data",
        users: ["andre_dias"],
        backColor: "#4FAE5B",
        key: Math.random(),
        tasks: [tasks[2]]
    },
    {
        name: "App De Pam",
        progress: "47%",
        deadline: "03/12",
        users: ["andre_dias", "vitor_forcassin"],
        backColor: "#3D7DE5",
        key: Math.random(),
        tasks: [tasks[3]]
    }
]

const usersData = [
	{
		name: "andre_dias",
		perfil: require("./assets/foto-perfil-andre.png"),
        key: Math.random()
	},
    {
        name: "vitor_forcassin",
        perfil: require("./assets/foto-perfil-andre.png"),
        key: Math.random()
    }
];