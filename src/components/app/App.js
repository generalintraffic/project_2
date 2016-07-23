import React from "react";
import $ from "jquery";

import Origin from "./origin";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: map
    }
  }

render() {
   return (
    <div className="App">
      <h1> HOLA GENTE DE HACK! </h1>
        {this.state.data}
     		<Origin data={this.state.data}/>
    </div>
   );
 }
}



// export default App;