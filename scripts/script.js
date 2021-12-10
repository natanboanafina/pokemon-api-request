window.addEventListener('load', ()=>{
  console.log("Olá, mundo!");
  fetchingApi();
})

let searchingPokemon = document.querySelector('#searching');
let newResults = document.querySelector('.results')

async function fetchingApi(eventReq){
  const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${eventReq}`)
  const data = await res.json();

  renderFilt(data)
}
searchingPokemon.addEventListener('input', (event) =>{
  let eventReq = event.target.value.trim().toLowerCase();
  fetchingApi(eventReq);
})
// function filteringData(data, name){
//   console.log(name);
// }
function renderFilt(data){
let output = '';
  data.data.filter((item) => {
  output += `
    <ul>
      <li>Nome: ${item.name}</li>
      <li>Supertipo: ${item.supertype}</li>
      <li>Tipo: ${item.types}</li>
      <li>Subtipo: ${item.subtypes}</li>
      <li>Evolução de: ${item.evolvesFrom}
    </li>
      <li>Ataques: ${item.attacks.map(attack => 
        `
        <span>${attack.name}</span>,
        <span>${attack.cost}</span>
        `)}</li>

      </ul>
  `
  })
  newResults.innerHTML = output;
}
