
const LoginForm = ({ props }) => {
  const {
    handleLogin,    
    username,
    password,
    handleUsername,
    handlePassword,
    user,
  } = props;

  


  if (user === null) {
    return (
      <>
        <h2> Log In to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username"> username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsername}
            ></input>
          </div>
          <div>
            <label htmlFor="password"> password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePassword}
            ></input>
          </div>
          <button>Log In</button>
        </form>
      </>
    )
    
  }


};

export default LoginForm;
