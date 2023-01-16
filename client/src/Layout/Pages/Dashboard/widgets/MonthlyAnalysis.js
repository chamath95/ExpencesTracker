import React, { useEffect, useState } from 'react'
import { VictoryTheme, VictoryAxis, VictoryBar, VictoryChart } from "victory";

import { yearlyExpenses } from "../../../../_Services/ExpensesService"

export default function MonthlyAnalysis(props) {
    const [year] = useState(new Date())
    const [yearlyExpense, setYearlyExpense] = useState([])
    const monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    useEffect(() => {
        yearlyExpenses({ year: year.getFullYear() }).then((data) => {
            if (data.error) {
                return
            }
            setYearlyExpense(data)
        })
    }, [props])

    return (
        <div className='dashboard'>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6>Monthly Analysis</h6>
                            <VictoryChart
                                theme={VictoryTheme.material}
                                domainPadding={10}
                                height={300}
                                width={450}>
                                <VictoryAxis />
                                <VictoryBar
                                    categories={{
                                        x: monthStrings
                                    }}
                                    style={{ data: { fill: "#69f0ae", width: 20 }, labels: { fill: "#01579b" } }}
                                    data={yearlyExpense.monthTot}
                                    x={monthStrings['x']}
                                    domain={{ x: [0, 13] }}
                                    labels={({ datum }) => `$${datum.y}`}
                                />
                            </VictoryChart>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
}