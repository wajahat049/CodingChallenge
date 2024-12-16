import {useInfiniteQuery, useQuery} from 'react-query';

const fetchPokemons = async ({pageParam = 0}) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${pageParam}`,
    );
    return response.json();
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw error; // Rethrow the error for further handling
  }
};

export const usePokemons = () => {
  return useInfiniteQuery('pokemons', fetchPokemons, {
    getNextPageParam: (lastPage, pages) => pages.length * 10,
  });
};

const fetchPokemonDetail = async ({url}: {url: string}) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw error; // Rethrow the error for further handling
  }
};

export const usePokemonDetail = (url: string) => {
  return useQuery(['pokemonDetail', url], () => fetchPokemonDetail({url}));
};
