import React from 'react';

export class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      tags: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    
    const value = target.name === 'tags' ? [] : target.value;
    // to fill multiple select
    if (target.name === 'tags') {
      const options = target.options;
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
    }

    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      text: this.state.text,
      tags: this.state.tags,
      tags: this.state.books,
    }
    fetch('/.netlify/functions/airtable/airtable.js', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(() => this.props.listRecords())
    .catch((error) => {
      console.error('Error:', error);
    });

    this.setState({
      text: '',
      tags: []
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Project Name</label>
                <input 
                  name="text"
                  type="text" 
                  value={this.state.text} 
                  onChange={this.handleInputChange} 
                  className="form-control form-control-sm" 
                  required/>
              </div> 
              <div className="form-group">
                <label>Project Name</label>
                <input 
                  name="text"
                  type="text" 
                  value={this.state.text} 
                  onChange={this.handleInputChange} 
                  className="form-control form-control-sm" 
                  required/>
              </div>   
              <div className="form-group">
                <label>Pick Tags</label>
                <select name="Category," multiple={true} value={this.state.books} onChange={this.handleInputChange} className="form-control form-control-sm" required>
                  <option value="Enginering ">Enginering</option>
                  <option value="Ecomerce">Ecomerce</option>
                  <option value="Programing">Programing</option>
                  <option value="HAcker rank">resume/CV</option>
                </select>
              </div>  
                  
              <div>
                <input type="submit" value="Save" className="btn btn-primary mb-2"/>
              </div> 
          </form>
      </div> 
    </div> 
    );
  }
}