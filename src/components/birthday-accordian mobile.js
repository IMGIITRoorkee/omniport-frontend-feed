import React, { Component } from 'react'
import { Accordion, Form, Menu, Icon  } from 'semantic-ui-react'
import { Button, Divider, Input, Segment } from 'semantic-ui-react'
import axios from 'axios'
import UserCard from './user-card';
import CardExpand from './card-expanding-list';
// import Carousel from 'react-elastic-carousel';
import { getBdaysToday,getBdaysTom, getBdays} from '../actions';
import { connect } from 'react-redux';
import { urlWhoAmI } from '../urls';
import { isMobile, isBrowser } from 'react-device-detect'
import '../css/bday-card.css'


import { Tab } from 'semantic-ui-react'


class BirthdayAccordionMobile extends React.Component {
  
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
      console.log("performing")
      return list.filter(function(item){
        return (item.person.residentialinformation.residence.id == whoami.residentialinformation.residence.id);
     });
    
    console.log("entered")
    console.log(list)
    return list;
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
      this.setState({display: true});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     b
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
    console.log(this.filterList(this.props.bdayList,this.state.whoami,this.props.bdayList,newIds))
    this.setState({filteredList: a});
  }

  AllClick = (e)=>{
    this.setState({array: [true,false,false,false,false]})

  }
  changeIndex(i){
    this.setState({number: i})
    this.props.BdayList(i)
  }

  render() {
    const { activeIndex } = this.state
    const { bdayList } = this.props
    return (
      
      <Accordion  vertical styleName='accordion2'>
        
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >

            <div styleName='acc-title2'>
              <div>
              </div>
              <div>Birthdays</div>
            
            <Icon name='dropdown' />
            </div>
            
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0} >
          
          <div styleName="btn-grp3">
          <div styleName="btn-container">
          <Button styleName={this.state.number===0 ? 'day-btn2 clicked' : 'day-btn2'} content="Today"
          onClick={() => {this.changeIndex(0)}}/>
          </div>
          <div styleName="btn-container" style={{border:"0.5px solid #E7E7E7"}}>
          <Button styleName={this.state.number===1 ? 'day-btn2 clicked' : 'day-btn2'} content="Tomorrow"
          onClick={() => {this.changeIndex(1)}}/>
          </div>
          <div styleName="btn-container">
          <Button styleName={this.state.number===2 ? 'day-btn2 clicked' : 'day-btn2'} content="Day after Tomorrow"
          onClick={() => {this.changeIndex(2)}}/>
          </div>
          </div>
            
            <div styleName="btn-grp4">
              
              <Button styleName={this.state.array[1] ? 'filter-btn2 clicked' : 'filter-btn2'} content="Same Group"
              onClick={() => {this.filterClick(1)}}/>
              <Button styleName={this.state.array[2]? 'filter-btn2 clicked' : 'filter-btn2'} content="Same Batch"
              onClick={() => {this.filterClick(2)}}/>
              <Button styleName={this.state.array[3] ? 'filter-btn2 clicked' : 'filter-btn2'} content="Same Bhawan"
              onClick={() => {this.filterClick(3)}}/>
              <Button styleName={this.state.array[4]?'filter-btn2 clicked' : 'filter-btn2'} content="Same Year"
              onClick={() => {this.filterClick(4)}}/>

            </div>
            <div >
              {this.state.whoami.id &&
              <CardExpand when={this.state.number} array={this.state.array} whoami={this.state.whoami} filteredList={this.state.filteredList} display={this.state.display}/>}
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
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BirthdayAccordionMobile)
