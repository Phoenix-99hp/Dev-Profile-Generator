const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");
var options = { format: 'Letter' };

const colors = {
    Green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    Blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    Pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    Red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
};

function generateHTML(info, colorSelection, stars) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Profile</title>
        <style>
            @page {
                margin: 0;
            }
    
            *,
            *::after,
            *::before {
                box-sizing: border-box;
            }
    
            html,
            body {
                padding: 0;
                margin: 0;
            }
    
            html,
            body,
            .wrapper {
                min-height: 100%;
    
                background-color: ${colors[colorSelection].wrapperBackground}
    
            }
    
            /* .wrapper {
                background-color: ${colors[colorSelection].wrapperBackground}
    
                ;
                padding-top: 0px;
                padding-bottom: 0px;
                margin-top: 0px;
            } */
    
            body {
                /*background-color: white;*/
                -webkit-print-color-adjust: exact !important;
                font-family: 'Cabin', sans-serif;
            }
    
            main {
                background-color: #E9EDEE;
                height: 50%;
               /* height: auto;*/
                padding-top: 30px;
            }
    
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                font-family: 'BioRhyme', serif;
                margin: 0;
            }
    
            h1 {
                font-size: 2em;
            }
    
            h2 {
                font-size: 1.5em;
            }
    
            h3 {
                font-size: 1em;
            }
    
            h4 {
                font-size: 0.5em;
            }
    
            h5 {
                font-size: 0.3em;
            }
    
            h6 {
                font-size: 0.2em;
            }
    
            .photo-header {
                position: relative;
                padding-top: 0px;
                margin: 0 auto;
                margin-bottom: -60px;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
    
                background-color: ${colors[colorSelection].headerBackground}
    
                ;
    
                color: ${colors[colorSelection].headerColor}
    
                ;
    
                padding: 10px;
                width: 95%;
                border-radius: 6px;
            }
    
            .photo-header img {
                /* width: 250px;
                height: 250px; */
    
                text-align: center;
    
                width: 200px;
                height: 200px;
                border-radius: 50%;
                object-fit: cover;
    
                margin-top: 0px;
    
                border: 6px solid ${colors[colorSelection].photoBorderColor}
    
                ;
    
                box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
            }
    
            .photo-header h1,
            .photo-header h2 {
                width: 100%;
                text-align: center;
            }
    
            .photo-header h1 {
                margin-top: 10px;
            }

            .photo-header {
                margin-top: 20px;
            }
    
            .links-nav {
                width: 100%;
                text-align: center;
                padding: 20px 0;
                font-size: 1.1em;
            }
    
            .nav-link {
                display: inline-block;
                margin: 5px 10px;
            }
    
            .workExp-date {
                font-style: italic;
                font-size: .7em;
                text-align: right;
                margin-top: 10px;
            }
    
            .container {
                height: 50%;
                padding: 25px;
                padding-left: 0px;
                padding-right: 0px;
                padding-bottom: 25px;
            }
    
            .row {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-evenly;
                margin-top: 20px;
                margin-bottom: 20px;
                text-align: center;
            }
    
            .card {
                padding-top: 0px;
                border-radius: 6px;
    
                background-color: ${colors[colorSelection].headerBackground}
    
                ;
    
                color: ${colors[colorSelection].headerColor}
    
                ;
                /* margin: 20px; */
            }
    
            .col {
                /* flex: 1; */
                display: inline-block;
                text-align: center;
            }
    
            .stat {
                padding: 15px;
                width: 25%;
                margin-left: 10px;
                margin-right: 10px;
            }
    
            .bio {
                padding-top: 30px;
            }
    
            .top {
                padding-top: 0px;
                top: 0px;
            }
    
            footer {
                height: 30%;
            }
    
           /* .img {
                display: block;
                top: 0;
                margin: 0 auto;
            }
            */
    
            /* .secondRow {
                margin-bottom: 0px;
            }
            */
    
            /* .header {
                height: 30%;
                position: absolute;
            } */
    
            a,
            a:hover {
                text-decoration: none;
                color: inherit;
                font-weight: bold;
            }
    
            @media print {
                body {
                    zoom: .75;
                }
            }
        </style>
    
    <body>
        <div class="card photo-header top">
        <div class="row">
            <img src="${info.data.avatar_url}" class="img">
        </div>
            <h1>Hi!</h1>
            <h2 id="username">My name is: ${info.data.name}</h2>
            <nav class="links-nav">
            <a href="${info.data.html_url}" class="nav-link"><i class="fab fa-github-alt"></i> GitHub</a>
            <a href="${info.data.blog}" class="nav-link"><i class="fas fa-rss"></i> Blog</a>
            <a href="https://www.google.com/maps/search/?api=1&query=${info.data.location}" class="nav-link"><i
                    class="fas fa-location-arrow"></i> ${info.data.location}</a>
            </nav>
        </div>
        <main class="container">
            <div class="row">
                <h2 class="col bio">${info.data.bio}</h2>

            </div>
            <div class="row">
                <div class="card col stat">
                    <h3>Public Repositories</h3>
                    <p id="repos">${info.data.public_repos}</p>
                </div>
                <div class="card col stat">
                    <h3>Followers</h3>
                    <p id="followers">${info.data.followers}</p>
                </div>
            </div>
            <div class="row secondRow">
                <div class="card col stat">
                    <h3>GitHub Stars</h3>
                    <p id="stars">${stars.data.length}</p>
                </div>
                <div class="card col stat">
                    <h3>Following</h3>
                    <p id=" following">${info.data.following}</p>
                </div>
            </div>
        </main>
        <footer></footer>
        <!-- </div> -->
    </body>
    
    </html> `
}

inquirer
    .prompt([
        {
            type: "input",
            message: "Enter your GitHub username:",
            name: "username"
        },
        {
            type: "list",
            message: "Choose a background color:",
            name: "color",
            choices: [
                "Green",
                "Blue",
                "Pink",
                "Red"
            ]
        },
    ]).then(function ({ username, color }) {
        const queryUrl = `https://api.github.com/users/${username}`
        const starUrl = `https://api.github.com/users/${username}/starred`
        axios.get(queryUrl).then(function (res) {
            axios.get(starUrl).then(function (starRes) {
                pdf.create(generateHTML(res, color, starRes), options).toFile("profile.pdf", function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Successfully generated pdf to profile.pdf");
                    }
                })
            })
        })
    });