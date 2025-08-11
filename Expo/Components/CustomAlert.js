import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/CustomAlertStyle";

export default function CustomAlert({ visible, onConfirm, onCancel }) {
  const {colors, textSize} = useTheme();
  const [styles, setStyles] = useState({});

  useEffect(() => {
    setStyles(createStyles(colors, textSize));
  }, [colors, textSize, ]);

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Confirmation</Text>
          <Text style={styles.modalMessage}>Are you sure you want to continue?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
