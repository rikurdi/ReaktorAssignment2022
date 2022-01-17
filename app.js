const gamehistory_API = 'https://bad-api-assignment.reaktor.com/rps/history';
//Had to use proxy server because of cors-error.
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

const socket = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");

socket.onopen = function(e) {
    alert("Connection to websocketAPI established");
    socket.send("Ping");
}
socket.onerror = function(e) {
    alert("Connection error " + e);
};

socket.onmessage = function(e) {
    let liveData = [];
    const matchDiv = document.createElement("div");
    liveData.push(e.data);
    console.log("livedata " + liveData);
    document.querySelector('.live-games').innerHTML = `
    ${liveData}
    `;
}

let playerStats = {
    players: [
        {
            name: "Testi Käyttäjä",
            total_matches: 65,
            total_wins: 2,
            winPercentage: null
        },
        {
            name: "Testi Käyttäjä2",
            total_matches: 23,
            total_wins: 4,
            winPercentage: null
        }
    ]
}

function getData() {
    fetch(proxyURL+gamehistory_API)

        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            let gameData = data.data;
            var temp = "";
            var sTemp = "";
            gameData.forEach((u)=> {
                //verrataan pelattuja käsiä ja katsotaan kumpi voittaa,
                //lisätään voittaja omaan uuteen elementtiin.
                if(u.playerA.played == u.playerB.played) {
                    u.result = "Tie"
                } 
                else if(u.playerA.played == "ROCK")
                {
                    if(u.playerB.played == "PAPER") {
                        u.result = u.playerB.name + " Wins";
                        for(let i = 0; i < playerStats.length; i++) {
                            if(playerStats[i].name === u.playerB.name){
                                console.log("Nimi löytyi tietokannasta")
                                playerStats[i].total_wins +=1;
                            }
                            else {
                                console.log("nimeä ei löytynyt, lisätään pelaaja")
                                //playerStats.push(u.playerB);
                            }
                            return playerStats;
                        }
                    }
                    else {
                        u.result = u.playerA.name + " Wins";
                        for(let i = 0; i < playerStats.length; i++) {
                            if(playerStats[i].name === u.playerA.name){
                                playerStats[i].total_wins +=1;
                            }
                            else {
                                //playerStats.push(u.playerA);
                            }
                        }
                    }
                }
                else if(u.playerA.played == "SCISSORS"){
                    if(u.playerB.played == "ROCK") {
                        u.result = u.playerB.name + " Wins";
                        for(let i = 0; i < playerStats.length; i++) {
                            if(playerStats[i].name === u.playerB.name){
                                playerStats[i].total_wins +=1;
                            }
                            else {
                                //playerStats.push(u.playerB);
                            }
                        }
                    }
                    else {
                        u.result = u.playerA.name + " Wins";
                        for(let i = 0; i < playerStats.length; i++) {
                            if(playerStats[i].name === u.playerA.name){
                                layerStats[i].total_wins +=1;
                            }
                            else {
                                //playerStats.push(u.playerA);
                            }
                        }
                    }
                }
                else if(u.playerA.played == "PAPER"){
                    if(u.playerB.played == "SCISSORS"){
                        u.result = u.playerB.name + " Wins";
                        for(let i = 0; i < playerStats.length; i++) {
                            if(playerStats[i].name === u.playerB.name){
                                playerStats[i].total_wins +=1;
                            }
                            else {
                                //playerStats.push(u.playerB);
                            }
                        }
                    }
                    else {
                        u.result = u.playerA.name + " Wins";
                        for(let i = 0; i < playerStats.length; i++) {
                            if(playerStats[i].name === u.playerA.name){
                                playerStats[i].total_wins +=1;
                            }
                            else {
                                //playerStats.push(u.playerA);
                            }
                        }
                    }
                }
                //history
                temp+="<div class='match'>";
                temp+="<tr>";
                temp+="<td>"+u.type+"</td>";
                temp+="<td>"+u.gameId+"</td>";
                temp+="<td>"+u.playerA.name+" pelasi: " +u.playerA.played+"</td>";
                temp+="<td>"+u.playerB.name+" pelasi: " +u.playerB.played+"</td></tr>";
                temp+="</div>";
                //stats
                sTemp+="<tr>";
                sTemp+="<td>"+u.type+"</td>";
                sTemp+="<td>"+u.gameId+"</td>";
                sTemp+="<td>"+u.playerA.name+"</td>";
                sTemp+="<td>"+u.playerB.name+"</td></tr>";
            })
            document.getElementById("table-data").innerHTML = temp;
        });
}
getData();
console.log("This is player stats array: " + JSON.stringify(playerStats, null, "  "));

//simple function to hide divs on
function showHistory() {
    let hElement = document.getElementById("history");

    if(hElement.style.display === 'none') {
        hElement.style.display = 'block';
    }

    else{
        hElement.style.display = 'none';
    }
}

function showStats() {
    let sElement = document.getElementById("stats");

    if(sElement.style.display === 'none') {
        sElement.style.display = 'block';
    }

    else{
        sElement.style.display = 'none';
    }
}