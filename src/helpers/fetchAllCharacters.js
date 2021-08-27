import {characterApi} from '../api/characterApi';

export const fetchAllCharacters = async(i) => {
    
    
    const resp = await characterApi.get('/character?page=' + i);
     //console.log(resp.data.results);
     //console.log(resp.data.info.pages);
      
    const characterList = resp.data.results;

    const character = characterList.map( value =>{
        return {
            id: value.id,
            name: value.name,
            image: value.image,
            status: value.status,
            species: value.species,
            origin: value.origin,
            location: value.location,
            list: i
    
        }
    
    
    })


//    console.log(character);
    return character;
}




