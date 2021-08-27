import { useEffect, useState } from "react"
import { fetchAllCharacters } from "../helpers/fetchAllCharacters";

export const useCharacter = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [character, setCharacter] = useState([]);
   

    useEffect(() => {
        // Carga de los personajes
        for (let i=0; i<35; i++){
        fetchAllCharacters(i)
            .then( character => {
            
                setCharacter(cats => cats.concat(character) );

                //console.log(character);
                
            })};
            setIsLoading(false); 
    
        
    }, [])

    return{
        isLoading,
        character
    }

}
