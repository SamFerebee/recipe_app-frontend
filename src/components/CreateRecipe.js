import React, {useState, useEffect} from "react"
import IngredientBox from "./IngredientBox"
import InstructionBox from "./InstructionBox"
import Button from 'react-bootstrap/Button'

const CreateRecipe = ({sendToMain}) => {
    const [ingredients, setIngredients] = useState(null)
    const [proteins, setProteins] = useState([]);
    const [veggies,setVeggies] = useState([]);
    const [sides, setSides] = useState([]);
    const [name, setName] = useState("")
    const [userIngredients, setUserIngredients] = useState([])
    const [userInstructions, setUserInstructions] = useState([])
    const [userPicture, setUserPicture] = useState("")
    useEffect(() => {
        fetch("http://localhost:3000/ingredients/proteins")
            .then(r=> r.json())
            .then(data=>setProteins(data))
        fetch("http://localhost:3000/ingredients/veggies")
            .then(a=> a.json())
            .then(data1=>setVeggies(data1))
        fetch("http://localhost:3000/ingredients/sides")
            .then(b=> b.json())
            .then(data2=>setSides(data2))   
    }, [])

    const handleSubmit = data => {
            fetch("http://localhost:3000/recipes/create_recipe",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(r=>r.json())
                .then(console.log)
            sendToMain();
    }

    const submit = e => {
        e.preventDefault();
        handleSubmit({ingredients: userIngredients, name: name, instructions: userInstructions, picture: userPicture, category: userCategory, description: userDescription});
    }

    const changeName = e => {
        setName(e.target.value)
    }

    const addIngredient = obj => {
        if (obj.checked){
            const tmpobj = {ingredient: obj.name, quantity: obj.quantity}
            const temp = [...userIngredients, tmpobj];
            setUserIngredients(temp);
        }else{
            const index = userIngredients.indexOf(obj.e.target.value);
            let temp = [...userIngredients];
            temp.splice(index, 1);
            setUserIngredients(temp);
        }
    }

    const proteinBoxes = proteins.map((protein) => <IngredientBox ingredient={protein} addIngredient={addIngredient} />)
    const veggieBoxes = veggies.map((veggie) => <IngredientBox ingredient={veggie} addIngredient={addIngredient}/>);
    const sideBoxes = sides.map((side) => <IngredientBox ingredient={side} addIngredient={addIngredient}/>);
    const ongoingIngredients = (
        <ol>
            {userIngredients.map((obj)=> {
            return <li>{obj.ingredient} quantity: {obj.quantity}</li>
        })}
        </ol>
    )
    const ongoingInstructions = (
        <ol>
            {userInstructions.map((i) =><li>{i}</li>)}
        </ol>
    )

    const ongoingRecipe = 
        <> 
            INGREDIENTS:
            {ongoingIngredients}
            INSTRUCTIONS:
            {ongoingInstructions}
        </>



    /////////INSTRUCTION STUFF
    const [instructions, setInstructions] = useState([])

    const createInstruction = instruction => {
        const temp = [...userInstructions, instruction];
        setUserInstructions(temp);
    }

    const addInstruction = () => {
        const t = <InstructionBox createInstruction={createInstruction}/>;
        const temp = [...instructions, t];
        setInstructions(temp);
    }
    //////////////

    const handlePicture = e =>{
        setUserPicture(e.target.value);
    }

    const [userCategory, setUserCategory] = useState("")

    const setCategory = (e) => {
        setUserCategory(e.target.value)
    }

    const categorySelect = (
        <select onChange={setCategory}>
            <option value="none">Choose One</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Entree">Entree</option>
            <option value="Dessert">Dessert</option>
            <option value="Breakfast">Breakfast</option>
        </select>
    )

    const [userDescription, setUserDescription]= useState("");

    const changeDescription = e =>{
        setUserDescription(e.target.value);
    }

    const recipeDescription = (
        <textarea placeholder="Description" onChange={changeDescription} value={userDescription}/>
    )

    return (
        <div className="new-rec">
        <h2>Recipe name:</h2> 
        <p><input type="text" onChange={changeName} value={name} /></p>
            <form onSubmit={submit}>
                <h3>Proteins</h3>
                {proteinBoxes} {' '}
                <h3>Veggies</h3>
                {veggieBoxes}
                <h3>Sides</h3>
                {sideBoxes}
                <h3>Picture Link: </h3>
                <p><input type="text" onChange={handlePicture} value={userPicture}/></p>
                <h3>Category:</h3> 
                <p>{categorySelect}</p>
                <h3>Description:</h3> 
                <p>{recipeDescription}</p>
                <Button as="input" variant="success" type="submit" value="Submit Recipe"/>
            </form>
            <br></br>
            <h2>Instructions</h2>
            {instructions}<br></br>
            <Button variant="success" onClick={addInstruction}>Add an Instruction</Button>
            <p><h2>Current Items:</h2></p>
            {ongoingRecipe}
        </div>
    )
}

export default CreateRecipe