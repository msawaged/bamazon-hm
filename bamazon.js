var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "googlstock33",
  database: "bamazonDB"
});


connection.connect(function (err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId + "\n");

  console.log("List of products...\n");

  start();
});

function start() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end;

    console.log('_.~"~._.~"~._.~Welcome to BAMazon~._.~"~._.~"~._');
    console.log('----------------------------------------------------------------------------------------------------');
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].Stock);
      console.log('--------------------------------------------------------------------------------------------------')
    }
    console.log(" ");
  })
}

function restart(){

  start()
}

inquirer.prompt([{
    type: "input",
    name: "whichId",
    message: "What is the ID of the product you would like"
  },

  {
    type: "input",
    name: "quantId",
    message: "How many would you like?"
  }


]).then(function (inquiry) {
  var select = inquiry.whichId
  connection.query('SELECT * FROM products WHERE id = ' + select, function (err, res) {
    let stock = res[0].Stock;
    var quant = inquiry.quantId

    if (err) console.log(err);
    console.log(res)
    console.log(quant);


    console.log(stock);
    // console.log('UPDATE products SET Stock =' + stock + ' WHERE id =' + select)
    if (quant > stock) {
      console.log("sold out")
// start();

    } else {
      stock -= quant

      connection.query('UPDATE products SET Stock =' + stock + ' WHERE id =' + select, function (err) {
        if (err) throw err;

        console.log("good buy")
        // start();
      })
    }
  })


})