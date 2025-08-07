import React, { useContext } from 'react';
import { View, Text, Switch, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../Utilities/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function SettingScreen({ navigation }) {
  const { darkMode, toggleTheme, textSize, setTextSize, colors } = useTheme();

  const textSizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'X-Large', value: 'xlarge' }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.settingRow}>
          <MaterialIcons name="dark-mode" size={24} color={colors.primary} />
          <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
          <Switch 
            value={darkMode} 
            onValueChange={toggleTheme}
            thumbColor={darkMode ? colors.primary : '#f5f5f5'}
            trackColor={{ false: '#767577', true: colors.primary + '80' }}
          />
        </View>
        
        <View style={styles.settingRow}>
          <MaterialIcons name="text-fields" size={24} color={colors.primary} />
          <Text style={[styles.settingText, { color: colors.text }]}>Text Size</Text>
          <View style={styles.sizeOptions}>
            {textSizeOptions.map(option => (
              <Text
                key={option.value}
                style={[
                  styles.sizeOption,
                  textSize === option.value && styles.selectedSize,
                  { color: colors.text }
                ]}
                onPress={() => setTextSize(option.value)}
              >
                {option.label}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          <MaterialIcons name="security" size={20} color={colors.primary} /> Security
        </Text>
        <Text style={[styles.description, { color: colors.text }]}>
          Enable screenshot protection for sensitive content
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)'
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: 10
  },
  sizeOption: {
    padding: 6,
    borderRadius: 6
  },
  selectedSize: {
    fontWeight: 'bold',
    backgroundColor: 'rgba(98, 0, 238, 0.1)'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    opacity: 0.8
  }
});