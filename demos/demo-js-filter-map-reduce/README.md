# Démo - programmation fonctionnelle en JS, les bases


~~~js
const users = [{ name: 'Jane', age: 12, nbPosts: 12 }, { name: 'John', age: 28, nbPosts: 0 }, { name: 'Derek', age: 18, nbPosts: 3 }, { name: 'Andrea', age: 35, nbPosts: 6 }];
~~~


En utilisant **uniquement** `filter`, `map` ou `reduce`:

  - Retourner les users dont le nom commence par la lettre J (insensible à la casse)
  - Retourner les users qui sont majeurs (>= 18 ans)
  - Retourner chaque user avec une nouvelle clef 'selected' et la valeur "yes" s'ils sont majeurs
  - Retourner le nombre total de posts publiés par les utilisateurs sélectionnés
  - *Bonus*: retourner les users dont le nom commence par la lettre D (insensible à la casse). Que constatez vous ? Fabriquer une fonction qui retourne un filtre
 */