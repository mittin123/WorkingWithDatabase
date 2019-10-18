$(document).ready(function() {
	$("#create").click(function(event) {
		var db = openDatabase('mydb', '1.0', 'first database', 2 * 1024 * 1024);
		db.transaction(function(tx){
			tx.executeSql('Create table if not exists product(id integer primary key autoincrement, name text, price number)');
			var name = $("#name").val();
			var price = $("#price").val();
			var sql = "insert into product(name, price) values (?, ?)";
			tx.executeSql(sql,[name,price]);
		});
	});
});