import React, {useState, useEffect} from 'react'
import axios from 'axios'

function EmpAPI() {
    const [emp, setEmp] = useState([])

    const getEmp = async () => {
        const res = await axios.get('/api/employees')
        setEmp(res.data.employee)
    }

    useEffect(() => {
        getEmp()
    },[])
    return {
        employee : [emp, setEmp]
    }
}

export default EmpAPI
