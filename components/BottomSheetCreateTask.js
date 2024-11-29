import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";

export const BottomSheetCreateTask = ({ modalizeRef }) => {
	return (
		<Modalize
			ref={modalizeRef}
			snapPoint={600}
			maxHeight={600}
			panGestureEnabled={true}
			closeOnOverlayTap={true}
			dragToss={0.6}
			modalStyle={{
				backgroundColor: "white", // Fundo do modal
				borderTopLeftRadius: 40, // Cantos arredondados
				borderTopRightRadius: 40,
			}}
			handleStyle={{
				backgroundColor: "#ccc", // Barra de puxar
				width: 80,
				height: 6,
				borderRadius: 3,
				margin: 25
			}}
			overlayStyle={{
				backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay escurecido
			}}
		>
			<View style={styles.modalContent}>
				<Text style={styles.modalText}>Este é um Modal Bottom Sheet!</Text>
			</View>
		</Modalize>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	openButton: {
		backgroundColor: "#6200ee",
		padding: 15,
		borderRadius: 5,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
	modalContent: {
		padding: 20,
		alignItems: "center",
		backgroundColor: "white",
	},
	modalText: {
		fontSize: 16,
	},
});
