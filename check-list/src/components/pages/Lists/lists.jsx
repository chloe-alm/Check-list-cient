import React from 'react'
import ListCard from '../../molecules/ListCard'
import NavBar from '../../molecules/NavBar'
import ListCreate from '../../organisms/CrudList/ListCreate'


export default function Lists(props) {
    

    return (
        <>
    
        <NavBar/>
      <h2>Création d'une liste</h2>
       <ListCreate/>
        
        </>
    )
}
