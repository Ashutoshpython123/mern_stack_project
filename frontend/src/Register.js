import React, {useState} from 'react'
import './Register.css'
import Button from '@material-ui/core/Button'
import axios from 'axios';

function Register() {

    const [user, setUser] = useState({
        name: '', email: '', password: ''
    })

    const onChangeInput = e=>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try{
            await axios.post('/api/register', {...user})

            localStorage.setItem('firstlogin', true)
            window.location.href = '/Login';
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="Login">
            <h2 className="login_title">Register</h2>
            <form onSubmit={registerSubmit}>
                <div className="login__form">
                    <input className="field" type="text" required name="name" placeholder="Name" value={user.name} onChange={onChangeInput} />
                    <input className="field" type="email" required name="email" placeholder="Email" value={user.email} onChange={onChangeInput} />
                    <input className="field" type="password" required name="password" placeholder="Password" value={user.password} onChange={onChangeInput} />
                    <div className="login_button">
                        <Button type="submit"
                            fullWidth variant="contained" color="primary">Register</Button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Register
