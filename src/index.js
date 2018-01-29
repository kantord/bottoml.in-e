import { json_parser, yaml_parser } from 'just-dashboard'
import * as d3 from 'd3'

const render_dashboard = (data) =>
    json_parser(data)(d3.selection())

const render_dashboard_yaml = (data) => {
  render_dashboard(yaml_parser(data))
}

const get_gist_id = () =>
    window.location.pathname.match(/\/e\/[^\/]+\/(.+)/)[1]


const load_gist = (id) =>
    d3.json(`https://api.github.com/gists/${id}`, (data) => {
      if (data.files['dashboard.json'] !== undefined) {
       const url = data.files["dashboard.json"].raw_url
        d3.json(url, render_dashboard)
      } else {
        if (data.files['dashboard.yml'] !== undefined) {
       const url = data.files["dashboard.yml"].raw_url
        d3.text(url, render_dashboard_yaml)
      }
      }
    })


document.addEventListener("DOMContentLoaded", function(event) { 
    load_gist(get_gist_id())
});
