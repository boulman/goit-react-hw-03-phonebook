import React, { Component } from 'react';
import { Label } from './Filter.styled';

export class Filter extends Component {
  render() {
    return (
      <Label>
        Find contacts by name
        <input
          type="text"
          name="search"
          placeholder="Enter search"
          onChange={this.props.onChange}
        />
      </Label>
    );
  }
}
