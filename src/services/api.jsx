import axios from "axios";

const BASE_URL = `https://us-central1-api-skinstric-ai.cloudfunctions.net`;

export const getConfirmation = async (data) => {
  const results = await axios.post(`${BASE_URL}/skinstricPhaseOne`, data);
  return results.data;
};

export const getUploadedImage = async (convertedImage) => {
  const result = await axios.post(
    `${BASE_URL}/skinstricPhaseTwo`,
    convertedImage
  );
  return result.data;
};
