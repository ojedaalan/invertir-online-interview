import React, { useState } from 'react'
import { Loading } from '../components/Loading';
import { useCharacter } from '../hooks/useCharacter'

export const HomePage = () => {

    const {isLoading, character} = useCharacter();
    const [currentPage, setcurrentPage] = useState(0);
    const [search, setSearch] = useState('');

    const filteredCharacters = () => {
        if(search.length === 0)
        return character.slice(currentPage, currentPage + 15);
        const filtered = character.filter( char => char.location.name.includes(search) );
        return filtered.slice(currentPage, currentPage + 15);
    
    
    }
    const nextPage= () => {
        if (character.filter( char => char.location.name.includes(search) ).length > currentPage + 15)
        setcurrentPage( currentPage + 15 );
    }
    const prevPage= () => {
        if ( currentPage>0 )
        setcurrentPage( currentPage - 15 );
    }
    const onSearchChange = ({target}) => {
        setcurrentPage(0);
        setSearch(target.value);


    }


    return (
        <div className="mt-5">
            <h1>Listado de Personajes</h1>
            <hr/>
            <input 
                type="text"
                className="mb-2 form-control"
                placeholder="Busqueda por locación"
                value={search}
                onChange={ onSearchChange }
            
            />

            <button 
            className="btn btn-primary"
            onClick={prevPage}
            >
                Anteriores
            </button>
            &nbsp;
            <button 
                className="btn btn-primary"
                onClick={nextPage}
            >
                Siguientes
            </button>


            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: 30 }}>id</th>
                        <th style={{ width: 120 }}>name</th>
                        <th style={{ width: 100 }}>image</th>
                        <th style={{ width: 50 }}>status</th>
                        <th style={{ width: 50 }}>species</th>
                        <th style={{ width: 100 }}>origin</th>
                        <th style={{ width: 150 }}>location</th>
                    </tr>
                </thead>
                <tbody>

                    {
                       
                        filteredCharacters().map( char => (
                        
                            <tr key={char.id}>
                                <td>{char.id}</td>
                                <td>{char.name}</td>
                                <td>
                                    <img 
                                        src={char.image}
                                        alt={char.name}
                                        style={{ height:75 }}
                                    />
                                </td>
                                <td>{char.status}</td>
                                <td>{char.species}</td>
                                <td>{char.origin.name}</td>
                                <td>{char.location.name}</td>
                            </tr>
                        ))
                        
                    }
                        
                <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tbody>
            </table>
            {
                isLoading && <Loading />
            }


        </div>
    )
}
