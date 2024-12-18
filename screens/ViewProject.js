import {
	SafeAreaView,
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { GetStringFormatedDate, formatDate } from "../utilities";
import { TaskComponent } from "../components/TaskComponent";
import { BoxCreateTask } from "../components/BoxCreateTask";
import { useAppState } from "../AppStateContext";

const usersData = [
	{
		name: "andre_dias",
		perfil: require("../assets/foto-perfil-andre.png"),
	},
];

export const ViewProject = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const [visible, setVisible] = useState(false);
	const { projects, tasks, setTasks, setProjects } = useAppState();

	if (!route.params) {
		return (
			<View>
				<Text>Parâmetros não encontrados</Text>
			</View>
		);
	}
	const { projectData } = route.params;
	/* projectData: {name, progress, deadline, backColor, userNames} */

	if (!projectData) {
		return (
			<View>
				<Text>Dados do Projeto não encontrados</Text>
			</View>
		);
	}

	const { name, progress, deadline, backColor, users } = projectData;

	let participantesImage = [];

	for (const index in users) {
		usersData.map((user) => {
			if (user.name === users[index]) {
				participantesImage.push(
					<Image
						source={user.perfil}
						style={styles.fotoPerfil}
						key={Math.random()}
					/>,
				);
			}
		});
	}
	const currentDateString = GetStringFormatedDate(new Date());
	/* Toda a renderização de Tasks */

	const [taskComponents, setTasksComponents] = useState([]);
	const [selected, setSelected] = useState("all");

	let currentProjectIndex = projects.findIndex(p => p.id === projectData.id);

	const setNewTask = (data) => {
		const { task, project } = data;
		const projectIndex = projects.findIndex(p => p.name === project.name);
		const projectId = projects[projectIndex].id;
		const taskId = Math.random()
		setTasks(prev => [...prev, { name: task.name, date: task.date, id: taskId, status: task.status }])
		setProjects(prevProjects => prevProjects.map(p => 
			p.id === projectId ? { ...p, tasks: [...p.tasks, taskId]} : p))
	}

	const getTasksComponentArray = (tasksArray) => {
		return tasksArray.map((t) => {
			const taskDate = formatDate(new Date(t.date));
			return (
				<TaskComponent
					taskname={t.name}
					project={projectData.name}
					status={t.status}
					date={taskDate}
					key={Math.random()}
					id={t.id}
				/>
			);
		});
	};

	const getTasksByProjectIndex = (p_index) => {
		return projects[p_index].tasks.map(id => {
			return tasks[tasks.findIndex(t => t.id === id)];
		});
	}

	const renderAllTasks = () => {
		const arr = getTasksByProjectIndex(currentProjectIndex);
		console.log(arr);
		setTasksComponents(getTasksComponentArray(arr));
		setSelected("all");
	}

	const renderOpenTasks = () => {
		const arr = getTasksByProjectIndex(currentProjectIndex)
			.filter(t => t.status === 0 || t.status === 1);
		setTasksComponents(getTasksComponentArray(arr));
		setSelected("open");
	}

	const renderFinishedTasks = () => {
		const arr = getTasksByProjectIndex(currentProjectIndex)
			.filter(t => t.status === 2);
		setTasksComponents(getTasksComponentArray(arr));
		setSelected("done");
	}

	const renderArchivedTasks = () => {
		const arr = getTasksByProjectIndex(currentProjectIndex)
			.filter(t => t.status === 3);
		setTasksComponents(getTasksComponentArray(arr));
		setSelected("archived");
	}

	useEffect(() => {
		switch (selected) {
		  case "all":
			renderAllTasks();
			break;
		  case "open":
			renderOpenTasks();
			break;
		  case "done":
			renderFinishedTasks();
			break;
		  case "archived":
			renderArchivedTasks();
			break;
		  default:
			renderAllTasks();
			break;
		}
	}, [selected, tasks, projects]);
	
	useEffect(() => {
		let projectProgress = 0;
		const tasksFromCurrentProject = getTasksByProjectIndex(currentProjectIndex);
		if (tasksFromCurrentProject.length === 0) {
		  setProjects(prev => prev.map(p => p.id === projectData.id ? { ...p, progress: 0 } : p));
		  return;
		}
		let finishedTasksCount = 0;
		tasksFromCurrentProject.forEach(t => t.status >= 2 ? finishedTasksCount += 1 : 0);
		projectProgress = (finishedTasksCount / tasksFromCurrentProject.length) * 100
		setProjects(prev => prev.map(p => p.id === projectData.id ? { ...p, progress: projectProgress } : p));
	  }, [tasks]);

	const formatedProgress = () => {
		return `${parseInt(projects[currentProjectIndex].progress)}%`
	}
	
	return (
		<SafeAreaView style={styles.container}>
			{/* Banner Do Projeto */}
			<BoxCreateTask
				extVisible={visible}
				onClose={()=>{setVisible(false)}}
				taskHold={setNewTask}
			/>
			<View style={[styles.projectBanner, { backgroundColor: backColor }]}>
				<Image
					source={require("../assets/lines-effect.png")}
					style={{ marginLeft: 190, marginTop: 0 }}
				/>
				<View
					style={{
						position: "absolute",
						width: "100%",
						paddingVertical: 15,
						paddingHorizontal: 25,
					}}
				>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<TouchableOpacity
							style={styles.bannerButton}
							onPress={() => navigation.goBack()}
						>
							<Icon name="chevron-back" size={20} color="white" />
						</TouchableOpacity>

						<View style={{ flexDirection: "row", gap: 10 }}>
							<TouchableOpacity style={styles.bannerButton}>
								<Icon name="calendar" size={20} color="white" />
							</TouchableOpacity>
							<TouchableOpacity style={styles.bannerButton}>
								<Icon name="pencil" size={20} color="white" />
							</TouchableOpacity>
						</View>
					</View>

					<View style={{ marginTop: 50 }}>
						<Text
							style={{
								fontSize: 35,
								color: "white",
							}}
						>
							{name}
						</Text>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								marginTop: 10,
							}}
						>
							<Text style={{ color: "#EBEBEB" }}>Progresso</Text>
							<Text style={{ color: "#EBEBEB" }}>{formatedProgress()}</Text>
						</View>

						<View
							style={{
								opacity: 0.2,
								backgroundColor: "black",
								alignSelf: "center",
								height: 1,
								width: "100%",
								marginTop: 10,
							}}
						>
							<View
								style={{
									height: 1,
									width: formatedProgress(),
									backgroundColor: "white",
									opacity: 1,
								}}
							/>
						</View>
						{/* Imagens dos usuários e mais */}
						<View
							style={{
								marginTop: 10,
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<View>
								<Text style={{ color: "white", fontSize: 10 }}>Membros</Text>
								<View style={{ flexDirection: "row", marginTop: 5 }}>
									{participantesImage}
								</View>
							</View>

							<View
								style={{
									flexDirection: "row",
									alignItems: "flex-end",
									gap: 10,
								}}
							>
								<Icon name="calendar" size={20} color="white" />
								<Text style={{ color: "white" }}>{deadline}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>

			{/* Aqui as Tasks */}
			<ScrollView style={{ padding: 20 }}>
				<View
					style={{
						marginTop: 15,
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View>
						<Text
							style={{
								fontFamily: "SpaceGroteskMedium",
								fontSize: 24,
								color: "#222B45",
							}}
						>
							Tasks
						</Text>
						<Text style={{ color: "#5E6676" }}>{currentDateString}</Text>
					</View>
					<TouchableOpacity style={styles.addButton} onPress={() => setVisible(true)}>
						<Icon name="add" size={17} color="#007AFF" />
						<Text style={{ color: "#007AFF", fontWeight: "bold" }}>
							Adicionar
						</Text>
					</TouchableOpacity>
				</View>

				<View style={{ flexDirection: "row", gap: 15, marginTop: 20 }}>
					<TouchableOpacity onPress={renderAllTasks} style={{ padding: 5 }}>
						<Text
							style={selected === "all" ? styles.selectedText : styles.text}
						>
							Todas
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={renderOpenTasks} style={{ padding: 5 }}>
						<Text
							style={selected === "open" ? styles.selectedText : styles.text}
						>
							Abertas
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={renderFinishedTasks}
						style={{ padding: 5 }}
					>
						<Text
							style={selected === "done" ? styles.selectedText : styles.text}
						>
							Finalizadas
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={renderArchivedTasks}
						style={{ padding: 5 }}
					>
						<Text
							style={
								selected === "archived" ? styles.selectedText : styles.text
							}
						>
							Arquivadas
						</Text>
					</TouchableOpacity>
				</View>
				<View>
					{taskComponents}
				</View>
				
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	projectBanner: {
		width: "100%",
		height: "37%",
	},
	bannerButton: {
		borderWidth: 1,
		borderColor: "#D9D9D9",
		width: 35,
		height: 35,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center",
	},
	fotoPerfil: {
		width: 40,
		height: 40,
	},
	addButton: {
		flexDirection: "row",
		backgroundColor: "#E6F2FF",
		alignItems: "center",
		padding: 10,
		borderRadius: 10,
		gap: 5,
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	selectedButton: {
		backgroundColor: "#007AFF",
	},
	text: {},
	selectedText: {
		color: "#007AFF",
		fontWeight: "bold",
	},
});
