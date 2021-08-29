import React from 'react'
import { Loading } from '../components/Loading';
import { useCharacter } from '../hooks/useCharacter'

export const HomePage = () => {
    const {
        isLoading,
        characters,
        nextPage,
        prevPage,
        amountOfPages,
        searchText,

        onSearchTextChange
    } = useCharacter();
    
    return (
        <div className="mt-5">
            <h1>Listado de Personajes</h1>
            <hr />
            <input
                type="text"
                className="mb-2 form-control"
                placeholder="Busqueda por locación"
                value={searchText}
                onChange={onSearchTextChange}

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
                        characters.map(char => (
                            <tr key={char.id}>
                                <td>{char.id}</td>
                                <td>{char.name}</td>
                                <td>
                                    <img
                                        src={char.image}
                                        alt={char.name}
                                        style={{ height: 75 }}
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