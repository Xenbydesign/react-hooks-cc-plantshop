import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
const URL = 'http://localhost:6001/plants'



// I can search for plants by their name and see a filtered list of plants.

function PlantPage() {
  
  const [plants, setPlants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editPlantById, setEditPlantById] = useState('')

  
// When the app starts, I can see all plants. (this will fetch the data and add to <plantlist>)
  useEffect (() => {
    fetch (URL)
    .then (res => res.json())
    .then (plantData => setPlants(plantData))
  },[])
 
// I can search for plants by their name and see a filtered list of plants.

function handleSearch(e){
setSearchTerm(e.target.value)
}
// updates the state with a succesful post 

  // I can add a new plant to the page by submitting the form.( add to plants and new plant to <new plants form> & <search>)

function handleCreatePlant(plantData){
  setPlants(prevPlants => [...prevPlants, plantData]);
}
// advanced delete a plant and is gone when it refreshes / edit price
const handleDeletePlant = (idOfPlantToRemove) => {
  // find the plant i want to remove 
  const plantToRemove = plants.find(plants => plants.id === idOfPlantToRemove)
 //remove the plant 
  setPlants(currentPlant => currentPlant.filter(plants => plants.id !== idOfPlantToRemove))
  // update the server of plat to remove
  fetch(`${URL}/${idOfPlantToRemove}`, {method: "DELETE"}) 
  // handles errors 
  .then(resp => {
    if (!resp.ok) {
      throw new Error('Plant was not deleted !')
    }
  })
  .catch(err => {
    alert(err)
  // readds the plant if not deleted correctly 
    setPlants(currentPlant => [...currentPlant, plantToRemove])
  })
}

const handleChangeEditingMode = (value) => {
// this (value === editPlantById ? '' : value ) will toggle the button so i can go to edit mode but also leave edit mode. 
// value on click will be the id 2nd click will empty back to '' false 
// update useEffect in plant page to use else for the toggle to clear the form back to the initial state of 
// else {
//       setNewPlant(initialState)
//     }
  setEditPlantById(value === editPlantById ? '' : value );
}
// pass to plant list then to plant card 

const handleEditPlant = (plantToUpdate) => {
  setPlants(currentPlant => currentPlant.map(plant => plant.id === plantToUpdate.id ? plantToUpdate : plant))
}
// pass to newplantform

const filterPlants = plants.filter(plant => {
          const plantNameLowerCase = plant.name.toLowerCase()
          return plantNameLowerCase.includes(searchTerm)
        })

  return (
    <main>
      <NewPlantForm 
      handleCreatePlant={handleCreatePlant} 
      editPlantById={editPlantById}
      URL={URL}
      handleEditPlant={handleEditPlant}
      handleChangeEditingMode={handleChangeEditingMode}
      />
      <Search
      searchTerm={searchTerm} 
      handleSearch={handleSearch}
      />
      
      <PlantList 
      plants={filterPlants}
      handleDeletePlant={handleDeletePlant}
      handleChangeEditingMode={handleChangeEditingMode}
      />
    </main>
  );
}

export default PlantPage;
