/*
 * Copyright (c) 2020-2022 Mateusz Falkowski (appidea.pl) and contributors. All rights reserved.
 * This file is part of "react-native-hce" library: https://github.com/appidea/react-native-hce
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import type { DataLayer } from './DataLayerTypes';

const StateFAB = ({ enabled, switchSession }: DataLayer) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => switchSession(!enabled)}>
            <Text>{enabled ? 'ACTIVE' : 'INACTIVE'}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    icon: {
        width: 80,
        height: 80,
    },
});

export default StateFAB;
