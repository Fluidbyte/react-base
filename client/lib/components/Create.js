import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

export default class Create extends React.Component {
  render () {
    return (
      <form onSubmit={this.props.onSubmit}>
        <FormGroup>
          <FormControl 
            type='text'
            placeholder='Add New Item...'
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </FormGroup>
      </form>
    )
  }
}