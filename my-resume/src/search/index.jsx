import React from 'react';
import ReactDOM from 'react-dom';
// const React = require('react');
import './index.less';
import blog from './images/blog.png';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }
   
  render() {
    return <div>
      hello, world
      <img src={blog}></img>
    </div>
  }
}

// module.exports = <Search />;
// export default Search;
ReactDOM.render(<Search />, document.getElementById('root'));