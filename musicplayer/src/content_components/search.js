import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'

function Search(){

    const [song, setsong]=useState({
        id:""
    })

    const [list, setlist]=useState([])
    const a = 'https://ws.audioscrobbler.com/2.0/?method=track.search&track='+song+'&api_key=0c10bb04e9187b1f8d8aa108bbe5a034&format=json'
    
    function ChangSong(e){
        setsong({
            ...song,
            [e.target.name]:e.target.value,
        });
        console.log(song)
    };

    function API_search(){
        axios.get('https://ws.audioscrobbler.com/2.0/?method=track.search&track='+song.id+'&api_key=0c10bb04e9187b1f8d8aa108bbe5a034&format=json')
        .then((결과)=>{
            console.log(결과.data)
            console.log(song.id)
            console.log(결과.data.results.trackmatches.track[2].name)
            console.log(a)
        
        let object = 결과.data.results.trackmatches.track

        let array=[];

        object.map((a,i)=>{
                // console.log(object[i].name)
                array[i]=(object[i].name)
                
            })

        setlist([...array])
        
        })   
    }



    function Card(props){
        return(
            <h3>{props.list}</h3>
        )
       
    }
    

    return(
        <div>
            <li>
                search <input type="text"  name="id" onChange={ChangSong}/>
                <button onClick={API_search}>검색</button>
            </li>

            {
                list.map((a, i)=>{
                return <Card list={list[i]} i={i} key={i} />
                })
            }

        </div>

    )

}



export default Search;