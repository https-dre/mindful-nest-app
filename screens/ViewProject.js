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
import { projects, tasks } from "../exampledata";

const usersData = [
	{
		name: "andre_dias",
		perfil: require("../assets/foto-perfil-andre.png"),
	},
];

export const ViewProject = () => {
	const route = useRoute();
	const navigation = useNavigation();
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

	const { name, progress, deadline, backColor, users, tasks } = projectData;

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

	const [taskComponents, setTasks] = useState([]);
	const [selected, setSelected] = useState("all");

	const currentTasks = projects.filter((p) => p.key === projectData.key)[0]
		.tasks;

	useEffect(() => {
		const render = currentTasks.map((t) => {
			const taskDate = formatDate(new Date(t.date));
			return (
				<TaskComponent
					taskname={t.name}
					project={projectData.name}
					status={t.status}
					date={taskDate}
					key={Math.random()}
				/>
			);
		});
		setSelected("all");
		setTasks(render);
	}, [currentTasks, projectData]);

	const renderTasks = (tasksArray) => {
		return tasksArray.map((t) => {
			const taskDate = formatDate(new Date(t.date));
			return (
				<TaskComponent
					taskname={t.name}
					project={projectData.name}
					status={t.status}
					date={taskDate}
					key={Math.random()}
				/>
			);
		});
	};

	const renderAllTasks = () => {
		const render = renderTasks(currentTasks);
		setSelected("all");
		setTasks(render);
	};

	const renderOpenTasks = () => {
		const openTasks = currentTasks.filter((t) => t.status === 0);
		if (openTasks.length === 0) {
			setSelected("open");
			setTasks(<Text>Nenhuma Task</Text>);
			return;
		}
		const render = renderTasks(openTasks);

		setSelected("open");
		setTasks(render);
	};

	const renderFinishedTasks = () => {
		const finishedTasks = currentTasks.filter((t) => t.status === 2);
		if (finishedTasks.length === 0) {
			setSelected("done");
			setTasks(<Text>Nenhuma Task</Text>);
			return;
		}
		const render = renderTasks(finishedTasks);
		setSelected("done");
		setTasks(render);
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Banner Do Projeto */}
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
							<Text style={{ color: "#EBEBEB" }}>{progress}</Text>
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
									width: progress,
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
					<TouchableOpacity style={styles.addButton}>
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
						onPress={() => setSelected("archived")}
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
