import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Logout () {

  const history = useHistory()
  function logout() {
    localStorage.removeItem('jwt')
    history.push('/login')
  }

    return (
        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            </div>
            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
              <button className="btn btn-success" onClick={() => logout()} data-dismiss="modal">Logout</button>
            </div>
          </div>
        </div>
      </div>
    )
}