import React, { useState, useContext, useEffect } from 'react'
import { GlobalState } from './GlobalState'
import './Dashboard.css'
import Button from '@material-ui/core/Button';
import EmpS from './EmpS';
import axios from 'axios'

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
    table: {
        minWidth: 340,

    },
});

function Dashboard() {

    const state = useContext(GlobalState)
    const [emps] = state.EmpAPI.employee

    const [user, setUser] = useState({
        name: '', date: '', phone_number: '', rating: '', organization: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const empSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/api/employees', { ...user })
            alert("employee is created")
            localStorage.setItem('firstlogin', true)
            window.location.href = '/Dashboard';
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    //filter section
    const [filter_org, setFilter_org] = useState([])
    const [filter_date, setFilter_date] = useState([])
    const [filter_rate, setFilter_rate] = useState([])
    const [org, setOrg] = useState('')
    const [date_s, setDate_s] = useState('')
    const [date_e, setDate_e] = useState('')
    const [rate1, setRate1] = useState('')
    const [rate2, setRate2] = useState('')
    const [rate3, setRate3] = useState('')
    const [rate4, setRate4] = useState('')
    const [rate5, setRate5] = useState('')


    useEffect(() => {
        setFilter_org(
            emps.filter(x => {
                return x.organization.toLowerCase().includes(org.toLowerCase())
            })
        )
    }, [org, emps]);

    useEffect(() => {
        setFilter_date(
            filter_org.filter(x => {
                if (date_s || date_e) {
                    return x.date > date_s && x.date < date_e
                } else {
                    return x
                }
            })
        )
    }, [date_s, date_e, filter_org]);

    useEffect(() => {
        setFilter_rate(
            filter_date.filter(x => {
                if (rate1) {
                    return x.rating.includes(rate1)
                }
                if (rate2) {
                    return x.rating.includes(rate2)
                }
                if (rate3) {
                    return x.rating.includes(rate3)
                }
                if (rate4) {
                    return x.rating.includes(rate4)
                }
                if (rate5) {
                    return x.rating.includes(rate5)
                }
                return x
                
            })
        )
    }, [rate1, rate2, rate3, rate4, rate5, filter_date]);

    //styles
    const classes = useStyles();
    return (
        <div className="dashboard">
            <h2 className="dashboard_title">employee form</h2>
            <form onSubmit={empSubmit}>
                <div className="dashboard__form">
                    <input className="field" type="text" required placeholder="Name" name="name" value={user.name} onChange={onChangeInput} />
                    <input className="field" type="date" required placeholder="Date" name="date" value={user.date} onChange={onChangeInput} />
                    <input className="field" type="text" required placeholder="Phone" name="phone_number" value={user.phone_number} onChange={onChangeInput} />
                    <select className="organization" name="rating" value={user.rating} onChange={onChangeInput}>
                        <option value="" disabled="disabled">Select rating</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>


                    <select className="organization" name="organization" value={user.organization} onChange={onChangeInput}>
                        <option value="" disabled="disabled" required>Select Organization</option>
                        <option>Google</option>
                        <option>Michrosoft</option>
                        <option>IBM</option>
                    </select>

                    <div className="dash_button">
                        <Button type="submit"
                            fullWidth variant="contained" color="primary">create employee</Button>
                    </div>
                </div>
            </form>

            <div className="filter_section">
                <p>this is filter section</p>
            </div>
            <div className="dashboard__filter">
                <select className="organization" name="organization" onChange={e => setOrg(e.target.value)}>
                    <option value="" disabled="disabled" selected="selected">filter by Organization</option>
                    <option>Google</option>
                    <option>Michrosoft</option>
                    <option>IBM</option>
                </select>

                <div className="date__filter">
                    <span>start</span>
                    <input type="date" onChange={e => setDate_s(e.target.value)} />
                    <span>end</span>
                    <input type="date" onChange={e => setDate_e(e.target.value)} />
                </div>

                <div className="rating__filter">
                    <span>rating : </span>
                    1
                    <Checkbox
                        value="1"
                        color="primary"
                        onChange={e => setRate1(e.target.value)}
                    />
                    2
                    <Checkbox
                        value="2"
                        color="primary"
                        onChange={e => setRate2(e.target.value)}
                    />
                    3
                    <Checkbox
                        value="3"
                        color="primary"
                        onChange={e => setRate3(e.target.value)}
                    />
                    4
                    <Checkbox
                        value="4"
                        color="primary"
                        onChange={e => setRate4(e.target.value)}
                    />
                    5
                    <Checkbox
                        value="5"
                        color="primary"
                        onChange={e => setRate5(e.target.value)}
                    />
                </div>

            </div>

            <div className="table__data">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className="table__header">
                            <TableRow>
                                <TableCell>NAME</TableCell>
                                <TableCell align="right">PHONE NUMBER</TableCell>
                                <TableCell align="right">ORGANIZATION</TableCell>
                                <TableCell align="right">DATE</TableCell>
                                <TableCell align="right">RATING</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            filter_rate.map(x => {
                                return <EmpS key={x._id} x={x} />
                            })
                        }
                    </Table>
                </TableContainer>

            </div>

        </div>
    )
}

export default Dashboard


