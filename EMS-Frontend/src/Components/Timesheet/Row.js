import React from 'react'
import { MdWork } from "react-icons/md";
const Row = ({row}) => {
 
  return (
    <>
    
        <tr id='TRow'>
              <td>{row}.</td>
              <td>
                <select className="border-1" style={{border:'none',borderBottom:'3px solid #6ca992',background:'transparent' ,outline:'none'}}>
                  <option value="">Select Client</option>
                  <option value="">L&D</option>
                  <option value="">XYZ developers</option>
                </select>
              </td>
              <td>
                <select className="border-1" style={{border:'none',borderBottom:'3px solid #6ca992',background:'transparent' ,outline:'none'}}>
                  <option value="">Select Project</option>
                  <option value="">Zoho Clone</option>
                  <option value="">Project B</option>
                </select>
              </td>
              <td>
                <select className=" border-1" style={{border:'none',borderBottom:'3px solid #6ca992',background:'transparent' ,outline:'none'}}>
                  <option value="">Select Job</option>
                  <option value="">xyz abc</option>
                  <option value="">assistant </option>
                </select>
              </td>
             
              <td>
                <div className="d-flex" style={{width:'240px'}}>
                  <input type="text" className="mx-1  border-1" style={{width:'100%',
                  overflow:'scroll',
                  border:'none',borderBottom:'3px solid #6ca992',background:'transparent' ,outline:'none'}} />
                  <MdWork size={20}/>
                </div>
              </td>
              <td>
                <select className=" border-1"  style={{border:'none',borderBottom:'3px solid #6ca992',background:'transparent' ,outline:'none'}}>
                  <option value="">Billable</option>
                  <option value="">Non-Billable</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className="border-1"
                  style={{ width: "53px" ,
                  border:'none',borderBottom:'3px solid #6ca992',background:'transparent' ,outline:'none'}}
                  
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  className="border-1"
                  style={{ width: "53px",
                  border:'none',borderBottom:'3px solid #6ca992',background:'transparent' ,outline:'none'}}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  className="border-1"
                  style={{ width: "53px",
                  border:'none',borderBottom:'3px solid #6ca992',background:'transparent' ,outline:'none'}}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  className="border-1"
                  style={{ width: "53px",
                  border:'none',borderBottom:'3px solid #6ca992',background:'transparent' ,outline:'none' }}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  className="border-1"
                  style={{ width: "53px",
                  border:'none',borderBottom:'3px solid #6ca992',background:'transparent' ,outline:'none' }}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  className="border-1"
                  style={{ width: "53px",
                  border:'none',borderBottom:'3px solid #6ca992',background:'transparent' ,outline:'none' }}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  className="border-1  "
                  style={{ width: "53px" ,
                  border:'none',borderBottom:'3px solid #6ca992',background:'transparent',outline:'none'}}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  className="border-1"
                  style={{ width: "53px",
                  border:'none',borderBottom:'3px solid #6ca992',background:'transparent',outline:'none' }}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  className="border-1"
                  style={{ width: "53px",
                  border:'none',borderBottom:'3px solid #6ca992',background:'transparent',outline:'none' }}
                ></input>
              </td>
            
            </tr>
    
    </>
  )
}

export default Row;