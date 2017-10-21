import React from 'react'
import List from './List'
import Create from './Create'
import Client from '../client'

export default class App extends React.Component {
  constructor (props, ctx) {
    super(props)
    
    this.state = {
      items: [],
      addValue: ''
    }
    
    // Create client instance for API
    this.itemsClient = new Client('items')
    
    // Get initial items from API
    this.itemsClient.getItems()
      .then((res) => {
        this.setState({ items: res.data })
      })
  }
  
  // When user changes the 'create' value
  changeAddValue = (e) => {
    this.setState({
      addValue: e.target.value
    })
  }
  
  // When user submits create form
  addNewItem = (e) => {
    const items = this.state.items
    this.itemsClient.createItem({ content: this.state.addValue })
      .then((res) => {
        items.push(res.data)
        this.setState({
          items,
          addValue: ''
        })
      })
    e.preventDefault()
  }
  
  // When user clicks to delete an item
  deleteItem = (id) => {
    this.itemsClient.deleteItem(id)
      .then(() => {
        const items = this.state.items.filter((i) => i.id !== id)
        this.setState({ items })
      })
  }
  
  render () {
    return (
      <div className='main'>
        <List 
          items={this.state.items}
          onDelete={this.deleteItem}
        />
        <Create 
          value={this.state.addValue} 
          onChange={this.changeAddValue} 
          onSubmit={this.addNewItem}
        />
      </div>
    )
  }
}