import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
    Dimensions
} from "react-native";
import Carousel from "../../components/Carousel";
import Icon from "react-native-vector-icons/FontAwesome6";
import { SquareProject } from "../../components/SquareProject";
import { useAppState } from "../../AppStateContext";
import { useState, useEffect } from "react";

export const ProjectsTab = () => {
	const { projects } = useAppState();

	const projectComponents = projects.map(p => {
		return <SquareProject data={p} key={p.id} size={170} />
	})

	const [ projectsToCarousel, setProjectsToCarousel ] = useState(projects);

	useEffect(() => {
		const filteredProjects = projects.filter(p => parseFloat(p.progress) !== 100.00);
		setProjectsToCarousel(prevState => {
		  if (JSON.stringify(prevState) !== JSON.stringify(filteredProjects)) {
			return filteredProjects;
		  }
		  return prevState; 
		});
	}, [projects]);

	return (
		<View style={styles.container}>
			<Text
				style={{
					fontFamily: "SpaceGroteskMedium",
					fontSize: 20,
					margin: 20,
				}}
			>
				Em Progresso
			</Text>
			<Carousel data={projectsToCarousel}/>

			<ScrollView style={{paddingHorizontal: 20, marginTop: 10}}>
                {/* Botão De Criar Projeto */}
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
								fontSize: 20,
								color: "#222B45",
							}}
						>
							Todos os Projetos
						</Text>

					</View>
					<TouchableOpacity style={styles.addButton}>
						<Icon name="plus" size={17} color="#007AFF" />
						<Text style={{ color: "#007AFF" }}>Adicionar</Text>
					</TouchableOpacity>
				</View>

                <View style={styles.grid}>
                    {projectComponents}
                </View>

			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignSelf: "center",
	},
    addButton: {
        flexDirection: "row",
        backgroundColor: "#E6F2FF",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
		gap: 5
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',  // Permite quebrar os itens para a linha seguinte
        justifyContent: 'space-between', // Distribui os itens com espaço entre eles
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 20
    },
});
