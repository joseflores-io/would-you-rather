import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Grid, Dropdown, Header, Icon, Segment } from "semantic-ui-react";

class Login extends Component {
  state = {
    redirectToReferrer: false
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    const { authedUser, users } = this.props;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    } else if (authedUser !== null) {
      return <Redirect to="/home" />;
    }

    return (
      <div style={{ margin: "4% 2%" }}>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" icon textAlign="center">
              {authedUser !== null ? (
                <div>
                  <img
                    src={authedUser.avatarURL}
                    alt="avatar"
                    style={{
                      borderRadius: "50%",
                      width: "50%"
                    }}
                  />
                </div>
              ) : (
                <Icon name="users" circular />
              )}

              <Header.Content>
                {authedUser === null
                  ? "Hey, Would You Rather..."
                  : `Hey ${authedUser.name}
            `}
              </Header.Content>
            </Header>
            <Segment>
              <Dropdown
                style={{ marginBottom: 8 }}
                placeholder="Select User"
                fluid
                selection
                options={users.map(user => {
                  const { name, id, avatarURL } = user;
                  return {
                    text: name,
                    value: id,
                    image: {
                      avatar: true,
                      src: avatarURL
                    },
                    onClick: () => {
                      this.props.dispatch(setAuthedUser(user));
                      this.setState({ redirectToReferrer: true });
                    }
                  };
                })}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    users: Object.values(users),
    authedUser
  };
}

export default connect(mapStateToProps)(Login);
