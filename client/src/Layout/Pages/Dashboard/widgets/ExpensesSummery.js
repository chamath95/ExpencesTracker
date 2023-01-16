import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { read, remove } from "../../../../_Services/ExpensesService"


export default function ExpensesSummery(props) {

  const [items, setItems] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const itemsPerPage = 5
  const endOffset = 0 + itemsPerPage;
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const [values, setValues] = useState({
    items: items,
    filterData: items.slice(0, endOffset)
  })


  useEffect(() => {
    getData()
  }, [props])

  const getData = () => {
    var date = new Date();

    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    if (props["filterData"] && props["filterData"].hasOwnProperty("firstDay")) {
      firstDay = props["filterData"]["firstDay"]
    }

    if (props["filterData"] && props["filterData"].hasOwnProperty("lastDay")) {
      lastDay = props["filterData"]["lastDay"]
    }

    var query = `?firstDay=${formatDate(firstDay)}&lastDay=${formatDate(lastDay)}`

    read(query).then((data) => {
      if (data.error) {
        return
      } else {
        setItems(data)
        setFilterData(data.slice(0, itemsPerPage))
        setValues({ items: data, filterData: filterData })
      }
    })
  }

  const formatDate = (d) => {
    var datestring = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    return datestring
  }

  const handlePageClick = (event) => {
    var start = event.selected * itemsPerPage
    var end = start + itemsPerPage

    // setItemOffset(newOffset);

    setFilterData(items.slice(start, end))
    setValues({ filterData: filterData })
  };

  const deleteItem = (column) => {
    remove(column._id).then((data) => {
      console.log(values)
      if (data.error) {
        return
      } else {
        getData()
      }
    })
  };

  return (
    <div className='dashboard'>
      <div className='row'>
        <div className='col-sm-12 col-lg-12 col-md-12'>
          <div className="card">
            <div className="card-body">
              <div className='row'>
                <div className='col' style={{ overflowX: "auto" }}>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Category</th>
                        {/* <th>Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <Items currentItems={filterData} deleteItem={deleteItem} />
                    </tbody>
                  </table>
                </div>
              </div>

              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Items({ currentItems, deleteItem }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedItem, setSelectedItem] = useState([]);

  const formatDate = (date) => {
    var d = new Date(date)
    var datestring = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    return datestring
  }

  const openDeleteModel = (data) => {
    handleShow()
    console.log(data)
    setSelectedItem(data)
  }

  const deleteSelectedItem = () => {
    deleteItem(selectedItem)
    setTimeout(
      () => handleClose(), 
      3000);
  }

  const formatCurrency = (amount) => {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }

  if (currentItems.length) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, i) =>
            <tr key={i}>

              <td>{formatDate(item.incurred_on)}</td>
              <td>{item.title}</td>
              <td>{formatCurrency(item.amount)}</td>
              <td>{item.category}</td>
              {/* <td><button type="button" className="btn btn-outline-danger" onClick={() => openDeleteModel(item)}>Remove</button></td> */}
            </tr>
          )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            Are you sure you want delete this item
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" type="submit" onClick={() => deleteSelectedItem()}>
              Delete
            </Button>
          </Modal.Footer>

        </Modal>
      </>
    );
  } else {
    return (
      <>
        <tr>
          <td colSpan={5} className="center-align">Data not available!</td>
        </tr>
      </>
    );
  }

}