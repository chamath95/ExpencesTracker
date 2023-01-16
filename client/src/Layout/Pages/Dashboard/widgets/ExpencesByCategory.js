import React, { useEffect, useState } from 'react'
import { VictoryPie, VictoryTheme, VictoryLabel } from "victory";
import { averageCategories } from "../../../../_Services/ExpensesService"

export default function ExpencesByCategory(props) {
    const [expenses, setExpenses] = useState([])

    const date = new Date(), y = date.getFullYear(), m = date.getMonth()
    const [firstDay, setFirstDay] = useState(new Date(y, m, 1))
    const [lastDay, setLastDay] = useState(new Date(y, m + 1, 0))

    useEffect(() => {
        var date = new Date();

        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        if (props["filterData"] && props["filterData"].hasOwnProperty("firstDay")) {
            firstDay = props["filterData"]["firstDay"]
        }

        if (props["filterData"] && props["filterData"].hasOwnProperty("lastDay")) {
            lastDay = props["filterData"]["lastDay"]
        }

        setFirstDay(firstDay)
        setLastDay(lastDay)

        averageCategories({ firstDay: firstDay, lastDay: lastDay }).then((data) => {
            console.log(data)
            if (data.error) {
                // setError(data.error)
            } else {
                setExpenses(data)
            }
        })
    }, [props])

    return (
        <div className='dashboard'>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6>Expences by Category</h6>
                            <svg viewBox="0 0 400 400">
                                <VictoryPie standalone={false} data={expenses.monthAVG} innerRadius={50} theme={VictoryTheme.material}
                                    labelRadius={({ innerRadius }) => innerRadius + 14}
                                    labelComponent={<VictoryLabel angle={0} style={[{
                                        fontSize: '11px',
                                        fill: '#0f0f0f'
                                    },
                                    {
                                        fontSize: '10px',
                                        fill: '#013157'
                                    }]} text={({ datum }) => `${datum.x}\n LKR${datum.y}`} />}
                                />
                                <VictoryLabel
                                    textAnchor="middle"
                                    style={{ fontSize: 14, fill: '#8b8b8b' }}
                                    x={175} y={170}
                                    text={`Category \nper Analysis`}
                                />
                            </svg>
                        </div> 
                    </div>
                </div>
            </div>


        </div >
    )
}