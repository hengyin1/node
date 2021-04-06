import React from 'react';
import ReactDOM from 'react-dom';
// const React = require('react');
import './index.less';
import blog from './images/blog.png';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Text: null
    }
  }

  loadComponent() {
    import('./text.jsx').then(res => {
      this.setState({
        Text: res.default
      })
    })
  }
   
  render() {
    const { Text } = this.state;
    return <div onClick={this.loadComponent.bind(this)}>
      hello, world
      <img src={blog}></img>
      {
        Text ? <Text /> : null 
      }
    </div>
  }
}

// module.exports = <Search />;
// export default Search;
ReactDOM.render(<Search />, document.getElementById('root'));