import dashboard from 'dashboard'
import * as d3 from 'd3'

const render_dashboard = (data) =>
    dashboard(data)(d3.selection())

const get_gist_id = () =>
    window.location.pathname.match(/\/e\/[^\/]+\/(.+)/)[1]


const load_gist = (id) =>
    d3.json(`https://api.github.com/gists/${id}`, (data) => {
       const url = data.files["dashboard.json"].raw_url
        d3.json(url, render_dashboard)
    })


document.addEventListener("DOMContentLoaded", function(event) { 
    load_gist(get_gist_id())
});
