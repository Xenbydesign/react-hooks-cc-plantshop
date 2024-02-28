import React,{useState} from "react";

// need to pass props from Plant list to plant card to display  

function PlantCard({ id, name, image, price, handleDeletePlant, handleChangeEditingMode}) {
  const [inStock, setInStock] = useState(true);

  // I can mark a plant as "sold out".
  function handleClick () {
    setInStock(!inStock)
  }
 
// add onclick to button should be ternary with instock to handle click 
  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={() => handleDeletePlant(id)}>🗑️</button>
      <button onClick={() => handleChangeEditingMode(id)}>✏️</button>
    </li>
    
  );
}
// click is not working running debugger everything was working correctly but onclick as wrong should have been onClick "C" camel case 



export default PlantCard;
