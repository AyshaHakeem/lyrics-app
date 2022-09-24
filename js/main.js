let track, trackID, commonID, trackArtist, trackName, lyrics

let resultLyrics = document.querySelector('.lyrics-body')

document.querySelector('.get-lyrics').addEventListener('click',searchSong)

async function searchSong() {

    // get user input
    let title = document.querySelector('#song').value
    let artist = document.querySelector('#artist').value

    // fetch request to find track_id and commontrack_id of the song
    let url = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${title}&q_artist=${artist}&apikey=5bb2cf1f5367960ebeba277d5dc4c958`
    
    await fetch(url)
    .then( response => response.json() )
    .then( data => {
        track = data.message.body.track_list[0].track
    } )
    .catch(err => {
        console.log(`Error ${err}`)
        resultLyrics.innerText = 'Sorry, we couldn\'t find any results.\nPlease try another search.'
    })

    // if song and lyrics are available: 
    if( track && track.has_lyrics){

        trackArtist = track.artist_name    
        trackName = track.track_name
        trackID = track.track_id
        commonID = track.commontrack_id

        // get request for the song lyrics using track_Id and commontrack_Id returned by the previous fetch request
        let lyricsURL = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackID}&commontrack_id=${commonID}&apikey=5bb2cf1f5367960ebeba277d5dc4c958`

        axios
        .get(lyricsURL)
        .then(response => {
            // display result
            lyrics = response.data.message.body.lyrics.lyrics_body
            document.querySelector('.result-artist').innerText = trackArtist
            document.querySelector('span').innerText = 'By'
            document.querySelector('.result-title').innerText = trackName
            resultLyrics.innerText = lyrics

            // hide search area 
            document.querySelector('.search').style.display = 'none';

            // show get new lyrics button
            document.querySelector('.get-new').style.display = 'block';
        })
        } else {
            // if lyrics are not found
            resultLyrics.innerText = 'Sorry, we couldn\'t find any results.\nPlease try another search.'
        }
}

// show search area and erase exisiting results upon clicking get-new-lyrics
document.querySelector('.get-new').addEventListener('click',()=>{
    document.querySelector('.search').style.display = 'block';
    document.querySelector('.get-new').style.display = 'none';

    let main = document.querySelector('main').childNodes
    for(let i=0; i<main.length; i++){
        main[i].innerText = ''
    }    

    // empty input fields
    document.querySelectorAll('input').forEach(x=>x.value='')

})
