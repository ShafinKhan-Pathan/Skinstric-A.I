import axios from "axios";

const BASE_URL = `https://us-central1-api-skinstric-ai.cloudfunctions.net`;

export const submitPhaseOne = async (phaseOneData) => {
  try {
    const results = await axios.post(
      `${BASE_URL}/skinstricPhaseOne`,
      phaseOneData
    );
    return results.data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

export const submitPhaseTwo = async (convertedImage) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/skinstricPhaseTwo`,
      convertedImage
    );
    return result.data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};
