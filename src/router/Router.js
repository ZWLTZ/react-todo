import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home001</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About002</h2>
  </div>
)

const HomeRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                {/* <li><Link to="/topics">Topics</Link></li> */}
            </ul>

            <hr/>

            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            {/* <Route path="/topics" component={Topics}/> */}
        </div>
    </Router>
  )
  export default HomeRouter