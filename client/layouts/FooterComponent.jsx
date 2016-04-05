import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class FooterComponent extends Component {

  render() {
    return (
		<div className="ui inverted vertical footer bottom fixed segment">
			<div className="ui container">
				<div className="ui stackable inverted divided equal height stackable grid">
					<div className="three wide column">
						<h4 className="ui inverted header">About</h4>
						<div className="ui inverted link list">
							<a href="#" className="item">Sitemap</a>
							<a href="#" className="item">Contact Us</a>
						</div>
					</div>
					<div className="three wide column">
						<h4 className="ui inverted header">Services</h4>
						<div className="ui inverted link list">
							<a href="#" className="item">FAQs</a>
						</div>
					</div>
					<div className="seven wide column">
						<h4 className="ui inverted header">Footer Header</h4>
						<p>Extra space for a call to action inside the footer that could help re-engage users.</p>
					</div>
				</div>
			</div>
		</div>
    );
  }

}