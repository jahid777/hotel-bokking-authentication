import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';


if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig); //initialize app ke amon condition a raksi duplicate error na khaoer jonno
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    //niser 3ta privateRouter ar sign in korer por jekane jete chay sekhane nite
    const location = useLocation();
    const history = useHistory();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () =>{
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const  {displayName, email} = result.user;
            const signInUser ={
                name: displayName, email //value ghulake signInUser a raksi
            }
            setLoggedInUser(signInUser); // value gula setLoggedInuser ar maddme context a set kore disi akhon loggedInUser dak die useContext korte parbe je kono jayga theke.
            // console.log(signInUser);
            history.replace(from) //hisdtory take muse from mani jekhane jete caho jao
          })
          .catch(function(error) {
            const  errorMessage = error.message;
            console.log(errorMessage);
          });
    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign in </button>
        </div>
    );
};

export default Login;