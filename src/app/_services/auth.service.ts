export class AuthService{


loggedin(){
  //  alert(!!localStorage.getItem('LoginId'));
    return !!localStorage.getItem('LoginId');
}


}