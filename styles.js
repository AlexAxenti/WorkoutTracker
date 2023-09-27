import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    outerScreenLayout: {
        flex: 1,
        flexDirection: 'column',
    },
    topNav: {
        height: 100,
        backgroundColor: '#2f3a59',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botNav: {
        flex: 1, 
        backgroundColor: '#2f3a59',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    botNavButton: {
        flex: 1,
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerContent: {
        // backgroundColor: '#b2bbd6',
        // alignItems: 'center',
        // justifyContent: 'center',
        flex: 6,
    },
    container: {
        flexDirection: 'column',
        flex: 1,
        // backgroundColor: '#fff',
    },
    log: {
        backgroundColor: 'green',
        height: 50,
        marginTop: 3,
        borderTopColor: 'black',
        borderTopWidth: 2,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        // backgroundColor: '#fff',
    },
});

export default styles;
  