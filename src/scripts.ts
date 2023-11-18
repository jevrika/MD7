const container = document.querySelector<HTMLDivElement>('.container');
const buttonWrapper = document.querySelector<HTMLDivElement>('.button-wrapper');
const cardsWrapper = document.querySelector<HTMLDivElement>('.memory-game');
const button = document.querySelector<HTMLButtonElement>('.button');
const cardsImg: string[] = ['🌚', '🌚', '🍄', '🍄', '🦝', '🦝'];
let moves = 0;
// funkcija, kur atgriež sajauktu masīvu
const shuffleCardsArray = () => {
  const newcardsImg = cardsImg.slice().sort(() => Math.random() - 0.5);
  return newcardsImg;
};

// Funkcija, kura reseto spēli
const resetGame = () => {
  moves = 0;
  // Taisa jauno mainīgo, kurā būs sajaukts elemntu masīvs
  const shuffledCardsImg = shuffleCardsArray();
  // Noņem winner div, kur iekšā ir winner teksts un poga
  document.querySelector('.winner').remove();
  // noņema display vispār, lai kartiņas parādās kā parasti
  cardsWrapper.style.display = '';
  // Taisam jauno mainīgo, kurā būs visas kartiņas un ejam katrai
  // cauri un uzliekam klasi card, pievienojam jaunas bildītes,
  // padaram par redzamu un uzliekam tukšu display
  const allCards = document.querySelectorAll<HTMLDivElement>('.card');
  allCards.forEach((_card, index) => {
    allCards[index].className = 'card';
    allCards[index].innerHTML = shuffledCardsImg[index];
    allCards[index].style.visibility = 'visible';
    allCards[index].style.display = '';
  });
};

// Funkcija, kur parādīsies Winner un reset poga un kartiņas tiks pasleptas
const displayWinner = () => {
  // paslepj kartiņas
  cardsWrapper.style.display = 'none';
  // taisam jauno mainīgo, kurā liekam iekša visus card
  const allCards = document.querySelectorAll<HTMLDivElement>('.card');
  // ejam cauri katram cards un liekam display 'none'
  allCards.forEach((_card, index) => {
    allCards[index].style.display = 'none';
  });
  // deklarē mainīgo winner, pievieno klasi winner un padara par redzamu un pievieno pie konteinera
  const winner = document.createElement('div');
  winner.classList.add('winner');
  container.appendChild(winner);
  winner.style.visibility = 'visible';
  // deklarē jauno mainīgo winnerText, pievieno klasi winner-text un pievieno pie winner diva
  const winnerText = document.createElement('p');
  winnerText.classList.add('winner-text');
  winnerText.innerText = 'WINNER';
  winner.appendChild(winnerText);
  // deklarē jauno mainīgo resetGameButtonWrapper ,
  // pievieno klasi reset-game-wrapper un pievieno pie winner diva
  const resetGameButtonWrapper = document.createElement('div');
  resetGameButtonWrapper.classList.add('reset-game-wrapper');
  winner.appendChild(resetGameButtonWrapper);
  // deklarē jauno mainīgo resetGameButton ,
  // pievieno klasi reset-game__button un pievieno pie resetGameButtonWrapper diva
  const resetGameButton = document.createElement('button');
  resetGameButton.classList.add('reset-game__button');
  resetGameButton.innerText = 'Reset Game';
  resetGameButtonWrapper.appendChild(resetGameButton);

  // pievieno eventlistener pie pogas, kad uzspiež pogu, tiek izsaukta funkcija resetGame
  resetGameButton.addEventListener('click', resetGame);
};
// funkcija, kura pievieno klasi cardOpen, kad kartiņa i atvērta, salīdzina atvērtās kartiņas
const handleCardClick = (event: Event) => {
  // Pieskaita pie moves 1
  moves += 1;
  console.log(`Current move count is: ${moves}`);
  // Kad uzspiež uz kartiņas, pievieno klasi cardopen
  const target = event.target as Element;
  target.classList.add('cardOpen');
  // Taisam jauno mainīgo, kur liekam ieksā visas kartiņas ar klasi cardopen
  setTimeout(() => {
    const openCards = document.querySelectorAll('.cardOpen');
    // Ja openCards garums ir lielāks par viens,
    // tad paskatās vai 1 un 2 kartiņa ir vienāda
    // un iedod klasi cardMatch un noņem klasi cardopen
    if (openCards.length > 1) {
      if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add('cardMatch');
        openCards[1].classList.add('cardMatch');
        openCards[0].classList.remove('cardOpen');
        openCards[1].classList.remove('cardOpen');
        // Ja visas kartiņas ir atvērtas, tad izsauc displayWinner
        if (
          document.querySelectorAll('.cardMatch').length === cardsImg.length
        ) {
          displayWinner();
        }
        // Ja kariņas nav vienādas, tad noņem klasi cardopen
      } else if (openCards[0].innerHTML !== openCards[1].innerHTML) {
        openCards[0].classList.remove('cardOpen');
        openCards[1].classList.remove('cardOpen');
      }
    }
  }, 800);
};
// Funkcija, kura izveido sākumakartiņas
const initializeGame = () => {
  // Mainīgais, kurā ir sajauktas bildītes
  const shuffledCardsImg = shuffleCardsArray();
  // Veidojam jaunus divuu, kuriem klase būs card,
  // iedodam visibility = visible un pievienojam sajauktā kartībā bildītes
  for (let i = 0; i < 6; i += 1) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.visibility = 'visible';
    card.innerHTML = shuffledCardsImg[i];
    // Kad uzspiež uz kartiņas, tad izsauc funkciju handleCardClick,
    // pievieno kartiņu pie wrappera
    card.addEventListener('click', handleCardClick);
    cardsWrapper.appendChild(card);
  }
};

// Sakuma poga padara cardWrapper par redzemu,
// padara viņu uz visu ekrāna augstumu un paslēpj pogu, uz izsauc spēli
button.addEventListener('click', () => {
  cardsWrapper.style.visibility = 'visible';
  cardsWrapper.style.height = '100vh';
  buttonWrapper.style.display = 'none';
  initializeGame();
});
