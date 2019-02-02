import React from 'react';
import './style.css';
import RecipeCard from './components/RecipeCard/RecipeCard';
import ContactForm from './components/ContactForm';
import axios from 'axios';

const Login = (props) => (
    <form>
        <div className="username">Username</div><input value={props.username} onChange={props.changeHandler} name='username' type='text' placeholder='Enter Username' />
        <div className="password">Password</div><input value={props.password} onChange={props.changeHandler} name='password' type='password' placeholder='Enter Password' />
        <div className="buttons"></div><button onClick={props.clickHandler} style={{ background: 'rgb(2, 159, 250)', color: 'white' }}>Login</button>
    </form>
);

const DirectoryView = (props) => {
    return (
        <div>
            {props.recipes.map(recipe =>
                <RecipeCard updateDetails={props.updateDetails}
                    id={recipe._id}
                    name={recipe.name} key={recipe._id} />)}
        </div>
    );
}

const DetailView = (props) => {
    return (
        <div className="position">
            <h1 style={{ color: 'rgb(2, 159, 250)' }}>{props.name}</h1>
            <div className="ingredients">Ingredients:</div>{props.ingredients.map((step, i) => <p key={i}>{step} </p>)}
            <div className="instructions">Instructions:</div>{props.instructions.map((step, i) => <p key={i}>{step} </p>)}
            <ContactForm />
        </div>
    )
};

const SearchForm = (props) => (
    <form>
        <input className="input" value={props.searchVal} onChange={props.handleChange} placeholder='Search Recipes' />
        <button className="button" >Search</button>

    </form>
);

const RecipeButton = (props) => (
    <div className="blue">
        <form>
            <button onClick={props.displayForm} className="button" style={{ background: 'rgb(2, 159, 250)', color: 'white' }}>Add Recipe</button>
        </form>
    </div>
);

const RecipeForm = (props) => {
    return (<div className="form"><form>
        <div><h3>Name</h3><input className="input" onChange={props.handleInputChange} name="name" style={{ width: "500px" }} value={props.name}></input></div>{<br />}
        <div><h3>Ingredients</h3><textarea className="input" onChange={props.handleInputChange} name="ingredients" style={{ width: "500px", height: "50px" }} value={props.ingredients}></textarea></div>{<br />}
        <div><h3>Instructions</h3><textarea className="input" onChange={props.handleInputChange} name="instructions" style={{ width: "500px", height: "50px" }} value={props.instructions}></textarea></div>{<br />}{<br />}{<br />}
        <button onClick={props.addRecipe} className="button" style={{ background: 'rgb(2, 159, 250)', color: 'white' }}>Submit</button>
    </form> </div>)
}

class App extends React.Component {
    state = {

        searchVal: '',
        selectedRecipes: [],
        details: {},
        shouldShowDetails: false,
        shouldDisplayRecipeForm: false,
        id: '',
        name: '',
        ingredients: '',
        instructions: '',
        isLoggedIn: false,
        username: '',
        password: '',
        recipes: []

    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitLogin = (e) => {
        e.preventDefault();
        axios.post('/api/login', { username: this.state.username, password: this.state.password })
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                return error;
            });
        this.setState({ isLoggedIn: !this.state.isLoggedIn })
    }

    componentDidMount() {
        this.getRecipes()
        
        axios.get('/api/login')
            .then((result) => {
                console.log("from api/login", result)
                console.log("result.data", result.data)
            })
    }

    shouldDisplayForm = (event) => {
        event.preventDefault()
        this.setState({ shouldDisplayRecipeForm: true })
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ searchVal: event.target.value, shouldShowDetails: false, shouldDisplayRecipeForm: false });
        this.selectRecipes()
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value });
    }

    addRecipe = (event) => {
        event.preventDefault()


        this.setState({ shouldDisplayRecipeForm: false })
        axios.post('/api/recipe', { name: this.state.name, ingredients: this.state.ingredients, instructions: this.state.instructions })
            .then((result) => {
                this.getRecipes()

            })
            .catch((error) => {
                return error;
            });
    }

    getRecipes() {
        axios.get('/api/recipe')
            .then((results) => {
                console.log(results.data);
                this.setState({ recipes: results.data })
            })
    }

    selectRecipes = () => {
        let selectedRecipes = this.state.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.state.searchVal.toLowerCase()))
        this.setState({ selectedRecipes: selectedRecipes })
    }

    updateDetails = id => {
        this.setState({ shouldShowDetails: true })
        this.state.recipes.forEach(recipe => {
            if (recipe._id === id) {
                this.setState({
                    details: recipe
                })
            }
        })

    }

    render() {

        let details
        if (this.state.shouldShowDetails) {
            details = (<DetailView
                name={this.state.details.name}
                key={this.state.details._id}
                ingredients={this.state.details.ingredients}
                instructions={this.state.details.instructions}
            />)
        }
        let main
        if (this.state.shouldDisplayRecipeForm === false) {
            main = (<main>
                <DirectoryView
                    recipes={this.state.selectedRecipes}
                    updateDetails={this.updateDetails}
                />
                {details}
            </main>)
        }
        else {
            main = (<main>
                <RecipeForm
                    handleInputChange={this.handleInputChange}
                    addRecipe={this.addRecipe}
                />

            </main>)
        }

        return (
            <div className="app">
                <header>Secret Recipe App<h6>Protecting Your Signature Recipes</h6></header>
                {!this.state.isLoggedIn
                    ?
                    <Login clickHandler={this.submitLogin}
                        changeHandler={this.changeHandler}
                        username={this.state.username}
                        password={this.state.password}
                    />

                    :
                    <div>

                        <SearchForm searchVal={this.state.searchVal} handleChange={this.handleChange} />
                        <RecipeButton displayForm={this.shouldDisplayForm} />
                        {main}</div>
                }
            </div>
        );
    }
}

export default App