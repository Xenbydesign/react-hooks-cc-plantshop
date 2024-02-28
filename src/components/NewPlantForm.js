import {useState, useEffect} from "react";

const initialState ={
  name:"",
  image:"",
  price:""
}


function NewPlantForm({handleCreatePlant, editPlantById, URL, handleChangeEditingMode, handleEditPlant}) {
 
  const [newPlant, setNewPlant] = useState(initialState)
  
  useEffect(() => {
    if (editPlantById) {
      fetch(`${URL}/${editPlantById}`)
        .then(resp => resp.json())
        .then(data => {
          setNewPlant(data);
        })
        .catch(err => alert(err));
    } else {
      setNewPlant(initialState)
    }
  }, [editPlantById]);


  function handleChange(e){
    const {name, value} = e.target;
    setNewPlant((prevPlant) => ({
      ...prevPlant,
      [name]: value,
    }));
  }

  // handle form submit/edit
  //  because i changed the fetch to a ternery the test to add a new plant is failing however the plant is added 
  const handleOnSubmit = (e) => {
    e.preventDefault();

    fetch(editPlantById ? `${URL}/${editPlantById}` : URL, {
      method: editPlantById ? "PATCH" : "POST",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify(newPlant)
    })
      .then(res => res.json())
      .then(plantData => {
        if (editPlantById) {
          handleEditPlant(plantData);
          handleChangeEditingMode(0);
        } else {
          handleCreatePlant(plantData);
        }
        setNewPlant(initialState);
      })
      .catch(error => {
        console.error("Error with Adding/Updating your PLANT:", error);
      });
  };
  // value and onchange to <input> for name image and price 
  return (
    <div className="new-plant-form">
      <h2>{editPlantById? "Update plant" : "Add New"}</h2>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={newPlant.name} onChange={handleChange}/>
        <input type="text" name="image" placeholder="Image URL" value={newPlant.image} onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={newPlant.price} onChange={handleChange} />
        <button type="submit">{editPlantById? "Update Plant" : "Add Plant"}</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
