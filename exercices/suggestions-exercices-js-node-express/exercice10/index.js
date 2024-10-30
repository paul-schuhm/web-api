const express = require('express')
const app = express()
const port = 3000


app.use(express.urlencoded({ extended: false }));

const posts = [
    { id: 1, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 2, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 3, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 4, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 8, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 5, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 6, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 7, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 9, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 10, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
];


//Exemple de requête: curl http://localhost:3000/posts/3

app.get('/posts/:id(\\d+)', (req, res) => {
    //@See:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const post = posts.find((el) => el.id == req.params.id);
    res.status(200).format({
        'application/json': () => {
            res.send(post);
        }
    })
})

app.get('/posts', (req, res, next) => {
    res.status(200).format({
        'application/json': () => {
            res.send(posts);
        }
    })
})

//Exemple de requête: curl -X POST -d'message="hello, world"' http://localhost:3000/posts/3
app.post('/posts', (req, res, next) => {

    //Pour générer un nouvel id unique à partir du dernier crée
    //On trie les posts par id, du plus petit au plus grand
    //On récupère l'id du dernier élément
    //On ajoute 1 et on l'attribue au nouvel élément

    //On crée une fonction de filtre:
    //@See:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const sortById = (a, b) => {
        //Si expression < 0, a est rangé avant b
        return a.id - b.id;
    }

    //On trie sur place
    posts.sort(sortById);

    //On récupère le dernier élément et son id
    const newId = posts[posts.length - 1].id + 1;

    posts.push({ id: newId, content: req.body.message });

    res.status(201).send('ok')

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
