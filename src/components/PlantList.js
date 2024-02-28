import React from "react";
import PlantCard from "./PlantCard";

// pass props from plantpage parent to list 

function PlantList({plants, handleDeletePlant, handleChangeEditingMode}) {
  
  return (
    <ul className="cards">
       {plants.map( plants => (
        <PlantCard 
          key={plants.id}
          {...plants}
          handleDeletePlant={handleDeletePlant}
          handleChangeEditingMode={handleChangeEditingMode}
        />
      ))}
      </ul>
  );
}
// now pass to plant card next 

export default PlantList;
