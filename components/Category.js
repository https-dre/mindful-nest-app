import { View, TouchableOpacity, Text } from 'react-native';

export const Category = ({
    name = 'DefaultName',
    backColor = '#9ec8f9',
    iconColor = '#0095FF',
}) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: backColor,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                padding: 10,
                borderRadius: 10
            }}
        >
            <View
                style={{
                    borderWidth: 3,
                    borderColor: iconColor,
                    borderRadius: 100,
                    padding: 2,
                    width: 5,
                    height: 5,
                }}
            />

            <Text style={{ fontFamily: 'SpaceGroteskMedium' }}>{name}</Text>
        </TouchableOpacity>
    );
};
