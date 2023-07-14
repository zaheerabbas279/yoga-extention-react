import React, { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import Swal from "sweetalert2";

import { GlobalFilter } from "../Table/GlobalFilter";
import "./styles.css";
import {
  deletePoseService,
  editPoseService,
} from "../../Services/API Services/PosesServices";

export const PosesTable = (props) => {
  // states
  const [rowData, setRowData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [delStatus, setDelStatus] = useState("");
  const [editPoseData, setEditPoseData] = useState({});

  let defaultValue = "";
  const columns = useMemo(
    () => [
      {
        Header: "English Name",
        accessor: "english_name",
      },
      {
        Header: "Sanskrit Name",
        accessor: "sanskrit_name",
      },
      {
        Header: "Sanskrit Name Adapted",
        accessor: "sanskrit_name_adapted",
      },
      {
        Header: "Translation Name",
        accessor: "translation_name",
      },
      {
        Header: "Status",
        accessor: (d) => {
          if (d.status === 0) {
            return `Active`;
          } else {
            return `Deleted`;
          }
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (tableProps) => (
          <div className="d-flex flex-row justify-content-center align-items-center">
            <button
              className="btn btn-primary mr-1 _buttonclass"
              data-toggle="modal"
              data-target="#editPose"
              onClick={() => editpose(tableProps.cell.row.original)}
            >
              Edit
            </button>
            <button
              className="btn btn-secondary mr-1 _buttonclass"
              data-toggle="modal"
              data-target="#viewmodal"
              onClick={() => viewData(tableProps.cell.row.original)}
            >
              View
            </button>

            {tableProps.cell.row.original.status === 0 ? (
              <>
                <button
                  className="btn btn-danger mr-1 _buttonclass"
                  data-toggle="modal"
                  data-target="#deleteModal"
                  onClick={() =>
                    deleteAndActive(tableProps.cell.row.original, 1)
                  }
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-info mr-1 _buttonclass"
                  data-toggle="modal"
                  data-target="#deleteModal"
                  onClick={() =>
                    deleteAndActive(tableProps.cell.row.original, 0)
                  }
                >
                  Activate
                </button>
              </>
            )}
          </div>
        ),
      },
    ],
    []
  );
  const data = useMemo(() => props.data);

  const {
    tableInstance,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const { globalFilter, pageSize, pageIndex } = state;

  const viewData = (data) => {
    setRowData(data);
  };

  const deleteAndActive = (data, _status) => {
    setDeleteData(data);
    setDelStatus(_status);
  };

  const editpose = (data) => {
    setEditPoseData(data);
    setEditPoseForm(data);
  };

  const deletepose = async () => {
    let payload = {
      status: delStatus,
    };

    let deleteRes = await deletePoseService(deleteData.id, payload);

    document.getElementById("closeDeleteModal").click();

    if (delStatus === 1) {
      if (deleteRes.status === 200) {
        Swal.fire({
          icon: "success",
          // title: res?.status,
          text: "Deleted the pose successfully!",
        });
      }
    }

    if (delStatus === 0) {
      if (deleteRes.status === 200) {
        Swal.fire({
          icon: "success",
          // title: res?.status,
          text: "Activated the pose successfully!",
        });
      }
    }

    props.getAllPosesList();
  };

  // data for the form to edit
  const [editPoseForm, setEditPoseForm] = useState({
    english_name: editPoseData.english_name,
    sanskrit_name: editPoseData.sanskrit_name,
    sanskrit_name_adapted: editPoseData.sanskrit_name_adapted,
    translation_name: editPoseData.translation_name,
    pose_benefits: editPoseData.pose_benefits,
    pose_description: editPoseData.pose_description,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "english_name") {
      setEditPoseForm({
        ...editPoseForm,
        english_name: value,
      });
    }
    if (name === "sanskrit_name") {
      setEditPoseForm({
        ...editPoseForm,
        sanskrit_name: value,
      });
    }
    if (name === "sanskrit_name_adapted") {
      setEditPoseForm({
        ...editPoseForm,
        sanskrit_name_adapted: value,
      });
    }
    if (name === "translation_name") {
      setEditPoseForm({
        ...editPoseForm,
        translation_name: value,
      });
    }
    if (name === "pose_benefits") {
      setEditPoseForm({
        ...editPoseForm,
        pose_benefits: value,
      });
    }
    if (name === "pose_description") {
      setEditPoseForm({
        ...editPoseForm,
        pose_description: value,
      });
    }
  };

  const updatePose = async () => {
    console.log("edit pose values", editPoseForm);

    let editPoseRes = await editPoseService(editPoseData.id, editPoseForm);
    // closeeditmodal

    if (editPoseRes.status === 200) {
      document.getElementById("closeeditmodal").click();
      Swal.fire({
        icon: "success",
        // title: res?.status,
        text: "Updated the pose successfully!",
      });
      props.getAllPosesList();
    } else {
      console.log("error", editPoseRes);
      Swal.fire({
        icon: "error",
        // title: error.message,
        text: `error updating the pose, ${editPoseRes.data.message}`,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  };

  // delete modal states and function

  return (
    <>
      {/* <h2>Products</h2> */}
      <div className="mt-3 mb-3">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div className="card px-2">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <img
                            src={Images.downarrow}
                            alt=""
                            className="arrowsIcon"
                          />
                        ) : (
                          <img
                            src={Images.uparrow}
                            alt=""
                            className="arrowsIcon"
                          />
                        )
                      ) : (
                        ""
                      )}
                    </span> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {props.data.length === 0 ? (
            <tbody>
              <div className="p-2">No countries available</div>
            </tbody>
          ) : (
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}

          {/* */}
        </table>
        {/* pagination section */}
        <div className="d-flex align-items-center mb-3">
          <div className="mx-2 mt-2">
            <select
              value={pageSize}
              className="selectTagCountry mb-3"
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value="" disabled>
                Select
              </option>
              {[5, 10, 15, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="w-100 text-center mt-3 mb-1">
            <button
              className="mx-1 skipToBtn"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>
            <button
              className="mx-1 actionBtn"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Prev
            </button>
            <span className="mx-2 pageNumber">
              <strong>{pageIndex + 1}</strong>{" "}
            </span>
            <button
              className="mx-1 actionBtn"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
            <button
              className="skipToBtn"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>

      {/* MODAL TO VIEW THE POSE */}
      <div
        class="modal fade"
        id="viewmodal"
        tabindex="-1"
        aria-labelledby="viewmodalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="viewmodalLabel">
                View Pose
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
              <div className="poseData d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-end">
                  <label htmlFor="" className="mb-0">
                    English Name :{" "}
                  </label>
                  <p className="mb-0">
                    <strong>{rowData.english_name}</strong>
                  </p>
                </div>

                <img src={rowData.url_png} alt="" className="poseimg" />
              </div>

              <div className="d-flex">
                <label htmlFor="">Sanskrit Name : </label>
                <p>
                  <strong>{rowData.sanskrit_name}</strong>
                </p>
              </div>
              <div className="d-flex">
                <label htmlFor="">Sanskrit Name Adapted : </label>
                <p>
                  <strong>{rowData.sanskrit_name_adapted}</strong>
                </p>
              </div>
              <div className="d-flex">
                <label htmlFor="">Translation Name : </label>
                <p>
                  <strong>{rowData.translation_name}</strong>
                </p>
              </div>
              <label htmlFor="">Pose Benefits : </label>
              <p>
                <strong>{rowData.pose_benefits}</strong>
              </p>
              <label htmlFor="">Pose Description : </label>
              <p>
                <strong>{rowData.pose_description}</strong>
              </p>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* the delete modal  and to activate pose modal as well*/}
      <div
        class="modal fade"
        id="deleteModal"
        tabindex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">
                Delete Pose
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
              {/* Are you sure you want to delete the pose? */}

              {deleteData.status === 0 ? (
                <>Are you sure you want to delete the pose?</>
              ) : (
                <>Activate the pose?</>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                id="closeDeleteModal"
                data-dismiss="modal"
              >
                Close
              </button>

              {deleteData.status === 0 ? (
                <>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={deletepose}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={deletepose}
                  >
                    Activate
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* modal for to edit the poses */}
      <div
        class="modal fade"
        id="editPose"
        tabindex="-1"
        aria-labelledby="editPoseLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editPoseLabel">
                Edit Pose
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
              <div className="editposeformdiv">
                <form>
                  <div>
                    <div className="d-flex flex-column my-2">
                      <label htmlFor="">English Name</label>
                      <input
                        type="text"
                        name="english_name"
                        id="english_name"
                        className="input_tag"
                        defaultValue={editPoseForm.english_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex flex-column my-2">
                      <label htmlFor="">Sanskrit Name</label>
                      <input
                        type="text"
                        name="sanskrit_name"
                        id="sanskrit_name"
                        className="input_tag"
                        defaultValue={editPoseForm.sanskrit_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="d-flex flex-column my-2">
                      <label htmlFor="">Sanskrit Name Adapted</label>
                      <input
                        type="text"
                        name="sanskrit_name_adapted"
                        id="sanskrit_name_adapted"
                        className="input_tag"
                        defaultValue={editPoseForm.sanskrit_name_adapted}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex flex-column my-2">
                      <label htmlFor="">Translation Name</label>
                      <input
                        type="text"
                        name="translation_name"
                        id="translation_name"
                        className="input_tag"
                        defaultValue={editPoseForm.translation_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex flex-column my-2">
                      <label htmlFor="">Pose Benefits</label>

                      <textarea
                        name="pose_benefits"
                        id="pose_benefits"
                        cols="30"
                        rows="10"
                        className="textarea_"
                        onChange={handleChange}
                        defaultValue={editPoseForm.pose_benefits}
                      ></textarea>
                    </div>
                    <div className="d-flex flex-column my-2">
                      <label htmlFor="">Pose Description</label>
                      <textarea
                        name="pose_description"
                        id="pose_description"
                        cols="30"
                        rows="10"
                        onChange={handleChange}
                        className="textarea_desc"
                        defaultValue={editPoseForm.pose_description}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                id="closeeditmodal"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={updatePose}
              >
                Update Pose
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
