const signUpGhost = document.getElementById('signUpGhost');
const logInGhost = document.getElementById('logInGhost');
const container = document.getElementById('container');

const logInButton = document.getElementById('logInButton');
const signUpButton = document.getElementById('signUpButton');

const signUpUserNameRef = document.getElementById('signUp-userName');
const signUpUserEmailRef = document.getElementById('signUp-userEmail');
const signUpUserPasswordRef = document.getElementById('signUp-userPassword');

const logInUserEmailRef = document.getElementById('logIn-userEmail');
const logInUserPasswordRef = document.getElementById('logIn-userPassword');

var firebaseRef = firebase.database().ref('users');


signUpGhost.addEventListener("click", () =>{
    container.classList.add('right-panel-active');
});

logInGhost.addEventListener("click", () => {
    container.classList.remove('right-panel-active');
});


// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // User is signed in.
//         console.log("user is signed in")
//     } else {
//         // No user is signed in.
//         console.log("no user is signed in")
//     }
// });


signUpButton.addEventListener("click", () => {
    var validate = true;
    let userData = {
        userName: signUpUserNameRef.value,
        userEmail: signUpUserEmailRef.value,
        userPassword: signUpUserPasswordRef.value
    };
    // console.log("User Data: " , userData);
    // alert("signUp is clicked");

    ///Valid userName
    if (userData.userName == ""){
        alert("** please enter the user name");
        validate=false;
        return  validate;
    }
    if((userData.userName.length<=2) || (userData.userName.length>=20)){
        alert("** user name must be between 5 to 20 characters");
        validate=false;
        return  validate;
    }
    if(!isNaN(userData.userName)){
        alert(" ** only characters are allowed in user name");
        validate=false;
        return  validate;
    }

    ///Valid userEmail
    if (userData.userEmail == ""){
        alert(" ** please enter the email id ");
        validate=false;
        return  validate;
    }
    if (userData.userEmail.indexOf('@')<=0){
        alert(" ** @ at invalid position ");
        validate=false;
        return validate;
    }
    if((userData.userEmail.charAt(userData.userEmail.length - 4) != '.') && (userData.userEmail.charAt(userData.userEmail.length - 3) != '.')){
        alert(" ** . at invalid position")
        validate=false;
        return  validate;
    }

    ///Valid userPassword
    if(userData.userPassword == ""){
        alert(" ** please enter the password ");
        validate=false;
        return  validate;
    }
    if((userData.userPassword.length<=4) || (userData.userPassword.length>=20) ){
        alert(" ** password must be between 5 to 20 ");
        validate=false;
        return validate;
    }

    if (validate){
        // console.log("User Data: " , userData);
        // alert(" your account is successfully created ");
        // location.reload();

        firebase.auth().createUserWithEmailAndPassword(userData.userEmail, userData.userPassword)
            .then(function (success){
                // console.log('success:',success.message);

                    firebaseRef.push().set(userData);

                    alert(" your account is successfully created ");
                    location.reload();


            })
            .catch(function (error){
                // console.log('error:',error.message);
                alert(error.message);
            });


    }


});






function logIn(){
    let validate = true;
    let userData = {
        // userName: userEmailRef.values(),
        userEmail: logInUserEmailRef.value,
        userPassword: logInUserPasswordRef.value
    };

    ///Valid userEmail
    if (userData.userEmail == ""){
        alert(" ** please enter the email id ");
        validate=false;
        return  validate;
    }
    if (userData.userEmail.indexOf('@')<=0){
        alert("** Invalid email ");
        validate=false;
        return validate;
    }
    if((userData.userEmail.charAt(userData.userEmail.length - 4) != '.') && (userData.userEmail.charAt(userData.userEmail.length - 3) != '.')){
        alert("** Invalid email ")
        validate=false;
        return  validate;
    }

    ///Valid userPassword
    if(userData.userPassword == ""){
        alert(" ** please enter the password ");
        validate=false;
        return  validate;
    }
    if((userData.userPassword.length<=4) || (userData.userPassword.length>=20) ){
        alert(" ** Invalid password ");
        validate=false;
        return validate;
    }

    if (validate){
        // console.log("User Data: " , userData);

        firebase.auth().signInWithEmailAndPassword(userData.userEmail, userData.userPassword)
            .then(function (success){
                // console.log('success:',success.message);
                alert(" you are successfully loged in");
                    document.getElementById('login-form').style.display = "none";
                    document.getElementById('login-form-ghost').style.display = "flex";
                    document.getElementById('ghost-user-email').innerHTML = userData.userEmail;

                    document.getElementById('signUpGhost').style.display = "none"

            })
            .catch(function (error){
                // console.log('error:',error.message);
                alert(error.message);
            });


    }else {
            document.getElementById('login-form').style.display = "flex";
            document.getElementById('login-form-ghost').style.display = "none";
    }

    // var user = firebase.auth().currentUser;
    //
    // if (user != null) {
    //     // User is signed in.
    //     console.log("User is signed in.")
    //     document.getElementById('login-form').style.display = "none";
    //     document.getElementById('login-form-ghost').style.display = "flex";
    // } else {
    //     // No user is signed in.
    //     console.log("No user is signed in.")
    //     document.getElementById('login-form').style.display = "flex";
    //     document.getElementById('login-form-ghost').style.display = "none";
    // }
}





function logout(){

    if(confirm("are you sure you want to logout !")){
        firebase.auth().signOut()
            .then(function (success){
                // alert(" are you sure you want to logout !");
                document.getElementById('login-form').style.display = "flex";
                document.getElementById('login-form-ghost').style.display = "none";
                document.getElementById('signUpGhost').style.display = "inline";
            })
            .catch(function (error){
                alert(error.message);
            });
    }else {
        ///something...
    }


}












