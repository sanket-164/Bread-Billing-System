import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { fetchCashiers, hireCashier } from "../../../Actions/admin.js"
import { deleteCashier } from '../../../Actions/admin.js';
import DefaultCashier from '../../../Images/default-profile.png';

function Cashiers({ theme }) {
  const [cashier, setCashier] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "Male",
    joinedAt: new Date().toLocaleDateString(),
    password: ""
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCashiers());
  }, [location, dispatch])

  const handleChange = (e) => {
    setCashier({
      ...cashier, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(hireCashier({ cashier: cashier }));
    setCashier({
      name: "",
      email: "",
      phone: "",
      gender: "Male",
      birthday: "",
      image: "",
      joinedAt: new Date().toLocaleDateString(),
      password: ""
    });
    navigate('/cashiers');
    document.getElementById("modalClose").click();
  }

  const [fire_Cashier, setFire_Cashier] = useState({
    id: 0,
    name: ""
  });

  const fireCashier = (e) => {
    let value = e.target.value.split(",");
    setFire_Cashier({
      id: value[0],
      name: value[1]
    })
  }

  const cashiers = useSelector((data) => data.cashiers);

  const navigateToCashier = (cashier) => { navigate(`/cashier`, { state: { cashier: cashier } }) };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className='m-3'>Cashiers</h2>
        <span className={`bg-${(theme.text === 'white' ? 'light' : 'dark')} rounded-2 h-50 m-3`}>
          <button type="button" className={`btn btn-outline-${theme.color} px-4`} data-bs-toggle="modal" data-bs-target="#hireCashierModal">Hire Cashier</button>
        </span>
      </div>
      <div className="modal fade" id="hireCashierModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="hireCashierModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content bg-${theme.color}`}>
            <div className="modal-header">
              <h5 className="modal-title" id="hireCashierModalLabel">Hire New Cashier</h5>
              <button type="button" id="modalClose" className={`btn-close bg-${(theme.text === 'white' ? 'light' : 'dark')}`} data-bs-dismiss="modal" aria-label="Close"
                onClick={() => {

                  setCashier({
                    name: "",
                    email: "",
                    phone: "",
                    gender: "Male",
                    birthday: "",
                    image: "",
                    joinedAt: new Date().toLocaleDateString(),
                    password: ""
                  })
                }
                }></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="cashier-image" className="form-label">Image</label>
                  <div id="cashier-image">
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setCashier({ ...cashier, image: base64 })}></FileBase>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Cashier's Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={cashier.name} onChange={handleChange} placeholder="Sanket" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" value={cashier.email} onChange={handleChange} placeholder="cashier@gmail.com" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Mobile No.</label>
                  <input type="number" className="form-control" id="phone" name="phone" value={cashier.phone} onChange={handleChange} placeholder="9844321321" required />
                </div>
                <label htmlFor="gender" className="form-label">Gender</label>
                <div id="gender" className="mb-2">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" onClick={handleChange} type="radio" name="gender" id="male" value="Male" required />
                    <label className="form-check-label" htmlFor="male">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" onClick={handleChange} type="radio" name="gender" id="female" value="Female" required />
                    <label className="form-check-label" htmlFor="female">Female</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" onClick={handleChange} type="radio" name="gender" id="other" value="Other" required />
                    <label className="form-check-label" htmlFor="other">Other</label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="birthday" className="form-label">Birthday</label>
                  <input type="date" className="form-control" id="birthday" name="birthday" value={cashier.birthday} onChange={handleChange} placeholder="50" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" value={cashier.password} onChange={handleChange} placeholder="Password" required />
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button type="submit" className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} px-4`} data-bs-toggle="modal" data-bs-target="#newCashierHiredModal">Hire Cashier</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {(cashiers.length !== 0) && (
        <div classsName='conatiner'>
          <table className={`table table-${theme.color} table-hover`}>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Birthday</th>
                <th scope="col">Bills</th>
                <th scope="col">FIRE</th>
              </tr>
            </thead>
            <tbody>

              {cashiers.map((cashier, i) => {
                return (<tr>
                  <th role="button" scope="row">{i + 1}</th>
                  <td role="button" onClick={() => navigateToCashier(cashier)}>
                    <img src={(cashier.image !== "") && (cashier.image !== undefined) ? cashier.image : DefaultCashier} alt={cashier.name} height="65px" width="65px" className={`rounded-2 border border-2 border-${(theme.text === 'white' ? 'light' : 'dark')}`} />
                  </td>
                  <td role="button" onClick={() => navigateToCashier(cashier)}>{cashier.name}</td>
                  <td role="button" onClick={() => navigateToCashier(cashier)}>{cashier.gender}</td>
                  <td role="button" onClick={() => navigateToCashier(cashier)}>{new Date(cashier.birthday).toLocaleDateString()}</td>
                  <td>
                    <button type="button" className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} w-100 my-2 btn-lg`} value={cashier._id} onClick={() => navigate('/cashier/bills', { state: { cashierId: cashier._id, cashierName: cashier.name } })}>
                      VIEW BILLS
                    </button>
                  </td>
                  <td>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#fireCashierModal" name="fire-btn" value={cashier._id + ',' + cashier.name} className="btn btn-danger w-100 my-2 btn-lg" onClick={fireCashier}>
                      FIRE
                    </button>
                  </td>
                </tr>)
              })}
            </tbody>
          </table>

          <div className="modal fade" id="fireCashierModal" tabIndex="-1" aria-labelledby="fireCashierModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className={`modal-content bg-${theme.color}`}>
                <div className="modal-header">
                  <h5 className="modal-title" id="fireCashierModalLabel">Fire {fire_Cashier.name}</h5>
                  <button type="button" className={`btn-close bg-${(theme.text === 'white' ? 'light' : 'dark')}`} data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="modal-body">
                    <h5>Are you sure you want to Fire {fire_Cashier.name}?</h5>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} px-4`} onClick={() => { dispatch(deleteCashier(fire_Cashier.id)); navigate("/cashiers") }} data-bs-dismiss="modal">YES</button>
                  <button type="button" className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} px-4`} data-bs-dismiss="modal">NO</button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="newCashierHiredModal" tabIndex="-1" aria-labelledby="newCashierHiredModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className={`modal-content bg-${theme.color}`}>
                <div className="modal-header">
                    <h5>New Cashier Hired</h5>
                  <button type="button" className={`btn-close bg-${(theme.text === 'white' ? 'light' : 'dark')}`} data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} px-4`} onClick={() => { navigate("/cashiers"); }} data-bs-dismiss="modal">Okay</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }

      {(cashiers.length === 0) && (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "50vh" }}>
          <h2>Cashiers Don't Exist</h2>
        </div>
      )}

    </div>
  )
}

export default Cashiers
