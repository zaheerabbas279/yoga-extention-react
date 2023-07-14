import { configUrl } from "../configuration";
import axios from "axios";

export const getAllPosesService = async () => {
  const response = await axios.get(configUrl.getAllposesUrl);
  if (response) {
    return response;
  } else {
    console.log("get all poses service error");
  }
};

export const deletePoseService = async (id, data) => {
  const response = await axios.put(`${configUrl.deletePoseById}/${id}`, data);
  if (response) {
    return response;
  } else {
    console.log("error deleting the pose");
  }
};

export const editPoseService = async (id, data) => {
  const response = await axios.put(`${configUrl.editPoseById}/${id}`, data);

  if (response) {
    return response;
  } else {
    console.log("error updating the pose");
  }
};

export const getAllCategoriesService = async () => {
  const response = await axios.get(`${configUrl.getAllCategories}`);
  if (response) {
    return response;
  } else {
    console.log("error getting all the categories");
  }
};

export const getAllDifficultyServices = async () => {
  const response = await axios.get(`${configUrl.getAllDifficulties}`);
  if (response) {
    return response;
  } else {
    console.log("error getting the list of the difficulties");
  }
};

export const addNewPose = async (data) => {
  console.log("🚀 ~ file: PosesServices.js:51 ~ addNewPose ~ data:", data);
  const response = await axios.post(`${configUrl.addNewPose}`, data);
  if (response) {
    return response;
  } else {
    console.log("error adding the pose");
  }
};
