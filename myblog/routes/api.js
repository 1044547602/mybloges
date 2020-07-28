var express = require('express');
const mysql = require('mysql');
var cookieParser = require('cookie-parser');
var router = express.Router();
//创建连接池
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	port: '3306',
	database: 'myblog'
});
function randomWord(){
	return Math.random().toString(17).substr(7);

}

//令牌接口
router.get('/userSecurity',function(req,res){
	var postData = {
		userId: req.cookies.userId,
		userKey:req.cookies.userKey
	};
	pool.getConnection(function(err, connection) {
		connection.query("SELECT * FROM user where userId=? and userKey=?", [postData.userId, postData.userKey],function(err,rows){
			if(rows.length>0){
				res.send({
					data:rows,
					massage:"处理成功"
				})
			}else{
				res.send({
					data:err,
					massage:'错误'
				})
			}
		})	
	})
})
//用户列表接口
router.get('/userList', function(req, res) {
	pool.getConnection(function(err, connection) {
		// 使用连接
		connection.query('SELECT * FROM user', function(err, rows) {
			// 使用连接执行查询
			res.send({
				data: rows,
				massage: "处理成功",
				
			})
			connection.release();
			//连接不再使用，返回到连接池
		})
	})
});
//登陆接口
router.post('/login', function(req, res) {
	var postData = {
		userId: req.body.userId,
		userPassword: req.body.userPassword,
		userKey:randomWord()

	};
	pool.getConnection(function(err, connection) {
		// 使用连接
		connection.query("SELECT * FROM user WHERE userId=? AND userPasserword =?", [postData.userId, postData.userPassword],
			function(err, rows) {
				// 使用连接执行查询
				if (err) throw err;
				if (rows.length > 0) {
					connection.query("UPDATE user SET  userkey=? WHERE userId=?", [postData.userKey,postData.userId],
						function(errs, rowss) {})
						res.cookie('userId',postData.userId);
						res.cookie('userKey',postData.userKey)
					res.send({
						data: postData.userKey,
						massage: "处理成功",
						
					})
				} else {
					res.send({
						massage: "处理失败"
					})
					
				}
				connection.release();
				//连接不再使用，返回到连接池
			})
	})
});
router.post('/register', function(req, res) {
	var postData = {
		userId: req.body.userId,
		userName:req.body.userName,
		userPassword: req.body.userPassword,
		userSex:req.body.userSex,
		userKey:randomWord()

	};
	pool.getConnection(function(err, connection) {
		// 使用连接
		connection.query("INSERT INTO user (userId,userName,userPasserword,userSex,userKey) VALUES(?,?,?,?,?)", [postData.userId,postData.userName,postData.userPassword,postData.userSex,postData.userKey],
			function(err, rows) {
				// 使用连接执行查询
				if (err) throw err;
				if (rows.affectedRows > 0) {
					res.send({
						
						massage: "处理成功",
					})
				} else {
					res.send({
						massage: "处理失败"
					})
				}
				connection.release();
				//连接不再使用，返回到连接池
			})
	})
});

module.exports = router;
