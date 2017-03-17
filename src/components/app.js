import React, {Component} from 'react';
import ListOfGoods from './ListOfGoods';
import Search from '../containers/search';
import CheckBoxes from './checkboxes';
import Cart from '../containers/cart';
import Filters from './filters';

import { connect } from 'react-redux';

import Payment from './payment_template.js';
import Footer from './footer.js';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [{name: "nokia", status: false}, {name: "lg", status: false},
                {name: "samsung", status: false}],
      opt: [{name: "camera", status: false},
                {name: "radio", status: false}, {name: "mp3", status: false},
                {name: "internet", status: false}]
    };
  }

  // Reverses checkbox and sets states if fired.
  //For brand
  handleCheckBoxed = name => {
    const updatedCheck = this.state.checked.map(item => {
      if(item.name === name) {
        item.status = !item.status;
      }
      return item;
    });
     this.setState({checked: updatedCheck});
  }
  // Reverses checkbox and sets states if fired.
  //For features
  handleCheckOption = optName => {
    const updatedCheckOpt = this.state.opt.map(item => {
      if(item.name === optName) {
        item.status = !item.status;
      }
      return item;
    });
     this.setState({opt: updatedCheckOpt});
  }

  // GET ID HERE



  render() {
    const filteredGoods = Filters.filterSearch(this.props.searchText, this.state.checked, this.state.opt);
    const data = this.state.checked;
    const option = this.state.opt;
    return (
      <div>
      <div className="row">
      <div className="cart">
        <div className="top-bar">
          <div className="top-bar-left">
            <div className="menu-name"><p>ONLINE STORE</p></div>
          </div>
        </div>
        <Cart />
        </div>

        <Search />

        <div className="row content_data">
          <div className="medium-2 column border_right">
            <CheckBoxes boxes={this.handleCheckBoxed} data={data} opt={option} option={this.handleCheckOption}/>
          </div>

          <div className="medium-10 column border_left">
            <ListOfGoods goods={filteredGoods} />
          </div>
        </div>
      </div>

      <Payment />
      <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchText: state.searchTerm
  };
}

export default connect(mapStateToProps)(Store);
