import Link from 'next/link';
import { useRouter } from 'next/router';

import { useContext } from 'react';
import { UserContext } from '../context/state.js';

import { destroyCookie } from 'nookies';

const ProfileModal = (props) => {

  const router = useRouter();

  const { user, logout } = useContext(UserContext);

  const toggleLogin = () => {

    if (props.loggedIn){
      destroyCookie({}, 'authorization');
      logout();
      router.push('/');
    } else {
      router.push(process.env.NODE_ENV === 'development' ? `http://localhost:3000/auth/github` : `https://giraffeql.io/auth/github`);
    }

  }

  return (
    <div className='optionscontainer' style={{opacity: `${props.expand ? '1' : '0'}`, zIndex: `${props.expand ? '9999999999999999' : '-10'}`, pointerEvents: `${props.expand ? 'auto' : 'none'}`}}>

      <h1>Account</h1>
      <button onClick={() => router.push('settings', 'settings', {shallow: true})} >User Settings</button>
      <button onClick={() => router.push('diagrams', 'diagrams', {shallow: true})} >My Diagrams</button>
      <hr />
      <h1>Support</h1>
      <Link href='https://github.com/oslabs-beta/giraffeQL'>
        <button>Changelog</button>
      </Link>
      <Link href='https://github.com/oslabs-beta/giraffeQL/issues'>
        <button>Report an Issue</button>
      </Link>
      {/*<button onClick={() => router.push('contact', 'contact', {shallow: true})} >Contact Us</button>*/}
      <hr />
      <button style={{color: '#12b3ab'}} onClick={toggleLogin}>{props.loggedIn ? 'Log Out' : 'Sign In'}</button>
    
      <style jsx>{`

        *{
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          transition: .2s;
        }

        .optionscontainer{
          display: flex;
          flex-direction: column;
          position: fixed;
          padding: 8px 0px;
          border-radius: 8px;
          background-color: white;
          margin-left: 8px;
          margin-top: 8px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);

          &:before {
            content:"";
            position: absolute;
            top: -16px;
            left: 64px;
            border-width: 8px;
            border-color: transparent transparent white transparent;
            border-style: solid;
          }
          
        }

        h1{
          color: #b2becc;
          font-size: 12px;
          text-align: left;
          margin-left: 8px;
        }

        button{
          padding: 8px;
          padding-right: 72px;
          border: none;
          outline: none;
          background-color: white;
          color: #4a5668;
          display: flex;
          justify-content: flex-start;

          &:hover{
            background-color: #f7fafc;
            color: #546ad5;
          }
        }

        hr{
          width: 100%;
          border: 0;  
          height: 1px;
          background-color: #e1e8f0;
          margin: 0;
        }

      `}</style>

    </div>
  );
}

export default ProfileModal;