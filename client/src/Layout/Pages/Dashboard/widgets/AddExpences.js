import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

import { create } from "../../../../_Services/ExpensesService"


export default function AddExpences(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    const { control, register, handleSubmit,formState, reset, formState: { errors } } = useForm();
    const { isSubmitting } = formState;

    const [values, setValues] = useState({
        title: '',
        category: '',
        amount: '',
        incurred_on: new Date(),
        notes: '',
        error: ''
    })

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value })
      }

    const onSubmit = (data) => {
        return new Promise(resolve => {
            data["incurred_on"] = new Date(data["incurred_on"])

            create(data).then((data) => {
                resolve();

                if (data.error) {
                    setValues({...values, error: data.error})
                } else {
                    reset()
                    props.updateDashboardOnAddItem(values)
                    handleClose()
                }
                console.log('lllll', values)
            })
        });
    }

    return (
        <div className='dashboard'>
            <div className="row">
                <div className="col text-right">
                    <Button variant="primary" onClick={handleShow}>
                        Add Expense
                    </Button>
                </div>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Expense</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="mb-3">
                            <label>Expences Title</label>
                            <input
                                placeholder='Expense Title'
                                className="form-control"
                                type="text"
                                onChange={handleChange('title')}
                                {...register("title", { required: true, maxLength: 50 })}
                            />
                            {errors.title && <p className="text-danger">Please check the expences title</p>}
                        </div>

                        <div className="mb-3">
                            <label>Amount</label>
                            <input
                                placeholder='amount'
                                className="form-control"
                                type="text"
                                onChange={handleChange('amount')}
                                {...register("amount", { required: true, pattern: /^[+-]?\d+(\.\d+)?$/ })}
                            />
                            {errors.amount && <p className="text-danger">Please check the amount</p>}
                        </div>

                        <div className="mb-3">
                            <label>Expenses Category</label>
                            <select className="form-select" onChange={handleChange('category')} defaultValue={''} {...register("category", { required: true })}>
                                <option value="" disabled>Please select the category</option>
                                <option value="Education">Education</option>
                                <option value="Finance">Finance</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.category && <p className="text-danger">Please check the category</p>}
                        </div>

                        <div className="mb-3">
                            <label>Incurred Date</label>
                            <Controller
                                control={control}
                                defaultValue={new Date()}
                                rules={{ required: true }}
                                name='incurred_on'
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText='Select date'
                                        className="form-control"
                                        views={["year", "month", "date"]}
                                        onChange={(date) => {field.onChange(date)}}
                                        selected={field.value}
                                    />
                                )}
                            />
                            {errors.incurred_on && <p className="text-danger">Please check the date</p>}
                        </div>

                        <div className="mb-3">
                            <label>Notes</label>
                            <textarea
                                placeholder='notes'
                                className="form-control"
                                onChange={handleChange('notes')}
                                type="text"
                                {...register("notes", { required: true,  maxLength: 200 })}
                            />
                            {errors.notes && <p className="text-danger">Please check the notes</p>}
                        </div>
                        <div className="mb-3">
                            {values.error && <p className="text-danger">{values.message}</p>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span> }
                            &nbsp;Create Expense&nbsp;
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div >
    )
}