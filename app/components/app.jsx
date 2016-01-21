import React from 'react';
import Navbar from './navbar';
import BreweryForm from './breweryForm';
import BreweryList from './breweryList';
import BreweryDetail from './breweryDetail';
import BreweryStore from './../stores/breweryStore';
import BeerStore from './../stores/beerStore';
import GenForm from './genForm';
import ApiUtil from './../utils/apiUtil';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      beers: {},
      breweries: {},
      selectedBrewery: {},
      editMode: false };
    this.onInitialLoad = this.onInitialLoad.bind(this);
    this.updateSelectedBrewery = this.updateSelectedBrewery.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.getBeersFromStore = this.getBeersFromStore.bind(this);
    this.updateBeerList = this.updateBeerList.bind(this);
  }

  componentDidMount(){
    ApiUtil.getBreweries();
    BeerStore.addChangeListener(this.getBeersFromStore);
    BeerStore.addUpdateListener(this.updateBeerList);
    BreweryStore.addChangeListener(this.onInitialLoad);
    BreweryStore.addSelectedBreweryListener(this.updateSelectedBrewery);
  }

  updateSelectedBrewery(selection) {
    console.log('updating selected brewery');
    var brewery = BreweryStore.getSelectedBrewery();
    this.setState({ selectedBrewery: selection || brewery });
  }

  updateDetailInfo() {
    console.log('updating brewery info');
    this.setState({ selectedBrewery: Brewery.getSelectedBrewery() });
  }

  onInitialLoad() {
    console.log('getting breweries from store');
    var breweries = BreweryStore.getBreweries();
    this.setState({ breweries: breweries });
  }

  getBeersFromStore() {
    console.log('getting beers from store!');
    var beers = BeerStore.getBeers();
    this.setState({ beers: beers });
  }

  updateBeerList() {
    console.log('updating beer list');
    var beers = BeerStore.getBeers();
    this.setState({ beers: beers });
  }

  toggleEditMode(event) {
    event.preventDefault();
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
    var breweryDetail = (Object.keys(this.state.selectedBrewery).length === 0 ? <div></div> :
    <BreweryDetail
      editMode={ this.state.editMode }
      beers = { this.state.beers }
      brewery={ this.state.selectedBrewery }/>
  );
    var editText = (this.state.editMode ? "close" : "edit mode");

    var breweryForm = (<BreweryForm
        editMode={ this.state.editMode }
        brewery={ this.state.selectedBrewery }/>);

    return (
      <div>
        <Navbar />
        <button onClick={ this.toggleEditMode }>{ editText }</button>
        <div className="brewery-container">
          { breweryForm }
          <BreweryList
            breweries={ this.state.breweries }
            editMode={ this.state.editMode }
            fillBreweryForm={ this.updateSelectedBrewery }/>
          { breweryDetail }
        </div>
      </div>
    );
  }
}
export default App;
