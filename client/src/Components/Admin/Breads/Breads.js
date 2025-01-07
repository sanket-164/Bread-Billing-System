import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBreads } from "../../../Actions/admin.js";
import { useLocation } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { deleteBread, addBread } from '../../../Actions/admin.js';
import DefaultBread from '../../../Images/default-bread.png'

function Breads({ theme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [bread, setBread] = useState({ name: "", amount: "", description: "", image: "" });

  useEffect(() => {
    dispatch(fetchBreads());
  }, [location, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBread({ bread: bread }));
    setBread({ name: "", amount: "", description: "", image: "" });
    navigate('/breads');
    document.getElementById("breadModalClose").click();
  }

  const handleChange = (e) => {
    setBread({ ...bread, [e.target.name]: e.target.value })
  }

  const [remove_Bread, setRemove_Bread] = useState({
    id: 0,
    name: ""
  });

  const removeBread = (e) => {
    let value = e.target.value.split(",");
    setRemove_Bread({
      id: value[0],
      name: value[1]
    })
  }

  const breads = useSelector((data) => data.breads);

  const navigateToBread = (bread) => { navigate(`/bread`, { state: { bread: bread } }) };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className='m-3'>Breads</h2>
        <span className={`bg-${(theme.text === 'white' ? 'light' : 'dark')} rounded-2 h-50 m-3`}>
          <button type="button" className={`btn btn-outline-${theme.color} px-4`} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add New Bread</button>
        </span>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className={`modal-content bg-${theme.color}`}>
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Enter Details for New Bread</h5>
                <button type="button" id="breadModalClose" className={`btn-close bg-${(theme.text === 'white' ? 'light' : 'dark')}`} data-bs-dismiss="modal" aria-label="Close" onClick={() => setBread({ name: "", amount: "", description: "", image: "" })}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="bread-image" className="form-label">Image</label>
                    <div id="bread-image">
                      <FileBase type="file" multiple={false} onDone={({ base64 }) => setBread({ ...bread, image: base64 })}></FileBase>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlhtmlFor="name" className="form-label">Bread's Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={bread.name} onChange={handleChange} placeholder="Bread" required />
                  </div>
                  <div className="mb-3">
                    <label htmlhtmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" id="amount" name="amount" value={bread.amount} onChange={handleChange} placeholder="50" required />
                  </div>
                  <div className="mb-3">
                    <label htmlhtmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="5" value={bread.description} placeholder="This bread is.." onChange={handleChange}></textarea>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="submit" data-bs-toggle="modal" data-bs-target="#newBreadAddedModal" className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')}`}>Add New Bread</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {(breads.length !== 0) && (
        <div className='container'>
          <table className={`table table-${theme.color} table-hover fs-5`}>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                <th scope="col">REMOVE</th>
              </tr>
            </thead>
            <tbody>

              {breads.map((bread, i) => {
                return (<tr role="button">
                  <th scope="row">{i + 1}</th>
                  <td onClick={() => navigateToBread(bread)}>
                    <img src={(bread.image !== "") && (bread.image !== undefined) ? bread.image : DefaultBread} alt={bread.name} height="65px" width="65px" className={`rounded-2 border border-2 border-${(theme.text === 'white' ? 'light' : 'dark')}`} />
                  </td>
                  <td onClick={() => navigateToBread(bread)}>{bread.name}</td>
                  <td onClick={() => navigateToBread(bread)}>₹{bread.amount}</td>
                  <td>
                    <button type="button" className="btn btn-danger btn-lg w-100 my-2" data-bs-toggle="modal" data-bs-target="#removeBreadModal" value={bread._id + ',' + bread.name} onClick={removeBread}>
                      REMOVE
                    </button>
                  </td>
                </tr>)
              })}
            </tbody>
          </table>

          <div className="modal fade" id="removeBreadModal" tabIndex="-1" aria-labelledby="removeBreadModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className={`modal-content bg-${theme.color}`}>
                <div className="modal-header">
                  <h5 className="modal-title" id="removeBreadModalLabel">Remove {remove_Bread.name}</h5>
                  <button type="button" className={`btn-close bg-${(theme.text === 'white' ? 'light' : 'dark')}`} data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="modal-body">
                    <h5>Are you sure you want to Remove {remove_Bread.name}?</h5>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} px-4`} onClick={() => { dispatch(deleteBread(remove_Bread.id)); navigate("/breads") }} data-bs-dismiss="modal">YES</button>
                  <button type="button" className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} px-4`} data-bs-dismiss="modal">NO</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }

      {(breads.length === 0) && (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "50vh" }}>
          <h2>Breads Don't Exist</h2>
        </div>
      )}

      <div className="modal fade" id="newBreadAddedModal" tabIndex="-1" data-bs-keyboard="false" aria-labelledby="newBreadAddedModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content bg-${theme.color}`}>
            <div className="modal-header">
              <h5>New Bread Added</h5>
              <button type="button" className={`btn-close bg-${(theme.text === 'white' ? 'light' : 'dark')}`} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button type="button" className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} px-4`} onClick={() => { navigate("/breads"); }} data-bs-dismiss="modal">Okay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breads
