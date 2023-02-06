import React from 'react';
import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, getDocs, docs, collectionId, listCollections } from "firebase/firestore";
import "./Results.css";
import "./Homepage.css";
import { useEffect, useState } from 'react';
import { faShuttleSpace } from '@fortawesome/free-solid-svg-icons';
import { queryHelpers } from '@testing-library/react';
import { userInput, userClickedInput, category } from "./Homepage.js";
import Popup from './ResultsPopup';
import "./ResultsPopup.css";
import { useNavigate } from "react-router-dom";


var tagDisplay = null;
function PairingData() {
            const firestore = getFirestore();
            var usersInput = null
            if (userInput == userClickedInput) {
                usersInput = userInput;
            }
            else {
                usersInput = userClickedInput;
            }


            

            let elemCategory = "";
            const [displayResults, resultingStr] = useState(' ');
            const [resPairs, setResPairs] = useState({});
            const [resValue, setResValue] = useState("");
            const [tabName, setTabName] = useState("");
            const [tagValue, setTagValue] = useState("");
            const [isOpen, setIsOpen] = useState(false);

            let navigate = useNavigate(); 
            const goHome = () =>{ 
            let path = `/home`;
            navigate(path);
     }

            useEffect(() => {
            var promise = new Promise(function(resolve) {
                itemPairs().then(res => {
                    varieties().then(data => {
                        parseData(res, data); 
                        })
                    });

                    resolve(true);  
     
            })
            promise.then(bool => console.log("Promise resolved"));
            }, []); 

            async function varieties(props){

                var varieties = [];
                const collections = query(
                    collection(firestore, category),
                ); 
                const querySnapshot = await getDocs(collections);
                const allDocs = querySnapshot.forEach((snap) => {
                    if (snap.id == "Varieties") {
                        varieties += JSON.stringify(snap.data());
                    }
                }); 
                return varieties;       
            }


            async function itemPairs(props){

                var itemPairs = {};
            
                const collections = query(
                    collection(firestore, category),
                ); 
                const querySnapshot = await getDocs(collections);
                const allDocs = querySnapshot.forEach((snap) => {
                        if (!(snap.id in itemPairs && snap.id == "Varieties" )){
                            itemPairs[snap.id] = snap.data();
                    }

                }); 
                itemPairs = JSON.stringify(itemPairs)
                return itemPairs;       
            }


            function parseData(pairs, vars) {

                setResPairs(pairs);
                let results = [];
                let pairsDict = JSON.parse(pairs);
                let varsDict = JSON.parse(vars);


                for (const [key, value] of Object.entries(varsDict)) {
                    
                    if (value != []) {
                        for (const elem of value) {
                            
                            if (elem == usersInput) {
                                elemCategory = key;
                                setTabName(elemCategory);
                                break;
                                }
                            }
                        }
                    }
                
                
                for (const [key, value] of Object.entries(pairsDict)) {
                    if (key == elemCategory && key !== "Varieties") {
                        for (const [elemType, elems] of Object.entries(value)) {
                                results.push(elemType);       
                        }
                    }
                }

                var str = " ";
                for (var i = 0; i < results.length; i++) {
                    str += '<button type="button" class="shapeResult" value="'+ results[i] +'">' + results[i] + '</button>'
                }
                resultingStr(str);
                
                }
        
            function handleSubmit(event) {

                console.log(tabName);
                let pairsDict = JSON.parse(resPairs);
                var tag = "";
                for (const [key, value] of Object.entries(pairsDict)) {
                    if (key == tabName) {
                        
                    for (const [elemType, elems] of Object.entries(value)) {
                        if (elemType == event.target.value) {
                            for (var i = 0; i < elems.length; i++) {
                                if (category == "Wine") {
                                        tag += '<div class="resultListItem"><a href="https://tasty.co/search?q=' + elems[i] + '&sort=popular" target="_blank">' + elems[i] + '</a></div>';
                                }
                                if (category == "Food") {
                                        var item = elems[i].toLowerCase();
                                        tag += '<div class="resultListItem"><a href="https://winefolly.com/grapes/' + item + '/" target="_blank">' + elems[i] + '</a></div>';
                                    }
                                }
                            }
                        }
                    }
                    
                }
               setTagValue(prev => tag);
                
            togglePopup();                
            }



            function togglePopup() {
                setIsOpen(!isOpen);
                    
                    
                }

            
            if (isOpen == true) {
                if (tagValue != "") {
                return (
                    <>
                    
                    {isOpen && <Popup
                        handleClose={togglePopup}
                        content={<div dangerouslySetInnerHTML={{__html: tagValue}}></div>}
                    />}
                    </>);
            
                    }
                    else {
                        return (
                            <>
                            
                            {isOpen && <Popup
                                handleClose={togglePopup}
                                content={<div class="resultListItemNull">So awkward, there's nothing here yet. Check another!</div>}
                            />}
                            </>);

                    }
                }
            return (
                <div className="resultsContainer">

                    <button className="backButton" onClick={goHome}><i class="fa-solid fa-circle-arrow-left"></i></button>
                    <div className="resultsHeadline"><b>{usersInput}</b> pairs best with:</div>
                    <form dangerouslySetInnerHTML={{__html: displayResults}} onClick={handleSubmit}></form>
                                       
                    
                </div>
                );
            
         }
            
export default PairingData;
