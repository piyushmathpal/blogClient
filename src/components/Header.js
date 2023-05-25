import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "../UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    console.log(Object.keys(sessionStorage));
  
    fetch(`${process.env.REACT_APP_URI}/profile`, { 
      method: 'GET',
      credentials: 'include',
    }).then(response => 
      response.json()).then(userInfo => {
        setUserInfo(userInfo);
      });
   
  }, []);

  function logout() {
    fetch(`${process.env.REACT_APP_URI}/logout`, {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    // console.log(userInfo)
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
