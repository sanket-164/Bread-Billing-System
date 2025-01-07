import React, { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FileBase from "react-file-base64";
import { updateCashier } from '../../../Actions/admin.js';
import DefaultCashier from '../../../Images/default-profile.png';

const YourComponent = ({ theme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cashier, setCashier] = useState(location.state.cashier);

  const handleChange = (e) => {
    setCashier({
      ...cashier, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    console.log(cashier)
    e.preventDefault();
    dispatch(updateCashier(cashier._id, { cashier: cashier }));
  }

  const birthDate = new Date(cashier.birthday);
  const cashier_birthday = `${birthDate.getFullYear()}-${((birthDate.getMonth() + 1) < 10) ? `0${birthDate.getMonth() + 1}` : birthDate.getMonth() + 1}-${(birthDate.getDate() < 10) ? `0${birthDate.getDate()}` : birthDate.getDate()}`;

  return (
    <div className="container mt-3">
      <div className={`row bg-${theme.color} text-${theme.text}`}>
        <div className="col-lg-6 col-md-11">
          <img src={(cashier.image !== "") && (cashier.image !== undefined)? cashier.image : DefaultCashier} alt={cashier.name} className={`img-fluid mt-3 mb-3 px-2 py-1 w-100`} />
        </div>
        <div className="col-lg-6 col-md-12">
          <form onSubmit={handleSubmit} className='mt-3 h-100'>
            <table className="card-title w-100" cellPadding={4}>
              <tr>
                <td>
                  <label htmlFor="cashier-image" className="form-label">Image</label>
                  <div id="cashier-image">
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setCashier({ ...cashier, image: base64 })}></FileBase>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="cashier-name" className="form-label">Name</label>
                  <input className="form-control" type="text" name="name" id="cashier-name" value={cashier.name} onChange={handleChange}></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="cashier-email" className="form-label">Email</label>
                  <input className="form-control" type="text" name="email" id="cashier-amount" value={cashier.email} onChange={handleChange}></input></td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="cashier-phone" className="form-label">Mobile No</label>
                  <input className="form-control" type="text" name="phone" id="cashier-phone" value={cashier.phone} onChange={handleChange}></input></td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="cashier-gender" className="form-label m-1">Gender</label>
                  <div className="m-1" id='cashier-gender'>
                    <div className="form-check form-check-inline">
                      {(cashier.gender === 'Male') &&
                        <input className="form-check-input" onClick={handleChange} type="radio" name="gender" id="male" value="Male" checked />
                      }
                      {(cashier.gender !== 'Male') &&
                        <input className="form-check-input" onClick={handleChange} type="radio" name="gender" id="male" value="Male" />
                      }
                      <label className="form-check-label" htmlFor="male">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      {(cashier.gender === 'Female') &&
                        <input className="form-check-input" onClick={handleChange} type="radio" name="gender" id="female" value="Female" checked />
                      }
                      {(cashier.gender !== 'Female') &&
                        <input className="form-check-input" onClick={handleChange} type="radio" name="gender" id="female" value="Female" />
                      }
                      <label className="form-check-label" htmlFor="female">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                      {(cashier.gender === 'Other') &&
                        <input className="form-check-input" onClick={handleChange} type="radio" name="gender" id="other" value="Other" checked />
                      }
                      {(cashier.gender !== 'Other') &&
                        <input className="form-check-input" onClick={handleChange} type="radio" name="gender" id="other" value="Other" />
                      }
                      <label className="form-check-label" htmlFor="other">Other</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="cashier-birthday" className="form-label">Birthday</label>
                  <input className="form-control" type="date" name="birthday" id="cashier-birthday" value={cashier_birthday} onChange={handleChange}></input></td>
              </tr>
            </table>
            <div className="d-flex justify-content-between align-items-end mt-3">
              <Link to="/cashiers" className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} px-4`}>Go Back</Link>
              <button type='submit' className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} px-4`} data-bs-toggle="modal" data-bs-target="#cashierProfileChangedModal">UPDATE</button>
            </div>
          </form>
        </div>
      </div>

      <div className="modal fade" id="cashierProfileChangedModal" tabIndex="-1" data-bs-keyboard="false" aria-labelledby="cashierProfileChangedModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content bg-${theme.color}`}>
            <div className="modal-header">
              <h5>Profile Changed</h5>
              <button type="button" className={`btn-close bg-${(theme.text === 'white' ? 'light' : 'dark')}`} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button type="button" className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} px-4`} onClick={() => { navigate(`/cashier`, { state: { cashier: cashier } }); }} data-bs-dismiss="modal">Okay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;