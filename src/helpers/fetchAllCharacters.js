import { characterApi } from '../api/characterApi';

export const fetchAllCharacters = async () => {

    let page = 1;
    const resp = await characterApi.get('/character?page=' + page);

    let characterList = resp.data.results;

    for (let i = 2; i <= resp.data.info.pages; i++) {
        const response = await characterApi.get('/character?page=' + i);
        const newCharacters = response.data.results;
        characterList = characterList.concat(newCharacters);
    }


    const characters = characterList.map(value => {
        return {
            id: value.id,
            name: value.name,
            image: value.image,
            status: value.status,
            species: value.species,
            origin: value.origin,
            location: value.location,
            list: page

        }


    })


    return characters 
}