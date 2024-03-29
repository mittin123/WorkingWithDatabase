
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }
};
    
    function createDatabase(){
        var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);  
        var id = document.getElementById("id").value;
        var content = document.getElementById("log").value;
        db.transaction(function (tx) { 
        tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
        tx.executeSql('INSERT INTO LOGS (id, log) VALUES (' + id + ', "'+ content +'")');  
        });  
        console.log('INSERT INTO LOGS (id, log) VALUES (' + id + ', "'+ content +'")');
    }
    function viewDatabase()
    {
        var msg;

        var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) { 
        tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) { 
           var len = results.rows.length, i;


           for (i = 0; i < len; i++) { 
              msg = "<th>" + i + "</th>";
              msg += "<th>" + results.rows.item(i).id + "</th>";
              msg += "<th>" + results.rows.item(i).log + "</th>"; 
              document.querySelector('#status').innerHTML +=  msg; 
           } 
        }, null); 
        }); 
    }
