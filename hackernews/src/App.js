import React, { Component } from 'react';
import axios from 'axios';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '10';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

//url='https://hn.algolia.com/api/v1/search?query=redux&page=0&hitsPerPage=10;'


// import sortBy from lodash, create a list of sorting methods, and map them 
const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

// deal with the data fetched after user pressing "more"
const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;

  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];

  const updatedHits = [
    ...oldHits,
    ...hits
  ];

  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  };
};



class App extends Component {
  //used to stopping fetching process if the component is unmounted
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  

  //get the user input and save it to state
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  
  // go to fetch the data as user click search button
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    // check if the term is used and the corrosponding data is in cache
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    //stop the submitting and refreshing behavior
    event.preventDefault();
  }

  // if the searchTerm is used before and so in cahce now
  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }
  

  //cache the fetched data, the following added data is concated to the array
  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }
  

  //fetch the stories for the first timw
  fetchSearchTopStories(searchTerm, page = 0) {
    //used to determine whether to display loading sign
    this.setState({ isLoading: true });
    //fetch the data from api
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      //if succeed, update the result object
      .then(result => this._isMounted &&this.setSearchTopStories(result.data))
      //if fail, update error in state
      .catch(error => this._isMounted && this.setState({ error }));
  }


  // to delete an entry of story
  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    
    //filter out the one that is clicked
    const updatedHits = hits.filter(item => item.objectID !== id);
    
    //update the story list of the current searchKey with the filtered array
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }  
  
  
  componentDidMount() {
    this._isMounted = true;
    //set the default searching result, in this example, is the reult for 'redux' as searchTerm
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm }); 
    this.fetchSearchTopStories(searchTerm);
  }
  
  //set the _isMounted and prevent the setState in then snd catch 
  componentWillUnmount() {
    this._isMounted = false;
  }
  

  render() {
    const {searchTerm,results,searchKey,error,isLoading} = this.state;
    //set default value to avoid displaying 'undefined' error
    const page = (results &&results[searchKey] &&results[searchKey].page) || 0;

    const list = (results &&results[searchKey] &&results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
         
         {/* conditional rendering */}
        { error
          ? <div className="interactions"><p>Something went wrong.</p></div>
          : <Table list={list} onDismiss={this.onDismiss} />
        }

        <div className="interactions">
          <ButtonWithLoading
            className={'width'}
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.onSort = this.onSort.bind(this);
  }
  
  //toggle the reverse sorting.
  // The list should get reverse sorted once you click a Sort component twice.
  //It is reverse if the sortKey in the state is the same as the incoming sortKey 
  //and the reverse state is not already set to true
  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const {list,onDismiss} = this.props;
    const {sortKey,isSortReverse,} = this.state;
    
    //call the loadash sort method
    const sortedList = SORTS[sortKey](list);
    //if wanting reversed sorting
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <div className="table">
       <p>*Click the header to sort</p>
        {/* table header */}
        <div className="table-header">
          <span style={{ width: '40%' }}>
            <Sort sortKey={'TITLE'} onSort={this.onSort} activeSortKey={sortKey}> Title {'\u22BD'}</Sort>
            {/* You can pass the sortKey from the internal component state as active sort key to your Sort component. */}
          </span>
          <span style={{ width: '20%' }}>
            <Sort sortKey={'AUTHOR'} onSort={this.onSort} activeSortKey={sortKey} > Author {'\u22BD'}</Sort>
          </span>
          <span style={{ width: '15%' }}>
            <Sort sortKey={'COMMENTS'} onSort={this.onSort} activeSortKey={sortKey} > Comments {'\u22BD'}</Sort>
          </span>
          <span style={{ width: '15%' }}>
            <Sort sortKey={'POINTS'} onSort={this.onSort} activeSortKey={sortKey} > Points {'\u22BD'}</Sort>
          </span>
          <span style={{ width: '10%' }}> Archive </span>
        </div>

        {/* table body */}
        {reverseSortedList.map(item =>
          <div key={item.objectID} className="table-row">
            <span style={{ width: '40%' }}> <a href={item.url}>{item.title}</a> </span>
            <span style={{ width: '20%' }}> {item.author} </span>
            <span style={{ width: '15%' }}> {item.num_comments} </span>
            <span style={{ width: '15%' }}> {item.points} </span>
            <span style={{ width: '10%' }}>
              <Button onClick={() => onDismiss(item.objectID)} className="button-inline" > Dismiss </Button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

// presentational components

const Sort = ({ sortKey, activeSortKey, onSort, children}) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey } // button-active is a boolean attribute
  );

  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass} >
      {children}
    </Button>
  );
}



const Search = ({value,onChange,onSubmit,children}) =>
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    <button type="submit"> {children} </button>
  </form>


const Button = ({onClick,className = '',children,}) =>
  <button onClick={onClick} className={className} type="button"> {children} </button>



const Loading = () =><div>Loading ...</div>


// higher order component
const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component { ...rest } />

const ButtonWithLoading = withLoading(Button);

// the same as :
// const ButtonWithLoading = ({ isLoading, ...rest }) => isLoading ? <Loading /> : <Button { ...rest } />
// <ButtonWithLoading 
//     isLoading={isLoading} 
//     onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}> More
// </ButtonWithLoading> 


export { Button, Search,Table};

export default App;