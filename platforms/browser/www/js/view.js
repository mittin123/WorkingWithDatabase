function populateTable(results) {
    var len = results.rows.length,i;
    var table = document.getElementById("mytable");
    for (i = 0; i < len; i++) {
        var row = table.insertRow(-1);
        var idCell = row.insertCell(0);
        var nameCell = row.insertCell(1);
        var priceCell = row.insertCell(2);
        var deleteButton = row.insertCell(3);
        
        idCell.innerHTML = results.rows.item(i).id;
        nameCell.innerHTML = results.rows.item(i).name;
        priceCell.innerHTML = results.rows.item(i).price;
        deleteButton.innerHTML = "<td><a class='fas fa-trash' data-ajax='false' onclick='removeRow(this)' productid='"+results.rows.item(i).id+"'></a>";
    }
}
function deleteRowFromDB(productId){
	var db = openDatabase('mydb', '1.0', 'first database', 2 * 1024 * 1024);
    db.transaction(function(tx) {
        var sql = 'DELETE FROM product where id = ?';
        tx.executeSql(sql,[productId]);
    });
}
function removeRow(id)
{	
	var productId = id.getAttribute('productId');
	deleteRowFromDB(productId);
	loadData();
}
$(document).ready(function() {
    loadData();
    $("#searchBox").on("keyup", function() {
        var nameSearch = $(this).val();
        $(function() {
            $('#mytable tr').not(':nth-child(1)').remove()
        });
        var db = openDatabase('mydb', '1.0', 'first database', 2 * 1024 * 1024);
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM product where name like ?',['%'+nameSearch+'%'],
                function(tx, results) {
                    populateTable(results);
                });
        });
    });
});

function loadData() {
	$(function() {
            $('#mytable tr').not(':nth-child(1)').remove()
    });
    var db = openDatabase('mydb', '1.0', 'first database', 2 * 1024 * 1024);
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM product', [],
            function(tx, results) {
                populateTable(results)
            });
    });
}