import React, {useState} from 'react';
import {StyleSheet, Text, TextLayoutEventData, TouchableOpacity, View} from 'react-native';
import {theme} from "../../theme/theme";

interface ExpandableTextProps {
    children: string;
    numberOfLines?: number;
    date?: string
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({
                                                                  children,
                                                                  numberOfLines = 2,
                                                                  date
                                                              }) => {
    const [expanded, setExpanded] = useState(false);
    const [textLines, setTextLines] = useState(0);

    const onTextLayout = (e: { nativeEvent: TextLayoutEventData }) => {
        setTextLines(e.nativeEvent.lines.length);
    };

    const showToggle = textLines > numberOfLines;

    return (
        <View>
            <Text
                style={styles.text}
                numberOfLines={expanded ? undefined : numberOfLines}
                ellipsizeMode="tail"
                onTextLayout={onTextLayout}
            >
                {children}
            </Text>

            <View style={styles.bottomRow}>
                {showToggle ? (
                    <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                        <Text style={styles.toggleText}>
                            {expanded ? 'Show less' : 'Show more'}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View />
                )}

                {date ? <Text style={styles.dateText}>{date}</Text> : null}
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        lineHeight: 18,
    },
    toggleText: {
        color: theme.colors.pastelBlue,
        fontWeight: 'bold',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    dateText: {
        fontSize: 12,
        color: 'gray',
    },
});
