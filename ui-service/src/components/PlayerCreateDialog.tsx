import React from 'react';

import autobind from "../autobind";
import Emitter from '../Emitter';

declare var $ :any;

interface Props {
}

type State = {
};

export class PlayerCreateDialog extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
    };

    autobind(this);
  }

  componentDidMount() {
    Emitter.on('game.player.create.show', this.eventShow);
  }

  eventShow(e: any) {
    console.log("show create dialog...");

    let el: HTMLInputElement = document.querySelector("#player_name");
    el.value = '';

    $('#player_create_dialog').modal({});
  }

  async onCreatePlayerSubmit(e: any) {
    e.preventDefault();

    let el: HTMLInputElement = document.querySelector("#player_name");
    const name = el.value;

    const data = {
      name: name,
    };

    console.log("CREATE", data);

    const response = await fetch('../api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      let rs = await response.json();
      console.log("CREATED", rs);
      $('#player_create_dialog').modal('hide');
    }
  }

  render() {
    return (
      <div className="modal" id="player_create_dialog" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Rocker</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="create_player_form" onSubmit={this.onCreatePlayerSubmit}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="player_name">Name</label>
                        <input id="player_name" className="form-control"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button form="create_player_form" className="btn btn-success">Create</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
