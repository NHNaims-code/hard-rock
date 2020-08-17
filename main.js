const getLyric = (artist, title, id, randomId) =>{
    fetch('https://api.lyrics.ovh/v1/'+artist+'/'+title+'')
    .then(e => e.json())
    .then(d => setLyric(d));
    
    const setLyric = data => {
        if(data.lyrics != undefined){
            const lyric = data.lyrics;
            const randomId2 = Math.random()*10000;
            console.log(lyric);
            document.getElementById(randomId).innerText = 'Song Lyrics:';

            document.getElementById(id).innerHTML = "";
            document.getElementById(id).innerHTML = `<div id="${randomId2}" class="text-center alert alert-success my-3 py-3"></div>`;
            document.getElementById(randomId2).innerText = lyric;
        }else{
            document.getElementById(randomId).innerHTML = `<div class="alert alert-danger">Lyrics not found</div>`;
        }
    }
}

const gitLyricsList = (artist, title) =>{
        fetch('https://api.lyrics.ovh/v1/'+artist+'/'+title+'')
        .then(e => e.json())
        .then(d => displayLyric(d));
            const displayLyric = data => {
                const lyric = data.lyrics;
                if(lyric){     
                    document.getElementById('songName').innerText = title;
                    document.getElementById('space').innerText = ' - ';
                    document.getElementById('artistName').innerText = artist;
                    document.getElementById('displayLyric').innerText = lyric;
                }else{
                    document.getElementById('songName').innerText = title;
                    document.getElementById('space').innerText = ' - ';
                    document.getElementById('artistName').innerText = artist;
                    document.getElementById('displayLyric').innerText = 'Lyric not found';
                }
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
                    <p class="author lead">Album by <span style="font-weight: 700">${artist}</span></p>
                </div>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <div class="d-flex flex-column">
                <button class="btn btn-success" onclick="getLyric('${artist}', '${title}', '${id}' , '${randomId}')">Get Lyrics</button>
                </div>
            </div>
            </div>
            <div id="${randomId}" class="text-center"></div>
            <div id="${id}" class="text-center"></div>
            `
        }
    }
})











