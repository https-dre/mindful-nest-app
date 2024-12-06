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
import  { projects as initialProjects, tasks as initialTasks } from "../../exampledata";
import { BoxCreateTask } from "../../components/BoxCreateTask";

export const TasksTab = () => {
	const currentDateString = GetStringFormatedDate(new Date());
	const [tasks, setTasks] = useState([]);
	const [selected, setSelected] = useState("all");
	const [visible, setVisible] = useState(false)
	const [newTask, setNewTask] = useState(null)
	const [lastRender, setLastRender] = useState(null)
	const [projects, setProjects] = useState(initialProjects)

	const renderAllTasks = () => {
		const today = new Date().getDate();
		const render = initialProjects.flatMap((project) => {
			console.log("PROJECT: ", project)
			const tasks_array = project.tasks.map(t_id => {
				return initialTasks.find(t => t.id === t_id)
			})

			return tasks_array
				.filter(t => new Date(t.date).getDate() === today).map((task) => {
					if (!task) return null;
		
					const taskDate = formatDate(new Date(task.date));
					return (
						<TaskComponent
							taskname={task.name}
							project={project.name}
							status={task.status}
							date={taskDate}
							key={`${project.id}-${task.id}`}
							id={task.id}
						/>
					);
			});
		});
	
		setTasks(render); 
		setSelected("all"); 
		setLastRender(() => renderAllTasks); 
	};

	const renderOpenTasks = () => {
		const today = new Date().getDate();
		const render = initialProjects.flatMap((project) => {
			console.log("PROJECT: ", project)
			const tasks_array = project.tasks.map(t_id => {
				return initialTasks.find(t => t.id === t_id)
			})

			return tasks_array
				.filter(t => new Date(t.date).getDate() === today)
				.filter(t => t.status === 0 || t.status === 1)
				.map((task) => {
					if (!task) return null;
		
					const taskDate = formatDate(new Date(task.date));
					return (
						<TaskComponent
							taskname={task.name}
							project={project.name}
							status={task.status}
							date={taskDate}
							key={`${project.id}-${task.id}`}
							id={task.id}
						/>
					);
			});
		});
	
		setTasks(render); 
		setSelected("open"); 
		setLastRender(() => renderOpenTasks); 
	}

	useEffect(() => {
		renderAllTasks();
		setSelected("all");
		setLastRender(() => renderAllTasks)
	}, [])

	const renderFinishedTasks = () => {
		const today = new Date().getDate();
		const render = initialProjects.flatMap((project) => {
			console.log("PROJECT: ", project)
			const tasks_array = project.tasks.map(t_id => {
				return initialTasks.find(t => t.id === t_id)
			})

			return tasks_array
				.filter(t => new Date(t.date).getDate() === today && t.status === 2).map((task) => {
					if (!task) return null;
		
					const taskDate = formatDate(new Date(task.date));
					return (
						<TaskComponent
							taskname={task.name}
							project={project.name}
							status={task.status}
							date={taskDate}
							key={`${project.id}-${task.id}`}
							id={task.id}
						/>
					);
			});
		});
	
		setTasks(render); 
		setSelected("done"); 
		setLastRender(() => renderFinishedTasks); 
	}

	const renderArchivedTasks = () => {
		const today = new Date().getDate();
		const render = initialProjects.flatMap((project) => {
			console.log("PROJECT: ", project)
			const tasks_array = project.tasks.map(t_id => {
				return initialTasks.find(t => t.id === t_id)
			})

			return tasks_array
				.filter(t => new Date(t.date).getDate() === today && t.status === 3).map((task) => {
					if (!task) return null;
		
					const taskDate = formatDate(new Date(task.date));
					return (
						<TaskComponent
							taskname={task.name}
							project={project.name}
							status={task.status}
							date={taskDate}
							key={`${project.id}-${task.id}`}
							id={task.id}
						/>
					);
			});
		});
	
		setTasks(render); 
		setSelected("archived"); 
		setLastRender(() => renderAllTasks); 
	}

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

				<TouchableOpacity onPress={renderArchivedTasks} style={{ padding: 5 }}>
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
