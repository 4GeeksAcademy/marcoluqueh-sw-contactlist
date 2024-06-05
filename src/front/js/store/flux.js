const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
				},
				{
					title: "SECOND",
				}
			],
			charactersSW: [],
			currentCharacter: {},
			characterDetails: {},
			planetsSW: [],
			currentPlanet: {},
			planetDetails: {},
			starshipsSW: [],
			currentStarship: {},
			starshipDetails: {},
			favorites: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			getCharactersSW: async () => {
				const response = await fetch('https://www.swapi.tech/api/people')
				if (!response.ok) {
					console.log('Error')
					return
				}
				const data = await response.json();
				setStore({charactersSW: data.results})
			},
			chooseCharacter: (character) => {
				setStore({currentCharacter: character});
			},
			getDetailsCharacter: async (url) => {
				const response = await fetch(url)
				if (!response.ok) {
					console.log('Error')
					return
				}
				const data = await response.json();
				setStore({characterDetails: data.result.properties})
			},
			getPlanetsSW: async () => {
				const response = await fetch('https://www.swapi.tech/api/planets')
				if (!response.ok) {
					console.log('Error')
					return
				}
				const data = await response.json();
				setStore({planetsSW: data.results})
			},
			choosePlanet: (planet) => {
				setStore({currentPlanet: planet});
			},
			getDetailsPlanet: async (url) => {
				const response = await fetch(url)
				if (!response.ok) {
					console.log('Error')
					return
				}
				const data = await response.json();
				setStore({planetDetails: data.result.properties})
			},
			getStarshipsSW: async () => {
				const response = await fetch('https://www.swapi.tech/api/starships')
				if (!response.ok) {
					console.log('Error')
					return
				}
				const data = await response.json();
				setStore({starshipsSW: data.results})
			},
			chooseStarship: (planet) => {
				setStore({currentStarship: planet});
			},
			getDetailsStarship: async (url) => {
				const response = await fetch(url)
				if (!response.ok) {
					console.log('Error')
					return
				}
				const data = await response.json();
				setStore({starshipDetails: data.result.properties})
			},
			addFavorites: (newFavorite) => {
                const store = getStore();
                const updatedFavorites = [...store.favorites, newFavorite];
                setStore({ favorites: updatedFavorites });
                console.log('Favorites after adding:', updatedFavorites);
            },
            removeFavorites: (deletedItem) => {
                const store = getStore();
                const updatedFavorites = store.favorites.filter((item) => item !== deletedItem);
                setStore({ favorites: updatedFavorites });
                console.log('Favorites after removing:', updatedFavorites);
            }
		}
	};
};

export default getState;
