const getLyric = (artist, title, id, randomId) =>{
    fetch('https://api.lyrics.ovh/v1/'+artist+'/'+title+'')
    .then(e => e.json())
    .then(d => setLyric(d));
    
    const setLyric = data => {
        if(data.lyrics != undefined){
            const lyric = data.lyrics;
            console.log(lyric);
            document.getElementById(randomId).innerText = 'Song Lyrics:';
            document.getElementById(id).innerText = lyric;
        }else{
            document.getElementById(randomId).innerText = 'Lyrics not found';
        }
    }
}

const gitLyricsList = (artist, title) =>{
    fetch('https://api.lyrics.ovh/v1/'+artist+'/'+title+'')
    .then(e => e.json())
    .then(d => displayLyric(d));
    
    const displayLyric = lyric => {

        document.getElementById('songNameDisplay').innerText = title;
        document.getElementById('displayLyric').innerText = lyric.lyrics;
    }
}

document.getElementById('searchBtn').addEventListener('click', function(){
    const searchInput = document.getElementById('searchInput').value;
    fetch('https://api.lyrics.ovh/suggest/'+searchInput+'')
    .then(e => e.json())
    .then(d => setData(d));

    const songList = document.getElementById('songList');
    const singleResult = document.getElementById('singleResult');
    songList.innerHTML='';
    singleResult.innerHTML='';
    const setData = data => {
        // const songName = data.map(d => d.title);
        // console.log(data.data[0].title);
        for(let i = 0; i < 11; i++){
            const id = data.data[i].id;
            const title = data.data[i].title;
            const artist = data.data[i].artist.name;
            const picture = data.data[i].artist.picture;
            const randomId = Math.random()*10000;

            console.log(title, artist);

            songList.innerHTML += `<p class="author lead" style="font-weight:500"><strong>${title}</strong> Album by <span style="font-weight:700">${artist}</span> <button class="btn btn-success" onclick="gitLyricsList('${artist}', '${title}')">Get Lyrics</button></p>`

            singleResult.innerHTML += 
            `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9 d-flex">
                <img class="h-100 mr-5" src="${picture}" alt="">
                <div class="details">
                    <h3 class="lyrics-name">${title}</h3>
                    <p class="author lead">Album by <span>${artist}</span></p>
                </div>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="getLyric('${artist}', '${title}', '${id}' , '${randomId}')">Get Lyrics</button>
            </div>
            </div>
            <h3 id="${randomId}" class="text-center"></h3>
            <div id="${id}" class="text-center"></div>
            `
        }
    }
})