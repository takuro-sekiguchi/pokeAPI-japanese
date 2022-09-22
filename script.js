const url = "https://pokeapi.co/api/v2/pokemon";

//全てのポケモンデータを返す関数
const getAllPokemon = async (url) => {
  const res = await fetch(url)
    .then((res) => res.json())
    .then((data) => data);
  return res;
};

//受け取った20のポケモンデータをmapメソッドで取り出す
const loadPokemon = async (allPokemonDataResults) => {
  const _pokemonData = await Promise.all(
    allPokemonDataResults.map((pokemon) => {
      let pokemonRecord = getPokemon(pokemon.url);
      return pokemonRecord;
    })
  );
  return _pokemonData;
};

const getPokemon = async (pokemonURL) => {
  const PokemonDetail = await fetch(pokemonURL)
    .then((res) => res.json())
    .then((data) => data);
  return PokemonDetail;
};

//受け取った詳細なポケモンデータからspeciesのURLを取り出す
const loadPokemonDetail = async (PokemonDatas) => {
  const _pokemonData2 = await Promise.all(
    PokemonDatas.map((pokemon) => {
      let pokemonRecord2 = getPokemon2(pokemon.species.url);
      return pokemonRecord2;
    })
  );
  return _pokemonData2;
};

const getPokemon2 = async (pokemonDetailURL) => {
  const PokemonDetail2 = await fetch(pokemonDetailURL)
    .then((res) => res.json())
    .then((data) => data);
  return PokemonDetail2;
};

//最終的に実行する関数の宣言
const fetchPokemonData = async () => {
  const allPokemon = await getAllPokemon(url);
  const PokemonDatas = await loadPokemon(allPokemon.results);
  const PokemonMoreDatas = await loadPokemonDetail(PokemonDatas);

  const display = PokemonMoreDatas.map((value) => {
    let array = [];
    array.push(value.names[0].name);
    console.log(array);
    const ulContent = document.getElementById("pokemon");
    const item = document.createElement("li");
    item.innerHTML = array;
    ulContent.appendChild(item);
    return array;
  });
};

//関数の実行
fetchPokemonData();
