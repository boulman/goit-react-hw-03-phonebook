import React, { Component } from 'react';

export class Contacts extends Component {
  render() {
    return (
      <>
        <ul>
          {this.props.contacts.map(({ id, name, phone }) => (
            <li key={id}>
              {name}: {phone}{' '}
              <button
                type="button"
                onClick={() => {
                  this.props.onDelete(id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
