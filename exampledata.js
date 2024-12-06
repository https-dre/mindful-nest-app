export let projects = [
    {
        name: "Simple App Design",
        progress: "57%",
        deadline: "01/12",
        users: ["andre_dias"],
        backColor: "#3D7DE5",
        id: Math.random(),
        tasks: []
    },
    {
        name: "Crypto Wallet",
        progress: "38%",
        deadline: "01/12",
        users: ["andre_dias"],
        backColor: "#22272F",
        id: Math.random(),
        tasks: []
    },
    {
        name: "Square Kernel",
        progress: "27%",
        deadline: "No Data",
        users: ["andre_dias"],
        backColor: "#4FAE5B",
        id: Math.random(),
        tasks: []
    },
    {
        name: "App De Pam",
        progress: "47%",
        deadline: "03/12",
        users: ["andre_dias", "vitor_forcassin"],
        backColor: "#3D7DE5",
        id: Math.random(),
        tasks: []
    }
]

export let tasks = [];

export let usersData = [
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

export const persistProject = (name, progressValue, deadline, users, backColor) => {
    projects.push({
        name,
        progress: progressValue,
        deadline,
        users,
        backColor,
        id: Math.random(),
        tasks: []
    });
}

export const persistTask = (name, date, status, projectId) => {
    const taskId = Math.random()
    tasks.push({
        name,
        date,
        status,
        id: taskId
    });
    projects.forEach(p => {
        if (p.id === projectId) {
            p.tasks.push(taskId);
        }
    });
}

export let tasksToPersist = [
    {
        name: "Reunião com o Cliente",
        date: new Date().toISOString(),
        status: 0,
    },
    {
        name: "Hospedagem",
        date: new Date(2024, 11, 30, 10, 0, 0).toISOString(),
        status: 3,
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

for (let i = 0; i < tasksToPersist.length; i++) {
    if (projects[i]) { // Garantir que existe um projeto correspondente
        const t = tasksToPersist[i];
        persistTask(t.name, t.date, t.status, projects[i].id);
    }
}