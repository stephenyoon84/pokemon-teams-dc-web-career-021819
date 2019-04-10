// const BASE_URL = "http://localhost:3000"
// const TRAINERS_URL = `${BASE_URL}/trainers`
// const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');

document.addEventListener("DOMContentLoaded", () => {
  Adapter.getTrainers().then(renderTrainers)
})

function renderTrainers(trainers){
  main.innerHTML = '';
  trainers.forEach(renderTrainer)
}

function renderTrainer(trainer){
  let div = document.createElement('div');
  div.classList.add('card');
  div.dataset.id = trainer.id;
  let p = document.createElement('p');
  p.innerText = trainer.name;
  let addBtn = document.createElement('button');
  addBtn.dataset.trainerId = trainer.id;
  addBtn.innerText = "Add Pokemon";
  addBtn.addEventListener('click', (e) => {
    // console.log(`${trainer.id}'s add button has clicked`)
    // console.log(e);
    createNewPokemon(trainer.id).then((res) => {addPokemonToUl(res)});
  });
  div.appendChild(p);
  div.appendChild(addBtn);
  div.appendChild(renderPokemons(trainer.pokemons))
  main.appendChild(div);
}

function renderPokemons(pokemons){
  let ul = document.createElement('ul');
  ul.innerHTML = '';
  pokemons.forEach((el) => {
    let li = document.createElement('li');
    let releaseBtn = document.createElement('button');
    releaseBtn.classList.add('release');
    releaseBtn.dataset.pokemonId = el.id;
    releaseBtn.innerText = "Release";
    releaseBtn.addEventListener('click', (e) => {
      // debugger
      // console.log(`release pokemon ${el.id}`)
      Adapter.deletePokemon(el.id).then(e.currentTarget.parentElement.remove());
    })
    li.innerText = `${el.nickname} (${el.species})`;

    li.appendChild(releaseBtn);
    ul.appendChild(li);
    }
  )
  return ul;
}

function addPokemonToUl(res){
  let targetCard = document.querySelector(`.card[data-id="${res.trainer_id}"]`);
  let targetUl = targetCard.querySelector('ul');
  let li = document.createElement('li');
  let releaseBtn = document.createElement('button');
  releaseBtn.classList.add('release');
  releaseBtn.dataset.pokemonId = res.id;
  releaseBtn.innerText = "Release";
  releaseBtn.addEventListener('click', (e) => {
    // console.log(`release pokemon ${res.id}`)
    Adapter.deletePokemon(res.id).then(e.currentTarget.parentElement.remove());
  })
  li.innerText = `${res.nickname} (${res.species})`;
  li.appendChild(releaseBtn);
  targetUl.appendChild(li);
}

function createNewPokemon(id){
  data = {trainer_id: id};
  return Adapter.postPokemon(data);
}

//////////////////////////////////////////////////////
// const BASE_URL = "http://localhost:3000"
// const TRAINERS_URL = `${BASE_URL}/trainers`
// const POKEMONS_URL = `${BASE_URL}/pokemons`
//
// const getTrainers = () => {
//   return fetch(TRAINERS_URL)
//   .then(res => res.json())
// }
//
// const createPokemon = (trainerId) => {
//   return fetch(POKEMONS_URL, {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       'trainer_id': trainerId
//     })
//   })
//   .then(res => res.json())
// }
//
// const releasePokemon = (pokemonId) => {
//   return fetch(`${POKEMONS_URL}/${pokemonId}`, {
//     method: "DELETE",
//   })
//   .then(res => res.json())
// }
//
// let appContainer = document.querySelector('main')
//
// getTrainers()
//   .then(json => {
//     json.forEach(trainer => {
//       let trainerCard = document.createElement('div')
//       trainerCard.setAttribute('class', 'card')
//       trainerCard.dataset.id = trainer.id
//
//       trainerCard.innerHTML = renderCard(trainer)
//       trainerCard.addEventListener('click', handleButton)
//
//       appContainer.append(trainerCard)
//
//     })
//   })
//
//
// function renderCard(trainer) {
//   return `<p>${trainer.name}</p>
//   <button data-trainer-id="${trainer.id}">Add Pokemon</button>
//   <ul>
//     ${trainer.pokemons.map( pokemon => {
//       return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
//     }).join('')}
//   </ul>
//   `
// }
//
// function handleButton(event) {
//   if(event.target.tagName === "BUTTON") {
//     switch(event.target.innerText){
//       case 'Add Pokemon':
//         createPokemon(parseInt(event.target.dataset.trainerId))
//         .then(pokemon => {
//           if(!pokemon.error){
//             let trainerCard = document.querySelector(`div[data-id='${pokemon["trainer_id"]}']`)
//             let pokemonList = trainerCard.querySelector('ul')
//             pokemonList.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
//           }
//         })
//       break;
//       case 'Release':
//         let pokemonId = parseInt(event.target.dataset.pokemonId)
//         event.target.parentNode.remove()
//         releasePokemon(pokemonId)
//       break;
//     }
//   }
// }
