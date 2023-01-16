import React, { useState } from 'react'
import AddExpences from "./widgets/AddExpences"
import SpendHistory from "./widgets/SpendHistory"
import Filter from "./widgets/Filter"
import ExpensesSummery from "./widgets/ExpensesSummery"
import ExpencesByCategory from "./widgets/ExpencesByCategory"
import MonthlyAnalysis from "./widgets/MonthlyAnalysis"

export default function Dashboard(props) {
    const [values, setValues] = useState({
        FormData: {},
        filterData: {}
    })

    const updateDashboardOnAddItem = (value) => {
        setValues({ ...values, FormData: value })
    }

    const listenFilter = (value) => {
        setValues({ ...values, filterData: value })

        console.log(values, 'looooo')
    }


    return (
        <div className='dashboard'>
            <div className='row'>
                <div className='col-sm-12 col-lg-12 col-md-12'>
                    <AddExpences updateDashboardOnAddItem={updateDashboardOnAddItem} />
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12 col-lg-12 col-md-12'>
                    <SpendHistory />
                </div>
            </div>
            <br/>
            <div className='row'>
                <div className='col-sm-12 col-lg-6 col-md-6'>
                    <Filter updateFilter={listenFilter}/>
                    <br/>
                    <ExpencesByCategory filterData={values.filterData} mainValues={values}/>
                    <br/>
                </div>
                <div className='col-sm-12 col-lg-6 col-md-6'>
                    <ExpensesSummery filterData={values.filterData} mainValues={values}/>
                    <br/>
                    <MonthlyAnalysis mainValues={values}/>
                </div>
            </div>
        </div>
    )
}

