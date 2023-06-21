import { PureComponent } from 'react';
// import styles of this component

import UserInformation from './UserInformation';

import './panel.css';
class Panel extends PureComponent {    
    render() {
        return (
            <div className="panel-wrapper">
            <div className="panel_container">
              <div className="panel">
                
                  <UserInformation /> 
                
              </div>
            </div>
          </div>
        )
    }
}

export default Panel