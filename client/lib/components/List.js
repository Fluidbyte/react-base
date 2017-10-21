import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class List extends React.Component {
  
  deleteItem = (e) => {
    this.props.onDelete(e.currentTarget.id)
  }
  
  render () {
    return (
      <ListGroup>
        <ReactCSSTransitionGroup
          transitionName='item'
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}>
          {this.props.items.length > 0 && this.props.items.map((item) => (
            <ListGroupItem key={item.id}>
              <a className='delete-item' id={item.id} onClick={this.deleteItem}>
                <i className='fa fa-times'></i>
              </a>
              {item.content}
            </ListGroupItem>
          ))}
        </ReactCSSTransitionGroup>
      </ListGroup>
    )
  }
}