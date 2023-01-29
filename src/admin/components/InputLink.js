import React from "react";
import { generatePath } from "../../common";

export default function InputLink({ title, value, setValue }) {
  function createPath() {
    if (!title) {
      alert("Please input Title!");
      return;
    }
    setValue({
      target: {
        name: "Link",
        value: generatePath(title),
      },
    });
  }

  return (
    <div className="form-group">
      <label className="col-form-label">Path:</label>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control mr-4"
          placeholder="Input path"
          name="Link"
          value={value}
          onChange={setValue}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={createPath}
        >
          Generate Path
        </button>
      </div>
    </div>
  );
}
