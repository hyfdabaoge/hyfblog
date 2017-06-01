var express = require('express');
var router = express.Router();
var db = require('../data/db');
// var objectIdToTimestamp = require('objectid-to-timestamp');
// var moment = require('moment');
// const createToken = require('../middleware/createToken.js')
// const checkToken = require('../middleware/checkToken.js')

router.post('/article/list', function(req, res){
    var page = req.body.page
    var limit = req.body.limit
    var skip = (page-1)*limit
    db.Article.find().skip(skip).limit(limit).exec(function(err, doc){
        if (err) {
			console.log(err)
		}
		else if(doc){
			res.send(doc)
		}
    })
})

router.get('/article/list', function(req, res){
    db.Article.find({}, function(err, doc){
		if (err) {
			console.log(err)
		}
		else if(doc){
			res.send(doc)
		}
	})
})

router.post('/article/save', function(req, res){
    var obj = {
    	title: req.body.ARTICLE.title,
    	create_at: new Date(),
    	classify: req.body.ARTICLE.classify,
    	content: req.body.ARTICLE.content
    }
    new db.Article(obj).save(function(err){
    	if (err) {
    		res.send('fail')
    	}
    	res.send('ok')
    })
})

router.post('/article/del', function(req, res){
    db.Article.findOneAndRemove({_id: req.body._id}, function(err, doc){
        if(err){
			res.status(500).send();
			return
		}
		res.send()
    })
})

router.post('/article/getone', function(req, res){
    db.Article.findOne({_id: req.body._id}, function(err, doc){
    	if(err){
    	  res.status(500).send();
		  return
    	}
    	res.send(doc)
    })
})

router.post('/article/edit', function(req, res){
    db.Article.find({id: req.body.ARTICLE._id}, function(err, doc){
    	if(err){
		  return	
    	}
    	doc.title = req.body.ARTICLE.title
    	doc.classify = req.body.ARTICLE.classify
    	doc.content = req.body.ARTICLE.content
    	doc.create_at = new Date()
    	db.Article(doc).save(function(err){
    		if (err) {
    		   res.status(500).send();
               return
    		}
    	})
    })
})

router.post('/article/bytag', function(req, res){
    db.Article.find({classify: req.body.ClassName}, function(err, doc){
        if (err) {
          res.status(500).send();
        }
        res.send(doc);
    })
})

router.post('/classify/list', function(req, res){
    var page = req.body.page
    var limit = req.body.limit
    var skip = (page-1)*limit
    db.Classify.find().skip(skip).limit(limit).exec(function(err, doc){
        if (err) {
            console.log(err)
        }
        else if(doc){
            res.send(doc)
        }
    })
})

router.get('/classify/list', function(req, res){
    db.Classify.find({}, function(err, doc){
        if (err) {
            console.log(err)
        }
        else if(doc){
            res.send(doc)
        }
    })
})
router.post('/classify/save', function(req, res){
	var obj = {
		classname: req.body.CLASS.classname,
		create_at: new Date(),
		value: req.body._id
	}
	new db.Classify(obj).save(function(err){
		if(err){
			res.send('保存失败')
		}
		res.json({
			success: true
		})
	})
})
router.post('/classify/del', function(req, res){
	db.Classify.remove({_id: req.body._id}, function(err, doc){
		if(err){
			res.status(500).send();
			return
		}
		res.send()
	})
})

router.post('/user/reg', function(req, res){
    var obj = {
        name: req.body.account,
        pwd: req.body.password,
        recheck: req.body.checkPass,
        // token: createToken(this.name)
    }
    db.User.findOne({name: req.body.account}, (err, doc) => {
        if (err) {res.status(500).send();return}
        if(doc){
          res.json({
            success: false
          })
          // res.send('0')
        } else {
          new db.User(obj).save(err => {
            if(err) {res.status(500).send();return}
            res.json({
                success: true
            })
            // res.send('1')
          })
        }
    })
})

router.post('/user/login', function(req, res){
    db.User.findOne({name: req.body.account}, function(err, doc){
        console.log(doc)
        if(err) {console.log(err)}
        if(!doc){
            console.log("账号不存在")
            res.json({
                info: false
            })
        } else if (req.body.password === doc.pwd){
            console.log("登录成功！")
            res.json({
                success: true,
                token: true,
                info: true
            })
        } else {
            console.log("密码错误！")
            res.json({
                success: false
            })
        }
    })
})
module.exports = router