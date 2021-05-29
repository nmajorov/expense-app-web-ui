import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalBody from 'react-bootstrap/ModalBody';

const trashIcon = <FontAwesomeIcon icon={faTrashAlt} />;
const editIcon = <FontAwesomeIcon icon={faEdit} />;
const arrovUpIcon = <FontAwesomeIcon icon={faArrowUp} />;
const arrovDownIcon = <FontAwesomeIcon icon={faArrowDown} />;


const ReportView = () => {
  // const [count, setCount] = React.useState(0);
  /**
      * sort expenses by id
      */
  const sortBy = (sort: string) => {
    // this.props.startLoading();
    // this.props.getExpenses(this.props.sso, this.props.reportid,sort);
  }


  const renderDeleteDialog = () => {
    return (

      <Modal
        id="versionPopUp"
        show={() => {
          return false;
          // showModal
        }
        }
        onHide={() => {

          console.info("close modal");
          //  closeDeleteModalWindow
        }}
      >
        <ModalHeader translate closeButton>
          <ModalTitle>
            Delete Expense {
              // selectedExpenseID
            }
          </ModalTitle>
        </ModalHeader>

        <ModalBody>Are you sure ?</ModalBody>

        <ModalFooter>
          <Button
            variant="secondary"
            onClick={
              () => { }// closeDeleteModalWindow
            }
          >
            Close
              </Button>
          <Button
            variant="danger"
            onClick={() => { }
              //  deleteExpense(/**selectedExpenseID**/)
            }
          >
            Delete
              </Button>
        </ModalFooter>
      </Modal>
    );
  }


  /**
   * trigger delete of expense by id
   *
   */
  const deleteExpense = (id) => {
    // this.closeDeleteModalWindow();
    // this.props.deleteExpense(this.props.sso, id);
  };

  const calculateTotalAmount = () => {
    /**
      const amountArray = this.props.expenses.map((pr) => {
          return pr.amount;
      });
    
      const numOr0 = (n) => (isNaN(n) ? 0 : n);
    
      return amountArray
          .reduce(function (acc, val) {
              return numOr0(acc) + numOr0(val);
          }, 0)
          .toFixed(2);
    
     **/

    /**
     * trigger load of expenses from backend
     */
    const loadExpensesFromBackend = () => {
      //  this.props.startLoading();
      // this.props.getExpenses(this.props.sso, this.props.reportid);
    };

    const closeDeleteModalWindow = () => {
      // console.log("closeDeleteModalWindow called");
      // this.props.hideOrShowDeleteModal();
    };

    const openDeleteModalWindow = (id) => {
      //     if (!store.getState().expensesState.showModal) {
      //       this.props.hideOrShowDeleteModal(id);
      //   }
    };

    const callEdit = (id) => {
      // this.props.history.push(`/expenses/edit/${id}`);
    };

  }


  return (
    /**
     * render table with expenses
     */


    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#   <button onClick={() => sortBy("id_asc")}>{arrovUpIcon}</button>
                            &nbsp;  &nbsp;
                    <button onClick={() => sortBy("id_desc")}>{arrovDownIcon}</button></th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date  <button onClick={() => sortBy("created_asc")}>{arrovUpIcon}</button>
                              &nbsp;  &nbsp;
                      <button onClick={() => sortBy("created_desc")}>{arrovDownIcon}</button>
            </th>
            <th>Last Modified</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
          </tr>
          <tr>
            <td>
              <b>Total:</b>
            </td>
            <td>&#8203;</td>
            <td>
              <b>{calculateTotalAmount} </b>
            </td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
          </tr>
        </tbody>
      </Table>
    </>
  );

};

export default ReportView;
