import React, {Component} from 'react';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Window } from '@progress/kendo-react-dialogs';
import '@progress/kendo-theme-default/dist/all.css';
import categories from './categories';
import products from './products';

class App extends Component {

  state = {
    dropdownlistCategory: null
  }

  handleDropDownChange = (e) => {
    this.setState({
      dropdownlistCategory: e.target.value.CategoryID
    });
  }

  render() {


    return(
      <div className='App'>
        <h1>Kendo React </h1>
        <p>
          <DropDownList
            data={categories}
            dataItemKey='CategoryID'
            textField='CategoryName'
            defaultItem={{CategoryID:null, CategoryName: 'Product categories'}}
            onChange={this.handleDropDownChange}
         />
         &nbsp; Select category ID: <strong> {this.state.drowdownlistCategory}</strong>
         </p>
      </div>
    );
  }
}

export default App;