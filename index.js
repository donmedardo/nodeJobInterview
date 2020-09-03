//external dependencies
const express = require('express');
const basicAuth = require('express-basic-auth')

//local dependencies
const file = require('./lib/file');
const converter = require('./lib/converter');

//configuration
const app = express();
const port = 3000

//basic auth
app.use(basicAuth({
  users: {
    'usuarioA@gmail.com': '1234567890',
    'usuarioB@gmail.com': '1234567890',
    'usuarioC@gmail.com': '1234567890',
    'usuarioA@hotmail.com': '1234567890',
    'usuarioB@hotmail.com': '1234567890',
    'usuarioB@yahoo.com': '1234567890',
  },
  unauthorizedResponse: (req) => {
    return req.auth ? 'unauthorized' : 'empty credentials'
  }
}))

app.get('/', (req, res) => {
  res.send("ok")
})

app.get('/data', (req, res) => {
  let servicesListFilterByEmail = file.LoadFromLocal()

  servicesListFilterByEmail.forEach(function (servicio) {
    servicio.spec =  servicio.spec.filter(function (spec) {
        let emailsAllowedList =  spec.allowedEmails.filter(function (emails) {
          let email = req.auth.user;
          let expesion = emails.split("*").join("");
          let response = email.includes(expesion);
          return response 
        })
          return emailsAllowedList.length>0;
        });
         
    });
   
    servicesListFilterByEmail = servicesListFilterByEmail.filter(function (servicio) { 
      return servicio.spec.length>0;
     });  

  res.json(servicesListFilterByEmail);
});

app.get('/fiterByKind', (req, res) => {
  const dataJSON = file.LoadFromLocal()

  let servicesListFilterByKind = dataJSON.filter(function (el) {
    return el.kind == req.query.kind
  });

 servicesListFilterByKind.forEach(function (servicio) {
  servicio.spec =  servicio.spec.filter(function (spec) {
      let emailsAllowedList =  spec.allowedEmails.filter(function (emails) {
        let email = req.auth.user;
        let expesion = emails.split("*").join("");
        let response = email.includes(expesion);
        return response 
      })
        return emailsAllowedList.length>0;
      });
      
  });

  servicesListFilterByKind = servicesListFilterByKind.filter(function (servicio) { 
    return servicio.spec.length>0;
   }); 

  servicesListFilterByKind.forEach(function(service){
    service.spec.forEach(function (specObject) {
      delete specObject.allowedEmails;
    });
  });


  res.json(servicesListFilterByKind);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})