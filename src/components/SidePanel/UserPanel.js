import React from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';

import firebase from '../../firebase';

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser
  };

  componentDidMount() {
    this.setState({ user: this.props.currentUser });
  }

  dropdownOptions = () => [
    {
      text: (
        <div>
          Signed in as <strong>{this.state.user.displayName}</strong>
        </div>
      ),
      disabled: true,
      key: 'user'
    },
    {
      text: (
        <div>
          <Icon name="user" />
          Change Avatar
        </div>
      ),
      key: 'avatar'
    },
    {
      text: (
        <div onClick={this.handleSignOut}>
          <Icon name="sign out alternate" />
          Sign Out
        </div>
      ),
      key: 'signout'
    }
  ];

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out!'));
  };
  render() {
    const { user } = this.state;
    const { primaryColor } = this.props;

    return (
      <Grid style={{ background: primaryColor }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', marginBottom: '2rem' }}>
            {/* App header on top left */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>DevChat</Header.Content>
            </Header>
          </Grid.Row>
          {/* User Dropdown */}
          <Header style={{ padding: '0.25em' }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image
                    src={user.photoURL}
                    spaced="right"
                    avatar
                    style={{ marginRight: '1.5rem' }}
                  />
                  {user.displayName}
                </span>
              }
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
