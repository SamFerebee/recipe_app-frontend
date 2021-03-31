import React, {useState} from "react"

const LoginPage = ({handleLogin,}) => {
    const [formInfo, setFormInfo] = useState({
        username: "",
        password: ""
    })

    const handleChange = e => {
        const key = e.target.name;
        const val = e.target.value;
        let temp = {...formInfo, [key]: val};
        setFormInfo(temp);
    }

    const login = e => {
        e.preventDefault();
        handleLogin(formInfo);
    }

    return (
        <div className="login">
        <form onSubmit={login}>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formInfo.name}/> <br></br>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formInfo.password}/> <br></br>
            <input className="login-sub" type="submit" value="Login"/> 
        </form>
        </div>
    )
}

export default LoginPage