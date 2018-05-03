1. output need an absolute path
2. webpack command line interface webpack-cli
3. webpack-dev-server will bundle the file and directly inject it into the index.html
4. loaders in webpack allow us to import and process different files, compile sass to css..
5. babel 1) npm install babel-core babel-preset-env babel-loader --save-dev, add loader in webpack.config
         2) .babelrc
         3) npm install babel-polyfill --save and add to entry 'entry: ['babel-polyfill','./src/js/index.js']'


6. uppercase for model module
7. 
import str from './models/Search';

import {add as a, multi, id} from './views/searchView';

import * as searchView from './views/searchView';

8. axios automatically returns json, not like fetch which needs transform

9. await pause the funtion and the funtion keeps on running as long as the promise resolves

10. testing
const r=new Recipe(47746);
r.getRecipe();
console.log(r);

11. href="#${recipe.recipe_id} so you can use the hashchange event

12. retain the data when page reloads

13. const unitIndex=arrIngredient.findIndex(el2=>unitShort.includes(el2)); find the unkown item
14. this.items.splice(); //find the deleted one, return it , mutate the original array, splice(start,numberToDelete)

15. localStorage.setItem('key','value'), getItem(), length
16. JSON.parse('[]') will return null
