import React, { useEffect, useState } from 'react'
import { currentMonthPreview } from "../../../../_Services/ExpensesService"

const MONTHLY_LIMIT = 10000;

export default function SpendHistory(props) {
    const [expenceSummery, setExpenceSummery] = useState({ month: 0, today: 0, yesterday: 0 })

    useEffect(() => {
        currentMonthPreview().then((data) => {
            if (data.error) {
                return
            } else {
                setExpenceSummery(data)
            }
        })
    }, [props])

    const getExpencePrentage = () => {
        var expense_month = expenceSummery.month ? expenceSummery.month.totalSpent : 0
        var prentage = expense_month / MONTHLY_LIMIT * 100;

        return prentage
    };

    const getExpencePrentageStyle = () => {
        var prentage = getExpencePrentage()

        if (prentage < 70) {
            return "progress-bar bg-success"
        } else if (prentage < 90) {
            return "progress-bar bg-warning"
        } else {
            return "progress-bar bg-danger"
        }
    };

    const getRemainingAmount = () => {
        var expense_month = expenceSummery.month ? expenceSummery.month.totalSpent : 0
        let balance = MONTHLY_LIMIT - expense_month

        return (balance < 0 ? 0 : balance).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    };

    const getBudgetComment = () => {
        var prentage = getExpencePrentage()

        if (prentage < 70) {
            return "healthy"
        } else if (prentage < 90) {
            return "Risky"
        } else if (prentage < 101) {
            return "High Risky"
        } else {
            return "You exceeds your budget"
        }
    };


    return (
        <div className='dashboard'>
            <br />
            <div className='row'>
                <div className='col-sm-12 col-lg-12 col-md-12'>
                    <div className="card">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-sm-12 col-lg-4 col-md-4 center-align'>
                                    <div className='row'>
                                        <div className='col'>
                                            <h5>Your Monthly Allocation - LKR {MONTHLY_LIMIT.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h5>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className="numberCircle">
                                                <p>Your Remain Budget</p>
                                                LKR
                                                <p className='amount-font'>{getRemainingAmount()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-12 col-lg-8 col-md-8'>
                                    <h5>Expences Summery</h5>
                                    <div className="progress">
                                        <div className={getExpencePrentageStyle()} role="progressbar" style={{ width: getExpencePrentage() + "%" }} aria-valuenow={getExpencePrentage()} aria-valuemin="0" aria-valuemax="100">{getExpencePrentage() < 100 ? getExpencePrentage() : 100 + "%"}</div>
                                    </div>
                                    <div>Your Budget - <i>{getBudgetComment()}</i></div>
                                    <br />
                                    <div className='row'>
                                        <div className='col-sm-12 col-lg-4 col-md-4'>
                                            <div className="card card-bottom">
                                                <div className="card-body">
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <p>Today</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col right-align'>
                                                            <span style={{ fontSize: 25 }}>{(expenceSummery.today ? expenceSummery.today.totalSpent : 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span> <sub>LKR</sub>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-sm-12 col-lg-4 col-md-4'>
                                            <div className="card card-bottom">
                                                <div className="card-body">
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <p>Yesterday</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col right-align'>
                                                            <span style={{ fontSize: 25 }}>{(expenceSummery.yesterday ? expenceSummery.yesterday.totalSpent : 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span> <sub>LKR</sub>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-sm-12 col-lg-4 col-md-4'>
                                            <div className="card card-bottom">
                                                <div className="card-body">
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <p>This Month</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col right-align'>
                                                            <span style={{ fontSize: 25 }}>{(expenceSummery.month ? expenceSummery.month.totalSpent : 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span> <sub>LKR</sub>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12 col-lg-12 col-md-12'>

                </div>
            </div>
        </div>
    )
}

