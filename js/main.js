let track, trackID, commonID, lyrics
let result = document.querySelector('.lyricsBody')

document.querySelector('button').addEventListener('click',searchSong)

async function searchSong() {

    let title = document.querySelector('.title').value
    let artist = document.querySelector('.artist').value

    // fetch request to find track_id and commontrack_id of the song
    let url = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${title}&q_artist=${artist}&apikey=5bb2cf1f5367960ebeba277d5dc4c958`
    
    await fetch(url)
    .then( response => response.json() )
    .then( data => {
        track = data.message.body.track_list[0].track
        trackID = track.track_id
        commonID = track.commontrack_id
        console.log(trackID , commonID)
    } )
    .catch(err => console.log(`Error ${err}`))

    // if lyrics are available: 
    if(track.has_lyrics){

        // get request for the song lyrics using track_Id and commontrack_Id returned by the previous fetch request
        let lyricsURL = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackID}&commontrack_id=${commonID}&apikey=5bb2cf1f5367960ebeba277d5dc4c958`

       await axios
        .get(lyricsURL)
        .then(response => {
            lyrics = response.data.message.body.lyrics.lyrics_body
            console.log('Lyrics printed')
            result.innerText = lyrics
        })
        } else {
            // if lyrics are not found
            result.innerText = 'Lyrics unavailable'
        }
}
