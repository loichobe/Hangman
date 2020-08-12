//Tableau de mot servant au pendu
var programming_languages = [
	"python",
	"javascript",
	"mongodb",
	"json",
	"java",
	"html",
	"css",
	"c",
	"csharp",
	"golang",
	"kotlin",
	"php",
	"sql",
	"ruby"
]

//answer contient la réponse, maxWrong le nombre de faute max, mistakes le nombre d'erreur, guessed contient les caractères ayant été trouvés
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

//On prend l'array de mot, nous arondissons le Math.random() avec Math.floor() et nous le multiplions par la longueur du tableau, ça retournera entre l'index 0 et 13 de programming_languages
function randomWord() {
  answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
}

//Génération de boutton par lettre de l'alphabet, on prend chaque lettre de l'alphabet dans une string global, on les sépare une par une par split, et avec map nous faisons une boucle qui crée un bouton par lettre de l'alphabet, pour le join
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

//Regarde si avec la lettre proposée soit la bonne lettre, le script va vérifier à chaque fois que tu as donné une lettre, si la lettre est bonne l'index sera supérieur ou égal à 0. Si il est faux il sera égal à -1 donc grâce à ça on va pouvoir verifier(index>=0) quand la lettre est bonne si tu as deviné le mot, et si tu as gagné, dans le cas inverse ça vaux dire que l'indexOf a renvoyé -1 donc c'est une fausse lettre, ça updatera ton nombre de mistakes, l'image de mistake, et ça verifiera si tu perds ou non
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

//Update la source de l'img par nombre de faute
function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

//Fonction de vérification de victoire 
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

//Si le maximum de réponse fausse est ateint, le script affichera le mot et dira que tu as perdu à la place de l'alphabet qui est la variable keyboard
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

//Chaque fois que tu vas vouloir vérifier si la lettre est bonne, tu vas prendre le mots choisi par le pendu, le split, faire une boucle dessus, et verifier si l'index est bien >=0 puis ensuite tu le join pour le remettre en l'état d'avant
function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

//Update le compteur d'erreur à chaque fausse lettre
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

//Remise à zero de tous les élements le nombre d'erreur, la réponse array, l'img, puis on appelle toutes les fonctions faisant tourner le jeux
function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

//randomWord et guessedWord permettent de lancer le jeu
document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();