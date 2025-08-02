import AsyncStorage from '@react-native-async-storage/async-storage';

export const set = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving data', error);
    }
};

export const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ;//? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error retrieving data', error);
        return null;
    }
};

export const remove = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing data', error);
    }
};

export const clear = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error clearing data', error);
    }
};

const store = {
    set,
    get,
    remove,
    clear
};

export default store;