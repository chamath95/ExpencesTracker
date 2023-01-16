import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export default function Filter(props) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [values, setValues] = useState({
        firstDay: new Date(),
        lastDay: new Date()
    })

    const onSubmit = (data) => {
        setValues({...values, ...data })
        props.updateFilter(data)
    }

    return (
        <div className='dashboard'>
            <div className='row'>
                <div className='col-sm-12 col-lg-12 col-md-12'>
                    <div className="card">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col'>
                                    <h6>Filter: </h6>
                                </div>
                            </div>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <div className='row justify-content-end'>
                                    <div className='col-sm-12 col-lg-5 col-md-5'>
                                        <div className="mb-3">
                                            <label>Start Date</label>
                                            <Controller
                                                control={control}
                                                defaultValue={new Date()}
                                                rules={{ required: true }}
                                                name='firstDay'
                                                render={({ field }) => (
                                                    <DatePicker
                                                        placeholderText='Select date'
                                                        className="form-control"
                                                        views={["year", "month", "date"]}
                                                        onChange={(date) => { field.onChange(date) }}
                                                        selected={field.value}
                                                    />
                                                )}
                                            />
                                            {errors.firstDay && <p className="text-danger">Please check the start date</p>}
                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-lg-5 col-md-5'>
                                        <div className="mb-3">
                                            <label>End Date</label>
                                            <Controller
                                                control={control}
                                                defaultValue={new Date()}
                                                rules={{ required: true }}
                                                name='lastDay'
                                                render={({ field }) => (
                                                    <DatePicker
                                                        placeholderText='Select date'
                                                        className="form-control"
                                                        views={["year", "month", "date"]}
                                                        onChange={(date) => { field.onChange(date) }}
                                                        selected={field.value}
                                                    />
                                                )}
                                            />
                                            {errors.lastDay && <p className="text-danger">Please check the start date</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className='row justify-content-end'>
                                    <div className='col right-align'>
                                    <Button variant="primary" type="submit">Filter</Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

