import React, { useState } from 'react'
import './Login.css';
import Button from '@material-ui/core/Button';
import axios from 'axios';

function Login() {
    const [user, setUser] = useState({
        email: '', password: ''
    })

    const onChangeInput = e=>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try{
            await axios.post('/api/login', {...user})

            localStorage.setItem('firstlogin', true)
            window.location.href = '/Dashboard';
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="Login">
            <h2 className="login_title">Login</h2>
            <form onSubmit={loginSubmit}>
                <div className="login__form">
                    <input className="field" type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} />
                    <input className="field" type="password" name="password" required placeholder="Password" value={user.password} onChange={onChangeInput}/>
                    <div className="login_button">
                        <Button type="submit"
                            fullWidth variant="contained" color="primary">Login</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
