import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import Nav from "react-bootstrap/Nav";
import CategoriesTable from "../../components/Categories/categoryTable";
import { PosesTable } from "../../components/Poses/posesTable";
import {
  addNewPose,
  getAllCategoriesService,
  getAllDifficultyServices,
  getAllPosesService,
} from "../../Services/API Services/PosesServices";

import Swal from "sweetalert2";

export const HomeComponents = () => {
  const [poses, setPoses] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [difficultiesList, setDifficultiesList] = useState([]);

  const getAllcategories = async () => {
    let res = await getAllCategoriesService();
    setCategoriesList(res.data.categories);
  };

  const getAllDifficulties = async () => {
    let res = await getAllDifficultyServices();
    // console.log("🚀 ~ file: index.js:24 ~ getAllDifficulties ~ res:", res);
    setDifficultiesList(res.data.difficulties);
  };

  useEffect(() => {
    getAllcategories();
    getAllDifficulties();
  }, []);

  const [poseData, setPoseData] = useState({
    english_name: "",
    sanskrit_name: "",
    sanskrit_name_adapted: "",
    translation_name: "",
    pose_benefits: "",
    pose_description: "",
    category_id: "",
    difficulty_id: "",
    url_svg:
      "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.svg",
    url_png:
      "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.svg",
    url_svg_alt:
      "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.svg",
  });

  useEffect(() => {
    getAllPosesList();
  }, []);

  const getAllPosesList = async () => {
    let res_ = await getAllPosesService();
    setPoses(res_.data.data);
  };

  const addnewpose = () => {
    console.log("clckedF");
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "english_name") {
      setPoseData({
        ...poseData,
        english_name: value,
      });
    }
    if (name === "sanskrit_name") {
      setPoseData({
        ...poseData,
        sanskrit_name: value,
      });
    }
    if (name === "sanskrit_name_adapted") {
      setPoseData({
        ...poseData,
        sanskrit_name_adapted: value,
      });
    }
    if (name === "translation_name") {
      setPoseData({
        ...poseData,
        translation_name: value,
      });
    }
    if (name === "pose_benefits") {
      setPoseData({
        ...poseData,
        pose_benefits: value,
      });
    }
    if (name === "pose_description") {
      setPoseData({
        ...poseData,
        pose_description: value,
      });
    }
    if (name === "category_id") {
      setPoseData({
        ...poseData,
        category_id: value,
      });
    }
    if (name === "difficulty_id") {
      setPoseData({
        ...poseData,
        difficulty_id: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let addPoseRes = await addNewPose(poseData);
    console.log(
      "🚀 ~ file: index.js:120 ~ handleSubmit ~ addPoseRes:",
      addPoseRes
    );

    if (addPoseRes.status === 200) {
      Swal.fire({
        icon: "success",
        // title: res?.status,
        text: "Added the pose successfully",
      });
      document.getElementById("closePoseModal").click();
    } else {
      Swal.fire({
        icon: "error",
        // title: error.message,
        text: `error adding the pose, ${addPoseRes.data.message}`,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container my-5">
        <h3>Poses</h3>
        <button
          className="btn btn-primary"
          onClick={addnewpose}
          data-toggle="modal"
          data-target="#addNewPoseModal"
        >
          Add new pose
        </button>

        <PosesTable data={poses} getAllPosesList={getAllPosesList} />

        {/* <div className="mt-4">
          <div className="row">
            <div className="col-3">
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className="nav-link active"
                  id="v-pills-home-tab"
                  data-toggle="pill"
                  data-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                  onClick={() => console.log("categories clicked!")}
                >
                  Categories
                </button>
                <button
                  className="nav-link"
                  id="v-pills-profile-tab"
                  data-toggle="pill"
                  data-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                  onClick={() => console.log("poses clicked!")}
                >
                  Poses
                </button>
              </div>
            </div>
            <div className="col-9">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <h5>Categories List</h5>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <h5>Poses List</h5>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* modal for the dropdown */}
      <div
        class="modal fade"
        id="addNewPoseModal"
        tabindex="-1"
        aria-labelledby="addNewPoseModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addNewPoseModalLabel">
                Add New Pose
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column my-2">
                  <label htmlFor="">English Name</label>
                  <input
                    type="text"
                    name="english_name"
                    placeholder="add english name "
                    className="input_tag"
                    onChange={handleChange}
                  />
                  <label htmlFor="">Sanskirt Name</label>
                  <input
                    type="text"
                    name="sanskrit_name"
                    placeholder="add sanskrit name "
                    className="input_tag"
                    onChange={handleChange}
                  />
                  <label htmlFor="">Sanskrit Name Adapted</label>
                  <input
                    type="text"
                    name="sanskrit_name_adapted"
                    placeholder="add sanskrit adapted name"
                    className="input_tag"
                    onChange={handleChange}
                  />
                  <label htmlFor="">Translation Name</label>
                  <input
                    type="text"
                    name="translation_name"
                    placeholder="add translation name"
                    className="input_tag"
                    onChange={handleChange}
                  />
                  <label htmlFor="">Pose benefits</label>
                  <input
                    type="text"
                    name="pose_benefits"
                    placeholder="enter pose benefits"
                    className="input_tag"
                    onChange={handleChange}
                  />
                  <label htmlFor="">Pose Description</label>
                  <input
                    type="text"
                    name="pose_description"
                    placeholder="enter pose description"
                    className="input_tag"
                    onChange={handleChange}
                  />
                  {/* select category and difficulty */}
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">
                      Select Category
                    </label>
                    <select
                      class="form-control"
                      id="exampleFormControlSelect1"
                      name="category_id"
                      onChange={handleChange}
                    >
                      {categoriesList.map((item) => {
                        return (
                          <option id={item.id} value={item.id}>
                            {item.category_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">
                      Select Difficulty
                    </label>
                    <select
                      class="form-control"
                      id="exampleFormControlSelect1"
                      name="difficulty_id"
                      onChange={handleChange}
                    >
                      {difficultiesList.map((item) => {
                        return (
                          <option id={item.id} value={item.id}>
                            {item.difficulty_level}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    id="closePoseModal"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Add Pose
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
