import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommunityPost } from '../components/CommunityPost';

export const Community = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 40,
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontFamily: 'SpaceGroteskMedium',
                                fontSize: 20,
                                color: '#222B45',
                            }}
                        >
                            Mindful Nest Community
                        </Text>
                        <Text style={{ color: '#88929E' }}>
                            Veja outros Projetos!
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        <TouchableOpacity style={styles.elipseButton}>
                            <Icon
                                name="document-text-outline"
                                size={20}
                                color={'black'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.elipseButton}>
                            <Icon
                                name="notifications-outline"
                                size={20}
                                color={'black'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.textBoxView}>
                    <View
                        style={{
                            justifyContent: 'center',
                            paddingHorizontal: 10,
                        }}
                    >
                        <Icon name="search" color="#8F9BB3" size={20} />
                    </View>
                    <TextInput
                        placeholder="Encontre suas Tasks e Projetos"
                        style={{ width: '100%' }}
                        placeholderTextColor="#8F9BB3"
                    />
                </View>

                <View>
                    <CommunityPost />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    elipseButton: {
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: '#C6C6C6',
        padding: 10,
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBoxView: {
        borderWidth: 1,
        borderColor: "#8F9BB3",
        marginHorizontal: 40,
        alignSelf: "center",
        marginVertical: 20,
        flexDirection: "row",
        height: 50,
        borderRadius: 10,
        width: "99%"
      },
});
