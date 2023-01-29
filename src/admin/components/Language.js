import React from 'react'
import './Language.css'

export default function Language({value, setValue}) {
    return (
        <div className="form-group">
        <label htmlFor="lang" className="col-form-label">
          Language:
        </label>
        <select id="lang" name="Lang" className="form-select language-select ml-2" value={value} onChange={setValue}>
          <option value="en">English</option>
          <option value="vi">Vietnamese</option>
        </select>
      </div>
    )
}