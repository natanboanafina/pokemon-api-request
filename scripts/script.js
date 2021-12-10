window.addEventListener('load', ()=>{
  fetchingApi();
})

let searchingPokemon = document.querySelector('#searching');
let newResults = document.querySelector('.results')

async function fetchingApi(eventReq){
  try{
  const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${eventReq}`)
  const data = await res.json();
  renderFilt(data)
}catch(e){
  if(e === 400 || e === 404){
    console.log("Página não encontrada");
  }
  console.log(e + ' Erro na API');
}

}
searchingPokemon.addEventListener('input', (event) =>{
  let eventReq = event.target.value.trim().toLowerCase();
  fetchingApi(eventReq);
})
// function filteringData(data, name){
//   console.log(name);
// }
function renderFilt(data){
let newData = data.data;
let output = '';
newData.filter((item) => {
  output += `
    <ul class="bg-dark bg-gradient border border-info" style="--bs-bg-opacity: .2;">
      <li>ID: ${item.id}</li>
      <li>Nome: ${item.name}</li>
      <li>Supertipo: ${item.supertype}</li>
      <li>Tipo: ${item.types}</li>
      <li>Subtipo: ${item.subtypes}</li>
      <li>Evolução de: ${item.evolvesFrom}</li>
      <li>Nome(s) do(s) Ataque(s): ${item.attacks.map(att => `${att.name}`)}</li>
      <li>Custo do(s) Ataque(s): ${item.attacks.map(attCost => `${attCost.cost}`)}
      <figure>
       <img src="${item.images.small}" alt="Logo">
      </figure>
    </ul>
        `
  })
  newResults.innerHTML = output;
}
