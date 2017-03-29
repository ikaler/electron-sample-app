function showNotification() {
    Notification.requestPermission().then(function(){

        var notification = new Notification('App Notification', {
            "body": "Notification text here",
            "icon": "../assets/images/app-icon.png"
        });
    });
}