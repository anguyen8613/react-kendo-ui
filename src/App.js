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
    dropdownlistCategory: null,
    gridDataState: {
      sort: [
        {field: 'ProductName', dir:'asc'}
      ],
      page: {skip:0, take:10}
    }
  }

   handleDropDownChange = (e) => {
    let newDataState = { ...this.state.gridDataState }
    if (e.target.value.CategoryID !== null) {
      newDataState.filter = {
        logic: 'and',
        filters: [{ field: 'CategoryID', operator: 'eq', value: e.target.value.CategoryID }]
      }
      newDataState.skip = 0
    } else {
      newDataState.filter = []
      newDataState.skip = 0
    }
    this.setState({
      dropdownlistCategory: e.target.value.CategoryID,
      gridDataState: newDataState
    });
  }

  handleGridDataStateChange = (e) => {
    this.setState({
     gridDataState: e.data
    })
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
         &nbsp; Select category ID: <strong> {this.state.dropdownlistCategory}</strong>
         </p>

         <Grid
          data={process(products, this.state.gridDataState)}
          pageable={true}
          sortable={true}
          {...this.state.gridDataState}
          onDataStateChange={this.handleGridDataStateChange}
          >
          <GridColumn field="ProductName" />
          <GridColumn field="UnitPrice" />
          <GridColumn field="UnitsInStock" />
          <GridColumn field="Discontinued" />
        </Grid>
      </div>
    );
  }
}

export default App;