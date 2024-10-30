# Illustration des différentes stratégies pour travailler avec des traitements asynchrones


Voici un exemple de programme où l'on doit réaliser une séquence d'instructions SQL auprès d'un SGBDR MySQL dans un ordre précis.

Le même code est écrit avec les 3 approches proposées par JavaScript:

- [Utilisation des callbacks](#stratégie-callback) (chaque traitement est responsable d'appeler le traitement suivant);
- [Utilisation des Promesses](#stratégie-des-promesses-thencatch), avec then/catch;
- [Utilisation des Promesses avec le sucre syntaxique async/await](#stratégie-des-promesses-avec-le-sucre-syntaxique-asyncawait);

Pour chaque approche:

- Apprécier *les niveaux d'indentation* du code;
- Imaginez ce que vous devez *lire, comprendre et faire pour modifier cette série d'instructions* (en retirer une par exemple)

## Stratégie callback

Chaque traitement (requête SQL) est en charge d'appeler le suivant. Le *callback hell*.

Le module `mysql` ne supporte pas l'API des promesses, il faut travailler ainsi avec.

~~~js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'database_name'
});

connection.connect((err) => {
  if (err) {
    console.error('Connection error:', err);
    return;
  }

  // Première requête
  connection.query("SELECT * FROM users WHERE id = 1", (err, results) => {
    if (err) {
      console.error("Error in first query:", err);
      return connection.rollback(() => connection.end());
    }

    console.log("First query result:", results);

    // Deuxième requête
    connection.query("UPDATE users SET name = 'Updated' WHERE id = 1", (err, results) => {
      if (err) {
        console.error("Error in second query:", err);
        return connection.rollback(() => connection.end());
      }

      console.log("Second query result:", results);

      // Troisième requête
      connection.query("INSERT INTO logs (message) VALUES ('User updated')", (err, results) => {
        if (err) {
          console.error("Error in third query:", err);
          return connection.rollback(() => connection.end());
        }

        console.log("Third query result:", results);

        // Si tout est réussi, commit la transaction
        connection.commit((err) => {
          if (err) {
            console.error("Commit error:", err);
            return connection.rollback(() => connection.end());
          }
          console.log("Transaction committed successfully.");
          connection.end();
        });
      });
    });
  });
});
~~~


## Stratégie des Promesses (then/catch)

Le module `mysql2/promise` est un wrapper de `mysql`, où toutes les méthodes sont *wrapées* dans des promesses.

~~~js
const mysql = require('mysql2/promise');

async function sequence() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database_name',
  });

  try {
    connection.query("START TRANSACTION")
      .then(() => connection.query("SELECT * FROM users WHERE id = 1"))
      .then(([rows]) => {
        console.log("First query result:", rows);
        return connection.query("UPDATE users SET name = 'Updated' WHERE id = 1");
      })
      .then(([result]) => {
        console.log("Second query result:", result);
        return connection.query("INSERT INTO logs (message) VALUES ('User updated')");
      })
      .then(([result]) => {
        console.log("Third query result:", result);
        return connection.query("COMMIT");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        return connection.query("ROLLBACK");
      })
      .finally(() => {
        connection.end();
      });
  } catch (error) {
    console.error("Connection error:", error);
  }
}
~~~


## Stratégie des Promesses avec le sucre syntaxique `async`/`await`

~~~js
const mysql = require('mysql2/promise');

async function asyncAwaitExample() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database_name'
  });

  try {
    await connection.beginTransaction();

    // Première requête
    const [users] = await connection.query("SELECT * FROM users WHERE id = 1");
    console.log("First query result:", users);

    // Deuxième requête
    const [updateResult] = await connection.query("UPDATE users SET name = 'Updated' WHERE id = 1");
    console.log("Second query result:", updateResult);

    // Troisième requête
    const [insertResult] = await connection.query("INSERT INTO logs (message) VALUES ('User updated')");
    console.log("Third query result:", insertResult);

    // Commit si tout est réussi
    await connection.commit();
    console.log("Transaction committed successfully.");

  } catch (error) {
    console.error("An error occurred:", error);
    await connection.rollback();
    console.log("Transaction rolled back.");
  } finally {
    await connection.end();
  }
}
~~~

## Références utiles

- [Utiliser les promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises), de la MDN;
- [async function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function), de la MDN, sur l'usage d'`async` et d'`await`
- [Un guide illustré pour comprendre les promesses en JavaScript](https://frank.taillandier.me/2017/03/23/comprendre-les-promesses-en-javascript/), de Frank Taillandier. Si vous aimez les métaphores
- [Callback Hell](http://callbackhell.com/), A guide to writing asynchronous JavaScript programs 