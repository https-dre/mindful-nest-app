import { ScrollView, TouchableOpacity, Text, StyleSheet} from "react-native";

export const HorizontalSelector = ({ items, selectedValue, onValueChange }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {items.map((item) => (
                <TouchableOpacity
                    key={item.value}
                    style={[
                        styles.button,
                        selectedValue === item.value && styles.selectedButton,
                    ]}
                    onPress={() => onValueChange(item.value)}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            selectedValue === item.value && styles.selectedButtonText,
                        ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    button: {
        marginRight: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#D8D8D8',
        borderRadius: 16,
    },
    selectedButton: {
        backgroundColor: '#1D1F24',
    },
    buttonText: {
        color: '#565656',
        fontSize: 14,
        fontWeight: "bold"
    },
    selectedButtonText: {
        color: '#D9D9D9',
    },
    label: {
        fontSize: 16,
    }
});