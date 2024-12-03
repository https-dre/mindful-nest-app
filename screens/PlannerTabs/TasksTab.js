import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import { TaskComponent } from "../../components/TaskComponent";
import { formatDate, GetStringFormatedDate } from "../../utilities";
import { projects } from "../../exampledata";
import { BottomSheetCreateTask } from "../../components/BottomSheetCreateTask";
import { Modalize } from "react-native-modalize";
import { BoxCreateTask } from "../../components/BoxCreateTask";

export const TasksTab = () => {
	const currentDateString = GetStringFormatedDate(new Date());
	const [tasks, setTasks] = useState([]);
	const [selected, setSelected] = useState("all");
	const [visible, setVisible] = useState(false)
	const [newTask, setNewTask] = useState(null)
	const [lastRender, setLastRender] = useState(null)
	

	const renderAllTasks = () => {
		const today = new Date().getDate();

		const render = projects.flatMap((p) =>
			p.tasks
				.filter((t) => new Date(t.date).getDate() === today)
				.map((t) => {
					const taskDate = formatDate(new Date(t.date));
					return (
						<TaskComponent
							taskname={t.name}
							project={p.name}
							status={t.status}
							date={taskDate}
							key={Math.random()}
						/>
					);
				}),
		);
		setSelected("all");
		setTasks(render);

		setLastRender(()=>renderAllTasks)
	};
	
	useEffect(()=>{
		setLastRender(()=>renderAllTasks)
	}, [])
	

	useEffect(() => {
		const today = new Date().getDate();

		const render = projects.flatMap((p) =>
			p.tasks
				.filter((t) => new Date(t.date).getDate() === today)
				.map((t) => {
					const taskDate = formatDate(new Date(t.date));
					return (
						<TaskComponent
							taskname={t.name}
							project={p.name}
							status={t.status}
							date={taskDate}
							key={Math.random()}
						/>
					);
				}),
		);
		setSelected("all");
		setTasks(render);
	}, projects);

	const renderOpenTasks = () => {
		const today = new Date().getDate();

		const render = projects.flatMap((p) =>
			p.tasks
				.filter((t) => new Date(t.date).getDate() === today && t.status === 0)
				.map((t) => {
					const taskDate = formatDate(new Date(t.date));
					return (
						<TaskComponent
							taskname={t.name}
							project={p.name}
							status={t.status}
							date={taskDate}
							key={Math.random()}
						/>
					);
				}),
		);

		setSelected("open");
		setTasks(render);

		setLastRender(()=>renderOpenTasks)
	};

	const renderFinishedTasks = () => {
		const today = new Date().getDate();

		const render = projects.flatMap((p) =>
			p.tasks
				.filter((t) => new Date(t.date).getDate() === today && t.status === 2)
				.map((t) => {
					const taskDate = formatDate(new Date(t.date));
					return (
						<TaskComponent
							taskname={t.name}
							project={p.name}
							status={t.status}
							date={taskDate}
							key={Math.random()}
						/>
					);
				}),
		);

		setSelected("done");
		setTasks(render);

		setLastRender(()=>renderFinishedTasks)
	};

	const renderArchievedTasks = () => {
		const today = new Date().getDate();

		const render = projects.flatMap((p) =>
			p.tasks
				.filter((t) => new Date(t.date).getDate() === today && t.status === 3)
				.map((t) => {
					const taskDate = formatDate(new Date(t.date));
					return (
						<TaskComponent
							taskname={t.name}
							project={p.name}
							status={t.status}
							date={taskDate}
							key={Math.random()}
						/>
					);
				}),
		);

		setSelected("archived");
		setTasks(render);

		setLastRender(()=>renderArchievedTasks)
	}


	useEffect(()=>{
		if (newTask) {
			projects.map((p)=>{
				if (newTask.project.name === p.name) {
					p.tasks.push(newTask.task)
				}
			})
			lastRender()
			setNewTask(null)
		}
	}, [newTask])

	return (
		<View style={styles.container}>
			<BoxCreateTask
				extVisible={visible}
				onClose={()=>{setVisible(false)}}
				taskHold={setNewTask}
			/>
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
						Tasks Para Hoje
					</Text>
					<Text style={{ color: "#5E6676" }}>{currentDateString}</Text>
				</View>
				<TouchableOpacity style={styles.addButton} onPress={()=>{setVisible(true)}}>
					<Icon name="plus" size={17} color="#007AFF" />
					<Text style={{ color: "#007AFF" }}>Adicionar</Text>
				</TouchableOpacity>
			</View>

			<View style={{ flexDirection: "row", gap: 15, marginTop: 20 }}>
				<TouchableOpacity onPress={renderAllTasks} style={{ padding: 5 }}>
					<Text style={selected === "all" ? styles.selectedText : styles.text}>
						Todas
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={renderOpenTasks} style={{ padding: 5 }}>
					<Text style={selected === "open" ? styles.selectedText : styles.text}>
						Abertas
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={renderFinishedTasks} style={{ padding: 5 }}>
					<Text style={selected === "done" ? styles.selectedText : styles.text}>
						Finalizadas
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={renderArchievedTasks} style={{ padding: 5 }}>
					<Text style={selected === "archived" ? styles.selectedText : styles.text}>
						Arquivadas
					</Text>
				</TouchableOpacity>
			</View>

			<ScrollView style={{ marginTop: 5, width: "100%" }}>{tasks}</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
		paddingHorizontal: 20,
	},
	addButton: {
		flexDirection: "row",
		backgroundColor: "#E6F2FF",
		alignItems: "center",
		padding: 10,
		borderRadius: 10,
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
