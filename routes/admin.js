var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multer  = require('multer');
var upload = multer({ dest: require('path').join(__dirname,'../public/img/portfolio/') });

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'portfolio'
});

connection.connect();

router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Express' });
  connection.query('SELECT * FROM projects', (err, rows, fields) => {
    if(err) throw err;
    res.render('dashboard', {
      rows: rows,
      layout: 'layout2'
    })
  })
});

router.get('/new', (req, res, next) => {
  res.render('new');
});

router.post('/new', upload.single('projectimage'), (req, res, next) => {
  var title = req.body.title;
  var description = req.body.description;
  var service = req.body.service;
  var client = req.body.client;
  var projectdate = req.body.projectdate; 

    // console.log("pppppp: ", req.file);
    
  //Check Image

  if(req.file){
    //File info

    var projectImageOriginalName = req.file.originalname;
    var projectImageName = req.file.filename;
    var projectImageMime = req.file.mimetype;
    var projectImagePath = req.file.path;
    // var projectImageExt = req.files.projectimage.extension;
    var projectImageSize = req.file.size;
  } else {
    var projectImageName = 'noimage.jpg';
  }

  //Form Field Validation
  req.checkBody('title', 'Title field is required').notEmpty();
  req.checkBody('service', 'Service field is required').notEmpty();

  var errors = req.validationErrors();

  if(errors){ 
    res.render('new', {
      errors: errors,
      title: title,
      description: description,
      service: service,
      client: client
    });
  } else {
    var project =  {
      title: title,
      description: description,
      service: service,
      client: client,
      date: projectdate,
      image: projectImageName
    };

    var query = connection.query('INSERT INTO projects SET ?', project, (err, result) => {

    });

    req.flash('success', 'Project Added');

    res.location('/admin');
    res.redirect('/admin');
  }
});

router.get('/edit/:id', (req, res, next) => {
  connection.query('SELECT * FROM projects WHERE id='+req.params.id, (err, row, fields) => {
    if(err) throw err;
    res.render('edit', {
      row: row[0],
      layout: 'layout2'
    })
  })
});

router.post('/edit/:id', upload.single('projectimage'), (req, res, next) => {
  var title = req.body.title;
  var description = req.body.description;
  var service = req.body.service;
  var client = req.body.client;
  var projectdate = req.body.projectdate; 

    // console.log("pppppp: ", req.file);
    
  //Check Image

  if(req.file){
    //File info

    var projectImageOriginalName = req.file.originalname;
    var projectImageName = req.file.filename;
    var projectImageMime = req.file.mimetype;
    var projectImagePath = req.file.path;
    // var projectImageExt = req.files.projectimage.extension;
    var projectImageSize = req.file.size;
  } else {
    var projectImageName = 'noimage.jpg';
  }

  //Form Field Validation
  req.checkBody('title', 'Title field is required').notEmpty();
  req.checkBody('service', 'Service field is required').notEmpty();

  var errors = req.validationErrors();

  if(errors){ 
    res.render('new', {
      errors: errors,
      title: title,
      description: description,
      service: service,
      client: client
    });
  } else {
    var project =  {
      title: title,
      description: description,
      service: service,
      client: client,
      date: projectdate,
      image: projectImageName
    };

    var query = connection.query('UPDATE projects SET ? WHERE id='+req.params.id, project, (err, result) => {

    });

    req.flash('success', 'Project Updated !');

    res.location('/admin');
    res.redirect('/admin');
  }
});

router.delete('/delete/:id', (req, res) => {
  connection.query('DELETE FROM projects WHERE id ='+req.params.id, (err, result) => {
    if(err) throw err;

    req.flash('success', 'Project Deleted !');

    res.location('/admin');
    res.redirect('/admin');
  });
})

module.exports = router;