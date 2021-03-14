import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }
   
  render() {
    return <div>hello, world</div>
  }
}

// export default Search;
ReactDOM.render(<Search />, document.getElementById('root'))