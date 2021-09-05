import React, { Component } from 'react'

export default class Category extends Component {
    render() {
        return (
            <div>
               <div className="filter-widget">
                  <h4 className="fw-title">Categories</h4>
                  <ul className="filter-catagories">
                    <li>
                      <a href="#">Kaki</a>
                    </li>
                    <li>
                      <a href="#">Cotton</a>
                    </li>
                    
                  </ul>
                </div>
                <div className="filter-widget">
                  <h4 className="fw-title">Brand</h4>
                  <div className="fw-brand-check">
                    <div className="bc-item">
                      <label htmlFor="bc-calvin">
                        Calvin Klein
                        <input type="checkbox" id="bc-calvin" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="bc-item">
                      <label htmlFor="bc-diesel">
                        Diesel
                        <input type="checkbox" id="bc-diesel" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="bc-item">
                      <label htmlFor="bc-polo">
                        Polo
                        <input type="checkbox" id="bc-polo" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="bc-item">
                      <label htmlFor="bc-tommy">
                        Tommy Hilfiger
                        <input type="checkbox" id="bc-tommy" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div> 
            </div>
        )
    }
}
