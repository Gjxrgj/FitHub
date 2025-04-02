import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { styles } from './styles.ts';
export const RightDrawerContent = ({closeDrawer}: { closeDrawer: () => void }) => {
    return (
        <View style={styles.drawerContainer}>
            <TouchableOpacity onPress={closeDrawer}>
                <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.drawerItem}>Option 1</Text>
            <Text style={styles.drawerItem}>Option 2</Text>
            <Text style={styles.drawerItem}>Option 3</Text>
        </View>
    );
};

