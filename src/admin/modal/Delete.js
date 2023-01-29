import React from "react";
import $ from 'jquery'
import { useHistory } from "react-router-dom";

export default function Delete({ reload, link }) {
    const history = useHistory;
  function detele() {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      }
    };
    
    fetch(
      link,
      requestOptions
    )
      .then((res) => {
        if (res.status === 200) {
          reload();
          $("#deleteModal").modal("hide");
        } else if (res.status === 401) {
          history.push("/login");
        } else {
          alert(res.statusText);
        }
      })
      .catch((error) => alert(error.message));
  }

  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Delete confirm?
            </h5>
          </div>
          <div className="modal-body">Do you want delete this item?</div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => detele()}
              data-dismiss="modal"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
