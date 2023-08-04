import 'expo-dev-client';
import React, { useState } from 'react';
import { StyleSheet, View, Text, ToastAndroid } from 'react-native';
import { HCESessionProvider } from 'react-native-hce';
import SetupView from './src/SetupView';
import LogView from './src/LogView';
import NavButton from './src/Controls/NavButton';
import StateFab from './src/StateFAB';
import type { DataLayer } from './src/DataLayerTypes';
import useDataLayer from './src/useDataLayer';
import {
    HCESession,
    NFCTagType4NDEFContentType,
    NFCTagType4,
} from 'react-native-hce';

enum Views {
    VIEW_SETUP,
    VIEW_LOG,
}

const App = (): JSX.Element => {
    const [currentView, setCurrentView] = useState<Views>(Views.VIEW_SETUP);
    // const dataLayer: DataLayer = useDataLayer();

    let session: HCESession | null = null;

    const startSession = async () => {
        const tag = new NFCTagType4({
            type: NFCTagType4NDEFContentType.Text,
            content: 'Hello world',
            writable: false,
        });

        session = await HCESession.getInstance();
        session.setApplication(tag);
        await session.setEnabled(true);
    };

    startSession();

    const listen = async () => {
        const removeListener = session?.on(
            HCESession.Events.HCE_STATE_READ,
            () => {
                ToastAndroid.show(
                    'The tag has been read! Thank You.',
                    ToastAndroid.LONG
                );
            }
        );

        // to remove the listener:
        removeListener && removeListener();
    };

    listen();

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <NavButton
                    title='Set Up'
                    onPress={() => setCurrentView(Views.VIEW_SETUP)}
                    active={currentView === Views.VIEW_SETUP}
                />

                <NavButton
                    title='Event Log'
                    onPress={() => setCurrentView(Views.VIEW_LOG)}
                    active={currentView === Views.VIEW_LOG}
                />
            </View>

            {/* <View style={styles.content}>
                {dataLayer.loading && <Text>Loading...</Text>}
                {currentView === Views.VIEW_SETUP && (
                    <SetupView {...dataLayer} />
                )}
                {currentView === Views.VIEW_LOG && <LogView {...dataLayer} />}
            </View>

            <StateFab {...dataLayer} /> */}
        </View>
    );
};

export default () => (
    //@ts-ignore
    // <HCESessionProvider>
    <App />
    // </HCESessionProvider>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigation: {
        flexDirection: 'row',
        margin: 10,
    },
    content: {
        flex: 1,
        width: '100%',
    },
});
