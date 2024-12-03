import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconFeather from "react-native-vector-icons/Feather";

function handleMarker(status) {
	switch (status) {
        case 0:
            return (
                <View
					key={Math.random()}
					style={{
						backgroundColor: "#e6e6e6",
						padding: 10,
						borderRadius: 100,
                        borderColor: "#bebebe",
						width: 20,
						height: 20,
                        borderWidth: 1
					}}
				/>
            )

		case 1:
			return (
				<View
					key={Math.random()}
					style={{
						backgroundColor: "#72aff6",
						borderRadius: 100,
						width: 30,
						height: 30,
                        alignItems: "center",
                        justifyContent: "center"
					}}
				>
					<IconFeather
						key={Math.random()}
						name="loader"
						size={17}
						color="#156fd7"
					/>
				</View>
			);
		case 2:
			return (
				<Icon
					key={Math.random()}
					name="checkmark-circle"
					size={25}
					color="#007AFF"
				/>
			);
		case 3:
			return (
				<View
					key={Math.random()}
					style={{
						backgroundColor: "#72aff6",
						borderRadius: 100,
						width: 30,
						height: 30,
                        alignItems: "center",
                        justifyContent: "center"
					}}
				>
					<Icon
						key={Math.random()}
						name="folder-outline"
						size={17}
						color="#156fd7"
					/>
				</View>
			)
		default:
			console.log("Marker error in TaskComponent");
			return <View key={Math.random()} />;
	}
}

export const TaskComponent = ({
	taskname = "Review Task",
	project = "Simple App Design",
	date = "Hoje 10:00 PM - 11:45 PM",
	status = 2,
}) => {
	let marker = handleMarker(status);

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View style={{ gap: 10 }}>
					<TouchableOpacity>
						<Text style={{ fontFamily: "SpaceGroteskMedium", fontSize: 23 }}>
							{taskname}
						</Text>
					</TouchableOpacity>
					<Text>{project}</Text>
				</View>

				<View>{marker}</View>
			</View>

			<View style={styles.dateView}>
				<Text style={{ color: "#B1B7C2", marginTop: 10 }}>{date}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		shadowColor: "gray",
		shadowOffset: 10,
		shadowOpacity: 0.2,
		shadowRadius: 2,
		backgroundColor: "white",

		alignSelf: "center",
		minWidth: "99%",
		minHeight: 150,

		padding: 20,
		marginVertical: 10,
	},

	dateView: {
		marginTop: 15,
		borderTopWidth: 1,
		borderColor: "#B1B7C2",
		flexDirection: "row",
		alignItems: "center",
	},
});
