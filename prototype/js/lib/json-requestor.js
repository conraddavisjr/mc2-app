function AJAX_JSON_Req(url, callback) {
    var AJAX_req = new XMLHttpRequest();
    AJAX_req.open("GET", url, true);
    AJAX_req.setRequestHeader("Content-type", "application/json");

    AJAX_req.onreadystatechange = function() {
        if(AJAX_req.readyState == 4 && AJAX_req.status == 200){
            callback(JSON.parse(AJAX_req.responseText));
        }
    };

    AJAX_req.send();
}