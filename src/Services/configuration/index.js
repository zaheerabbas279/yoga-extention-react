const baseURL = "http://localhost:8100";

export const configUrl = {
  getAllposesUrl: `${baseURL}/poses/getAllPosesLocally`,
  deletePoseById: `${baseURL}/poses/deletePoseById`,
  editPoseById: `${baseURL}/poses/editPose`,
  getAllCategories: `${baseURL}/categories/getOnlyCategories`,
  getAllDifficulties: `${baseURL}/difficulty/getAllDifficulties`,
  addNewPose: `${baseURL}/poses/addNewPose`,
};
