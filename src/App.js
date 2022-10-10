import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import './App.css';

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(res){
    console.log('Encoded JWT ID token: ' + res.credential);
    let userObject = jwt_decode(res.credential);
    console.log(userObject);
    setUser(userObject);
    document.querySelector('#G_OAuth_btn').hidden = true;
  }

  function handleSignOut(){
    setUser({});
    document.querySelector('#G_OAuth_btn').hidden = false;
  }

  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id: '클라이언트 ID', 
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById('G_OAuth_btn'), 
      { theme: 'outline', size: 'large' }
    )
  }, [])

  return (
    <div className="App">
      <div id='G_OAuth_btn'></div>
      { Object.keys(user).length != 0 &&
        <button onClick={()=>handleSignOut()}>Sign Out</button>
      }
      { user &&
        <div>
          <img src={user.picture} />
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
