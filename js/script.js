const $pokemonId = document.querySelector(".pokemon__number");
const $pokemonName = document.querySelector(".pokemon__name");
const $pokemonImage = document.querySelector(".pokemon__image");

const $form = document.querySelector(".form");
const $input = document.querySelector(".input__search");
const $shinyBtn = document.querySelector(".btn-shiny")

const $buttonPrev = document.querySelector(".btn-prev");
const $buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  $pokemonName.innerHTML = "Carregando...";
  $pokemonId.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    $pokemonImage.style.display = "block";
    if ($shinyBtn.classList.contains('active')){
    $pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_shiny"
      ];
    } else {
        $pokemonImage.src =
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
          "front_default"
        ];
    }
    $pokemonId.innerHTML = data.id + '-';
    $pokemonName.innerHTML = data.name;
    searchPokemon = data.id;
  } else {
    $pokemonId.innerHTML = "";
    $pokemonName.innerHTML = "Não Encontrado";
    $pokemonImage.style.display = "none";
  }
};

$shinyBtn.addEventListener("click", () => {
    $shinyBtn.classList.toggle('active')
    renderPokemon(searchPokemon);
})

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon($input.value.toLowerCase());
  $input.value = "";
});

$buttonPrev.addEventListener("click", () => {
  if (searchPokemon <= 1) searchPokemon = 650;
  searchPokemon -= 1;
  renderPokemon(searchPokemon);
});

$buttonNext.addEventListener("click", () => {
  if (searchPokemon >= 649) searchPokemon = 0;
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
