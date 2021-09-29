import React, { Component } from 'react';
import { observer } from 'mobx-react'
import userStore from './stores/userStore';
import LoginForm  from './loginform';
import SubmitButton from './SubmitButton';
import './App.css';

class App extends React.Component{
    async componentDidMount () {
        try{
            let res = await fetch('/isLoggedIn',{
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let result = await res.json();

            if(result && result.success){
                userStore.loading = false;
                userStore.isLoggedIn = true;
                userStore.username = result.username;
            }

            else{
                userStore.loading = false;
                userStore.isLoggedIn = false;
            }
        }
        catch(e){
            userStore.loading = false;
            userStore.isLoggedIn = false;
        }
    }

    async doLogout () {
        try {
            let res = await fetch('/logout',{
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            });

            let result = await res.json();

            if(result && result.success){
                userStore.isLoggedIn = false;
                userStore.username = "";
            }
        }
        catch(e){
            userStore.isLoggedIn = false;
            userStore.username = '';
        }
    }

    render(){
        if(userStore.loading){
            return (
                <div className="app">
                    <div className="container">
                        Loading, Please wait...
                    </div>
                </div>
            );
        }

        

        return (
            <div className="app">
                <div className='container'>
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default observer(App);