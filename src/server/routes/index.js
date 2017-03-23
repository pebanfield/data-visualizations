var express = require('express');
var router = express.Router();

var navItems =
  [{name:'home', active: true}, 
   {name:'about', active: false}, 
   {name:'contact', active: false}, 
   {name:'projects', active: false}];
   
navItems.reverse(); 
   
var menu = 
  { navItems: navItems };

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', menu);
});

function setActive(name) {
  navItems.forEach(function(item){
    if(name === item.name){
        item.active = true;
    } else {
        item.active = false;
    }
  });
}

function clearActive() {
  navItems.forEach(function(item){
     item.active = false;
  });
}

//render main route handlers
navItems.forEach(function(item){ 
  router.get(item.name, function(req, res) {
    setActive(item.name);
    res.render(item.name, menu);
  });
});

module.exports = router;
