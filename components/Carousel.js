import React, { useState, useRef } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import { Project } from "./Project"

const { width } = Dimensions.get('window');

const MyCarousel = ({data}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Referência para o FlatList
    const flatListRef = useRef(null);

    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems[0]) {
            setCurrentIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef} // Defina a referência para o FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.slide}>
                            <Project
                                projectData={item}
                            />
                        </View>
                     );
        
                }}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={((item) => item.id)}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                snapToAlignment="center"
                decelerationRate="fast"
                bounces={false} // Desativa o efeito de bounce
            />
            <View style={styles.pagination}>
                {data.map((_, index) => (
                    <View
                        key={Math.random()}
                        style={[
                            styles.dot,
                            { opacity: index === currentIndex ? 1 : 0.3 },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        maxHeight: 300
    },
    slide: {
        width: width , // Definindo o tamanho do item
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 10
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#000',
        margin: 4,
    },
});

export default MyCarousel;
