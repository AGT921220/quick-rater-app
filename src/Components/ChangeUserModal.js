import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';
import { findEmployeeByCode, getEmployees, saveEmployeeToLocalStorage } from '../Services/Employee';
import { Picker } from '@react-native-picker/picker';
import { getPrimaryColor, getTextColor } from '../Utils/Colors';
import { Input } from 'react-native-elements';

const ChangeUserModal = (props) => {
  const { hideChangeUserModal, setActiveEmployee, showErrorMessage, setLoading } = props
  const [modalVisible, setModalVisible] = useState(true);
  const [code, setCode] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState();

  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     const data = await findEmployeeByCode();
  //     setEmployees(data);
  //   };

  //   fetchEmployees();
  // }, []);


  const checkCode = async(code)=>
  {
    if(code.length == 4)
    {
      setLoading(true)
      let employee = await findEmployeeByCode(code)
      console.log(employee)
      if(employee.success)
      {
        setLoading(false)
        setActiveEmployee(employee.success)
        saveEmployeeToLocalStorage(employee.success)
        hideChangeUserModal()
        setLoading(false)
        return
      }
            setLoading(false)

      showErrorMessage('Empleado no encontrado')
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >


        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Ingresa tu código</Text>

            <Input placeholder="Código"
              value={code}
              placeholderTextColor={getPrimaryColor()}// Cambia el color del placeholder
              style={{ margin: 2, padding: 0, marginTop: 10, fontSize: 20 }}
              inputStyle={{
                color: getPrimaryColor(),
              }}
              onChangeText={(response) => {
                checkCode(response)
              }}
            ></Input>


            {/* {employees &&

              <View>
                <Picker
                  selectedValue={selectedLanguage}
                  style={{ height: 50, width: '100%', justifyContent: 'center', textAlign: 'center' }}
                  onValueChange={(itemValue, itemIndex) =>
                    console.log(itemValue)
                    // setActiveEmployee(itemValue)
                  }>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                  {employees.success.map((employee) => (
                    <Picker.Item key={employee.id} label={employee.name + ' ' + employee.code} value={employee} />
                  ))}
                </Picker>
              </View>
            } */}


            <Button
              title="Cerrar"
              onPress={() => hideChangeUserModal()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '70%'
  },
});

export default ChangeUserModal;
