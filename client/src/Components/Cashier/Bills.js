import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBills } from "../../Actions/cashier.js"
import { useLocation } from 'react-router-dom';
function Bills({ theme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBills());
  }, [location, dispatch])

  const bills = useSelector((data) => data.cashier);

  const navigateToBill = (bill) => {
    navigate('/billreceipt', { state: { bill: bill, URL: '/bills' } });
  }

  return (
    <div>
      <h2 className='m-3'>Bills</h2>
      {(bills.length > 0) && (
        <div className='container'>
          <table className={`table table-${theme.color} table-hover`}>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Purchased At</th>
              </tr>
            </thead>
            <tbody>

              {bills.map((bill, i) => {
                return (<tr role="button" onClick={() => navigateToBill(bill)}>
                  <th scope="row" >{i + 1}</th>
                  <td>{bill.customer_name}</td>
                  <td>₹{bill.totalAmount}</td>
                  <td>{new Date(bill.purchasedAt).toLocaleString()}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>)
      }

      {
        (bills.length === 0) && (
          <div className="d-flex align-items-center justify-content-center" style={{ height: "50vh" }}>
            <h2>Bills Don't Exist</h2>
          </div>
        )
      }
    </div >
  )
}

export default Bills