import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Route,
  // Link,
  // useParams
} from "react-router-dom";


import DetailPage from './components/DetailPage';
import Homepage from './components/Homepage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: true
    }
    this.switcher = this.switcher.bind(this);
  }
  switcher() {
    this.setState(state => ({ theme: !state.theme }))
  }
  render() {
    return (
      <Router>
        <div className={this.state.theme ? "light page" : "dark page"}>
          <Switch>
            <Route exact path="/" >
              <Homepage themeSwitcher={this.switcher} theme={this.state.theme} />
            </Route>
            <Route path="/:id" component={DetailPage} />
            {/* <DetailPage />
            </Route> */}
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;

