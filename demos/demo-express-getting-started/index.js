const express = require('express')

//App express
const app = express()
const port = 3000

//Routing: associer une fonction à executer à une requête HTTP (verbe HTTP + URL)

//Middleware = fonction qui manipule les objets requete (req), reponse (res), next

//Pour parser le contenu du body de la requete
//Il faut préciser à express, comment formater le corps des requêtes
//Pour cela, on utilise des middlewares fournis par express
//- Format application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//- Format JSON
app.use(express.json())

//app.use: le middleware est appliqué sur toutes les requetes (peu importe la méthode http ou l'url)

// Soumettre une requete POST avec body en application/x-www-form-urlencoded (par défaut)
// curl -X POST -d"clef=valeur localhost:3000/messages?foo=bar
// Soumettre une requete POST avec body en JSON
// curl -X POST -d'{"clef": "valeur"}' localhost:3000/messages?foo=bar -H "Content-Type: application/json"

app.post('/messages', (req, res, next) => {
    //res.send met un terme au cycle requete/reponse
    // console.log(req.path)
    // console.log(req.method)
    console.log(req.body)
    res.send('hello world\n');
})

//Matcher plusieurs url avec des paramètres d'URL
//Tester: curl localhost:3000/1/2, curl localhost:3000/foo
app.get('/concerts/:id1/:id2', (req, res, next) => {
    // console.log(req.path)
    // console.log(req.method)
    // console.log(req.body)
    // console.log(req.query)
    console.log(req.params)
    //res.send met un terme au cycle requete/reponse
    res.send('hello world\n');
})

//Inspecter les headers : curl -i localhost:3000/messages (Voir header Content-Type, défini par .format())
app.get('/messages', (req, res, next) => {

    res
        .status(200)
        .format({
            'application/json': () => {
                res.send({ "foo": "bar" });
            }
        })
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
