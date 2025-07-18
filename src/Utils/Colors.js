import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_COLORS = {
  PRIMARY_COLOR: "#aaaaaa",
  SECONDARY_COLOR: "#6495ED",
  BACKGROUND_COLOR: "#ffffff",
  TEXT_COLOR: "#ffffff",
};

let config = { ...DEFAULT_COLORS };

async function loadColorsFromAsyncStorage() {
  try {
    const savedColors = JSON.parse(await AsyncStorage.getItem('colors'));
    if (savedColors) {
      config = {
        ...DEFAULT_COLORS,
        ...savedColors,
      };
    }
  } catch (error) {
  }
}

loadColorsFromAsyncStorage();

export function getBackgroundColor() {
  return config.BACKGROUND_COLOR;
}

export function getPrimaryColor() {
  return config.PRIMARY_COLOR;
}

export function getSecondaryColor() {
  return config.SECONDARY_COLOR;
}

export function getTextColor() {
  return config.TEXT_COLOR;
}

export const setColors= async(newColors)=> {
  let primary = newColors.primary??PRIMARY_COLOR
  let secondary = newColors.secondary??SECONDARY_COLOR
  let background = newColors.background??BACKGROUND_COLOR
  let text = newColors.text??TEXT_COLOR
  newColors ={
     primary,
     secondary,
     background,
     text,
    }
  
  config = {
    ...DEFAULT_COLORS,
    ...newColors,
  };

  try {
    AsyncStorage.setItem('colors', JSON.stringify(config));
  } catch (error) {
  }
}

// Para usar la función setColors, puedes proporcionar un objeto con los colores que deseas actualizar, por ejemplo:
// setColors({ PRIMARY_COLOR: "#ff0000", BACKGROUND_COLOR: "#e0e0e0" });
