const config = require("./config")

const express = require('express')
const parser = require('ua-parser-js');
const Fson = require('fson-db');

const db = Fson("./db");
const app = express()

db.browser = []
db.engine = []
db.os = []

app.get('/stats', (req, res) => {
    res.send(`<!doctypehtml><html lang="en"><meta charset="utf-8"><meta content="width=device-width,initial-scale=1"name="viewport"><link href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css"rel="stylesheet"><title>Catly</title><center><main class="container"><h1>Stats</h1><div class="grid"><div><canvas id="browsers"style="width:100%;max-width:600px"></canvas></div><div><canvas id="engines"style="width:100%;max-width:600px"></canvas></div><div><canvas id="os"style="width:100%;max-width:600px"></canvas></div></div></main></center><script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script><script>fetch("/stats/get").then(s=>s.json()).then(data=>{chartMaker("browsers",data.browsers);chartMaker("engines",data.engines);chartMaker("os",data.os)});function chartMaker(name,data){const names=[];const hits=[];const colors=[];data.forEach(d=>{names.push(d.name);hits.push(d.hits);colors.push(color())});new Chart(name,{type:"pie",data:{labels:names,datasets:[{backgroundColor:colors,data:hits}]},options:{title:{display:true,text:name}}})}function color(){return \`#\${Math.floor(Math.random()*16777215).toString(16)}\`}</script>`)
})

app.get('/stats/get', (req, res) => {
    res.send({
        browsers: db.browser,
        engines: db.engine,
        os: db.os
    })
})

app.get('*', (req, res) => {
    if (!req.get('origin')?.includes(config.whitelist)) return res.sendFile(__dirname + "/pixel.webp");

    res.sendFile(__dirname + "/pixel.webp")

    const ua = parser(req.headers['user-agent'])

    console.log(ua)

    try { if (ua.browser.name == "undefined") return;
        if (!db.browser.some(e => e.name === ua.browser.name)) {
            db.browser.push({
                name: ua.browser.name,
                hits: 1
            })
        } else {
            db.browser.some(e => {
                if (e.name !== ua.browser.name) return;
                e.hits++
            })
        }
    } catch { }

    try { if (ua.os.name == "undefined") return;
        if (!db.engine.some(e => e.name === ua.engine.name)) {
            db.engine.push({
                name: ua.engine.name,
                hits: 1
            })
        } else {
            db.engine.some(e => {
                if (e.name !== ua.engine.name) return;
                e.hits++
            })
        }
    } catch { }

    try { if (ua.os.name == "undefined") return;
        if (!db.os.some(e => e.name === ua.os.name)) {
            db.os.push({
                name: ua.os.name,
                hits: 1
            })
        } else {
            db.os.some(e => {
                if (e.name !== ua.os.name) return;
                e.hits++
            })
        }
    } catch { }
})

app.listen(config.port, () => {
    console.log(`running at :${config.port}`)
})