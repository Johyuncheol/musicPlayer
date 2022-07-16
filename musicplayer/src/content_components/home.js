import React from 'react'
import axios from 'axios';
import {useEffect,useState} from 'react'
import '../App.css'

function Home(){

    const [rankmusic,setrankmusic]=useState([])
    const [rankartist,setrankartist]=useState([])
    let [rankListpage,setrankListpage]=useState(5)
    const [albumArtist,setalbumArtist]=useState([])
    const [albumImage,setalbumImage]=useState([])
    const [album,setalbum]=useState([])

    //인기 차트 API 받아오기
    const getrankdata = async () => { 
        await axios
          .get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=0c10bb04e9187b1f8d8aa108bbe5a034&format=json')
          .then((결과)=>{
            console.log(결과.data)
            console.log(결과.data.tracks.track.name)
            console.log(결과.data.tracks.track[1].artist.name)

            let rankObject = 결과.data.tracks.track

            let track_array=[];
            let artist_array=[];
            rankObject.map((a,i)=>{
                    
                track_array.push(rankObject[i].name)
                artist_array.push(rankObject[i].artist.name)
                    //console.log(array)
                })
            
            setrankmusic([...rankmusic,...track_array])
            setrankartist([...rankartist,...artist_array])

            
            
          })
      };

    //top albums API 받아오기
    const topAlbum = async () => {
        await axios
            .get('https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=disco&api_key=0c10bb04e9187b1f8d8aa108bbe5a034&format=json')
            .then((결과)=>{
                console.log(결과.data)
                let albumObject = 결과.data.albums.album

                let album_name=[];
                let album_artist=[];
                let album_image=[];

                albumObject.map((a,i)=>{
                    
                    album_name.push(albumObject[i].name)
                    album_artist.push(albumObject[i].artist.name)
                    album_image.push(albumObject[i].image[2]['#text'])
                        //console.log(array)
                    })

                setalbum([...album,...album_name])
                setalbumArtist([...albumArtist,...album_artist])
                setalbumImage([...albumImage,...album_image])
                console.log(albumArtist)
                console.log(album)
                console.log(albumObject[1].image[2]['#text'])
            })
    }

      
    useEffect(() => {
        getrankdata();
        topAlbum();
      }, []);


    function RankCard(props){

        return(
            <table className='chartContent'>
                <tr>
                <td><p>{props.i+1}. {props.ranklist}</p></td>
                <td><p>- {props.rankartist}</p></td> 
                </tr>
            </table>
        )
       
    }

    function AlbumCard(props){

        return(

            <div className='item'>
                <img src={props.albumImage}/>
                <p className='name'>{props.i+1}. {props.album}</p>
                <p className='artist'>- {props.albumArtist}</p>
            </div>  
        )
       
    }

    function moveNext(){
        
        if(rankmusic.length <= rankListpage){
            setrankListpage(5)
        }

        else{
            setrankListpage(rankListpage+6)
        }
        console.log(rankListpage)
    }

    function movePrev(){

        if(5 == rankListpage){
            setrankListpage(rankmusic.length)
        }

        else{
            setrankListpage(rankListpage-6)
        }
        console.log(rankListpage)
    }

    function Rankbutton(){
        const rankbutton =[]
        for(let i=1; i<=10; i++){
            rankbutton.push(<button  value={i} onClick={e => Click_rank(i,e)}>{i}</button>)
        }
        return rankbutton;
    }

    function Click_rank(number,e){
        console.log(number)
        setrankListpage(number*5)
    }

    return(
        <div className='contents'>
            <div className="chart">

                <div className='buttonContainer'>
                    <button className='prev' onClick={movePrev}>prev</button>
                    <button className='next' onClick={moveNext}>next</button>
                </div>

                <div className='rank_topic'>
                    <p>top track 50</p>

                    <ol className='ranklist'>
                    
                    {
            
                        rankmusic.map((a, i)=>{
                            if((i<=rankListpage)&&(i>=rankListpage-5)){
                                return <RankCard ranklist={rankmusic[i]} rankartist={rankartist[i]} i={i} key={i} />
                            }    
                        })
                    }

                </ol>
                </div>
                <div ><Rankbutton /></div>
                

            </div>

            
            
            <p className='listMenu'>Top Albums</p>
            <section class="albumSection">
            <div className='album'>
            
                {
                    
                    album.map((a, i)=>{
                        if(i<20){
                        return <AlbumCard  album={album[i]} albumArtist={albumArtist[i]} albumImage={albumImage[i]} i={i} key={i} />
                        }
                    })
                }
            </div>
            </section>

            
        </div>
    )
}

export default Home;