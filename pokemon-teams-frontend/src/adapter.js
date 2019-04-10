const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

class Adapter {
  static getTrainers(){
    return fetch(TRAINERS_URL).then(res => res.json());
  }

  static postPokemon(data){
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    return fetch(POKEMONS_URL, option).then(res => res.json());
  }

  static deletePokemon(id){
    const option = {
      method: "DELETE"
    }
    return fetch(POKEMONS_URL + `/${id}`, option).then(res => res.json());
  }
}
