import React, { Component } from 'react'
import { Accordion, Form, Menu, Icon  } from 'semantic-ui-react'
import { Button, Divider, Input, Segment } from 'semantic-ui-react'
import axios from 'axios'
import UserCard from './user-card';
import CardCarousel from './card-carousel';
import { getBdaysToday,getBdaysTom, getBdays} from '../actions';
import { connect } from 'react-redux';
import { urlWhoAmI } from '../urls';
import { isMobile, isBrowser } from 'react-device-detect';
import '../css/bday-card.css';



class BirthdayAccordion extends React.Component {
  
  state = { activeIndex: 0 , number:0, array: [true,false,false,false,false] , whoami:{}, filteredList:[],display:true}
  componentDidMount () {
    this.props.BdayList(this.state.number)  
    axios
          .get(urlWhoAmI())
          .then(response => {
            this.setState({whoami:  response.data})
          })
          .catch(e => {
            console.warn(`Error while getting details`);
          }); 
  }

  filterBatch(list,whoami){
      return list.filter(function(item){
        return ((item.person.student.currentYear == whoami.student.currentYear) && (item.person.student.branch.id == whoami.student.branch.id));
     });
    
    return list;
  }
  
  filterYear(list,whoami){
      return list.filter(function(item){
        return (item.person.student.currentYear == whoami.student.currentYear);
     });
    
    return list;
  }
  
  filterBhawan(list,whoami){
      return list.filter(function(item){
        return (item.person.residentialinformation.residence.id == whoami.residentialinformation.residence.id);
     });
  }
  
  filterIndividualGroup(list,membership){
      return list.filter(function(item){
        return item.person.membershipSet.some(val => val.group === membership.group);
     });
    
  }
  
  filterGroup(list,whoami){
      var array=[]
      whoami.membershipSet.map(membership =>{
        var temp = this.filterIndividualGroup(list,membership)
        array  = [...array, ...temp];
        
      })
      const unique = [...new Set(array.map(item => item))];
      
    return unique;
  }
  
  filterList(list,whoami,newList,array){
    if(list.isLoaded){
      newList = newList.list
      if(array[1]){
        newList = this.filterGroup(newList,whoami)
      }
      if(array[2]){
        newList = this.filterBatch(newList,whoami)
      }
      if(array[3]){
        newList =this.filterBhawan(newList,whoami)
      }
      if(array[4]){
        newList =this.filterYear(newList,whoami)
      }
      this.setState({display: true});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            b
      this.setState({filteredList: newList});
      return newList;
    }
    this.setState({filteredList: list});  
    return list.list;
    
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  filterClick (x){
    const newIds = this.state.array.slice()
    newIds[x] = !newIds[x]
    let result = newIds.every(function (e) {
        return e == false;
    });
    if(result){
      newIds[0] = true;
    }
    else{
      newIds[0] = false;
    }
    this.setState({array: newIds})
    this.setState({display: false})
    var a= this.filterList(this.props.bdayList,this.state.whoami,this.props.bdayList,newIds)
    this.setState({filteredList: a});
  }

  AllClick = (e)=>{
    this.setState({array: [true,false,false,false,false]})

  }
  changeIndex(i){
    this.AllClick()
    this.setState({number: i})
    this.props.BdayList(i)
  }

  render() {
    const { activeIndex } = this.state
    const { bdayList } = this.props
    return (
      // {isBrowser &&
      <Accordion  vertical styleName='accordion'>
        
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >

            <div styleName='acc-title'>
              <div>
              
              </div>
              <div>Birthdays</div>
            
            <Icon name='dropdown' />
            </div>
            
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0} >
          <Divider style={{border: "1px solid #F3F4F4", height: "0px"}} />
          <div styleName="btn-grp1">
          <Button styleName={this.state.number===0 ? 'day-btn clicked' : 'day-btn'} content="Today"
          onClick={() => {this.changeIndex(0)}}/>
          <Button styleName={this.state.number===1 ? 'day-btn clicked' : 'day-btn'} content="Tomorrow"
          onClick={() => {this.changeIndex(1)}}/>
          <Button styleName={this.state.number===2 ? 'day-btn clicked' : 'day-btn'} content="Day After Tomorrow"
          onClick={() => {this.changeIndex(2)}}/>
          </div>
            <Divider style={{border: "1px solid #F3F4F4", height: "0px"}}/>
            <div styleName="btn-grp2">
            <div style={{ marginRight: "6px"}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.2492 0H0.750872C0.0846841 0 -0.251472 0.808313 0.220559 1.28034L6 7.06066V13.5C6 13.7447 6.1194 13.9741 6.3199 14.1144L8.8199 15.8638C9.31312 16.2091 10 15.8592 10 15.2494V7.06066L15.7796 1.28034C16.2507 0.80925 15.9168 0 15.2492 0Z" fill="#454545"/>
            </svg>
            </div>
              <div styleName="filter-txt">
                Filters:
              </div>
              <Button styleName={this.state.array[0] ? 'filter-btn clicked' : 'filter-btn'} content="All"
              onClick={() => {this.AllClick()}}/>
              <Button styleName={this.state.array[1] ? 'filter-btn clicked' : 'filter-btn'} content="Same Group"
              onClick={() => {this.filterClick(1)}}/>
              <Button styleName={this.state.array[2]? 'filter-btn clicked' : 'filter-btn'} content="Same Batch"
              onClick={() => {this.filterClick(2)}}/>
              <Button styleName={this.state.array[3] ? 'filter-btn clicked' : 'filter-btn'} content="Same Bhawan"
              onClick={() => {this.filterClick(3)}}/>
              <Button styleName={this.state.array[4]?'filter-btn clicked' : 'filter-btn'} content="Same Year"
              onClick={() => {this.filterClick(4)}}/>

            </div>
            <div >
              {this.state.whoami.id &&
              <CardCarousel when={this.state.number} array={this.state.array} whoami={this.state.whoami} filteredList={this.state.filteredList} display={this.state.display}/>}
            </div>
          </Accordion.Content>
      </Accordion>
      
              
    )
  }
}
function mapStateToProps (state) {
  return {
    bdayList: state.bdayList,
    filteredList : state.filteredList
  }
}


const mapDispatchToProps = (dispatch) => {
  
  return {
    BdayList: (number) => {
      dispatch(getBdays(number))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(BirthdayAccordion)