$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $("#auth-button").on("click", function(){
                firebase.auth().signOut().then(function () {
                    location.replace("index.html");
                });
            });
            console.log(user.uid);
        } else {
            $("#auth-button").on("click", function(){
                $('#firebaseui-auth-container').css("display", "block");
            });
        }
    });
});
