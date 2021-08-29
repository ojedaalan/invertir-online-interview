import { useEffect, useState, useRef } from "react"
import { fetchAllCharacters } from "../helpers/fetchAllCharacters";

const PAGE_SIZE = 15;
export const useCharacter = () => {

    const [searchText, setSearchText] = useState('');
    const [amountOfPages, setAmountOfPages] = useState(1);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    // const [initialCharacters, setInitialCharacters] = useState([]);
    const initialCharactersRef = useRef([])

    useEffect(async () => {
        initialCharactersRef.current =  await fetchAllCharacters();
        setFilteredCharacters(page, searchText);
    }, [])

    const setFilteredCharacters = async (currentPage = 1, searchText = '') => {
        setIsLoading(true); 
        let charactersFiltered = initialCharactersRef.current
        if(searchText) {
            charactersFiltered = charactersFiltered.filter(char => char.location.name.toLowerCase().includes(searchText.toLowerCase()))
        }
        setAmountOfPages(Math.ceil(charactersFiltered.length / PAGE_SIZE));

        const startSlice = (currentPage - 1) * PAGE_SIZE;
        const endSlice = currentPage * PAGE_SIZE;
        charactersFiltered = charactersFiltered.slice(startSlice, endSlice);

        setCharacters(charactersFiltered);
        setIsLoading(false); 
    }

    const nextPage = () => {
        if(page < amountOfPages) {
            setPage(page + 1);
            setFilteredCharacters(page + 1, searchText);
        }
    }
    const prevPage = () => {
        if(page > 1) {
            setPage(page - 1);
            setFilteredCharacters(page - 1, searchText);
        }
    }

    const onSearchTextChange = ({ target }) => {
        setSearchText(target.value);
        setPage(1);
        setFilteredCharacters(1, target.value);
    }

    return{
        isLoading,
        characters,
        page,
        amountOfPages,
        nextPage,
        prevPage,
        onSearchTextChange,
        searchText
    }

}