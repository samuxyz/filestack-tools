import React, { Component } from 'react';
import filestack from 'filestack-js';
const API_KEY = 'Acu94EFL1STGYvkM6a8usz';

const client = filestack.init(API_KEY);
const processAPI = 'https://process.filestackapi.com';

export default class Container extends Component {

  constructor (props) {
    super(props);
    this.state = { url : '' };
    this.handleUpload = this.handleUpload.bind(this);
  }

  filestack = () => {
    return client.pick(
      {
        accept: 'image/*',
        maxSize: 1024 * 1024 * 5,
      }
    );
  };

  async handleUpload () {
    try {
      const { filesUploaded } = await this.filestack();
      this.setState({ url: `${processAPI}/cache=e:500/${filesUploaded[0].handle}` });
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    const { url } = this.state;
    return (
      <div className="container">
        <div className="page-header">
          <h1>Filestack Tools <small>Cache & Debug</small></h1>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <div className="thumbnail">
              <img
                className="img-responsive"
                src={url || 'http://placehold.it/800x600?text=Preview'}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="text-center">
            <button className="btn btn-filestack" onClick={this.handleUpload}>
              <i className="glyphicon glyphicon-upload" /> Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
}
