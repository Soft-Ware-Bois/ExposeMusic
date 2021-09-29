import { extendObservable } from "mobx";

class userStore{
    constructor(){
        extendObservable(this, {
            loading: true,
            isloggedin: false,
            username: ''
        })
    }
}

export default new userStore();