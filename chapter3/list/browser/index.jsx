const ReactDOM = require('react-dom');
const React = require('React');
const Container = require('../component/container.jsx');

class App extends React.Component {
  constructor() {
    super()
    this.state ={
      columns: reactInitData,
      filtType: reactInitFiltType,
      sortType: reactInitSortType 
    }
  }

  handleFilt(filtType) {
    fetch(`./list/data?sort=${this.state.sortType}&filt=${filtType}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          columns: res, 
          filtType: filtType
        })
      })
  }

  handleSort(sortType) {
    fetch(`./list/data?sort=${sortType}&filt=${this.state.filtType}`)
      .then(res =>res.json())
      .then(res => {
        this.setState({
          columns: res,
          sortType: sortType
        })
      })
  }

  render() {
    return (
      <Container 
        columns={this.state.columns}
        filt={this.handleFilt.bind(this)}
        sort={this.handleSort.bind(this)}
      />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('reactapp')
)
