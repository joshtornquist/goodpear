import ReactDOM from 'react-dom/client';
import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route, Routes } from 
'react-router-dom';
import { useState, useEffect } from 'react';
import "./Homepage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, query, getDocs, docs, collectionId, listCollections } from "firebase/firestore";
import Fuse from 'fuse.js';


var category = null;
var userInput = null
var userClickedInput = null

function Homepage() {

    const [drinks, setDrinks] = useState([]);

    const [userOption, setUserOption] = useState(["Select", "Wine", "Food"]);
    const [userOptionSelected, setUserOptionSelected] = useState('');
    const Add = userOption.map(Add => Add);
    const handleUserOptionChange = (e) => {return setUserOptionSelected(userOption[e.target.value])}

    var [myQuery, setQuery] = useState('');
    const firestore = getFirestore();
    
    


    useEffect(() => {
        if (userOptionSelected != "") { 
        searchList();
    }}, [myQuery, userOptionSelected]) 


     let navigate = useNavigate(); 
     const routeChange = () =>{ 
     let path = `/pairings`;
     navigate(path);
     }


    async function searchList(props){
        var types = [];
        var varieties = null;
        const collections = query(
        collection(firestore, userOptionSelected),
        ); 
        const querySnapshot = await getDocs(collections);
        const allDocs = querySnapshot.forEach((snap) => {
            if (snap.id == "Varieties") {
                varieties = snap.data();
            }
        }); 
        for (const [key, value] of Object.entries(varieties)) {
            for (var i = 0; i < value.length; i++ ) {
                types.push(value[i]);
            }
        }
        console.log(types);
        setDrinks(types);   

    }

    function saveSelected(res) {
        category = userOptionSelected;
        if (category  != 'Food' && category != 'Wine') {
            return alert("Please select a type!");
            
        }
        else {
            userClickedInput = res;
            userInput = myQuery;
            routeChange();
        }
     
    }

    const options = {
        // isCaseSensitive: true,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        threshold: 0.6,
        distance: 1,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: []
      };
    
    const fuse = new Fuse(drinks, options);
    const results = fuse.search(myQuery);
    const characterResults = results.map(result => result.item);

    function handleOnSearch({currentTarget = {}}) {
        const {value} = currentTarget;
        setQuery(value);
    }

    return (
        <div>
        
        <div className="container">
        
            <div className="headline">Discover the <span className="emphasis">perfect</span> pairing</div>
            

            <div className="selectType">
                    <select
                        onChange={e => handleUserOptionChange(e)}
                        className="dropdown" >
                        {
                            Add.map((address, key) => <option key={key}value={key}>{address}</option>)
                        }
                    </select >      
                    <input 
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        className="userInputField"
                        placeholder="Search for pairing"  
                        onChange={handleOnSearch}
                    />
                <button className="submit" type="input" value={myQuery} onClick={() => {saveSelected(myQuery)}}>Pair</button>
                <div>
                {characterResults.map((result) => (
                    
                    <button onClick={() => {saveSelected(result) }} className="searchResults" key={result}>{result}</button>
                    
                ))}
                </div>
                
                
            </div>

        </div>


        <footer className="footer">
            Goodpear Ⓒ 2022
        </footer>

        </div>



    );

}


export default Homepage;
export {userInput};
export {userClickedInput};
export {category};