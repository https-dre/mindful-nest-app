import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";

export const HorizontalColorSelector = ({ colors, selectedColor, onColorSelect }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {colors.map((color) => (
                <TouchableOpacity
                    key={color}
                    style={[
                        styles.colorCircle,
                        { backgroundColor: color },
                        selectedColor === color && styles.selectedColorCircle,
                    ]}
                    onPress={() => onColorSelect(color)}
                >
                    {selectedColor === color && <View style={styles.selectedMark} />}
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: "row",
        paddingVertical: 8,
        alignItems: "center",
    },
    colorCircle: {
        width: 25,
        height: 25,
        borderRadius: 20,
        marginHorizontal: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "transparent",
    },
    selectedColorCircle: {
        borderColor: "black",
    },
});
