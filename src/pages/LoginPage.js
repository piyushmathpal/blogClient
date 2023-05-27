import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";

const LoginPage = () => {
  // console.log(process.env.REACT_APP_URI);

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
  // console.log(process.env.REACT_APP_URI);
    const response = await fetch(`${process.env.REACT_APP_URI}/login`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        localStorage.token = userInfo.token
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }


  return (
    <form className="login" onSubmit={login}>
    <h1>Login</h1>
    <input type="text"
           placeholder="username"
           value={username}
           onChange={ev => setUsername(ev.target.value)}/>
    <input type="password"
           placeholder="password"
           value={password}
           onChange={ev => setPassword(ev.target.value)}/>
    <button>Login</button>
  </form>
  )
}

export default LoginPage