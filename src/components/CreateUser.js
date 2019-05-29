import React, { Component } from "react"
import axios from "axios";
import "./CreateUser.css"

class CreateUser extends Component {
  state = {
    firstname: "",
    lastname: "",
    lookupUser: "",
    userExists: false,
    foundUser: ""
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleAddUser = () => {
    const { firstname, lastname } = this.state
    axios.post("/api/user", { firstname, lastname })
    this.setState({
      firstname: "",
      lastname: ""
    })
  }

  checkUser = () => {
    const { lookupUser } = this.state
    axios.get(`/api/user?firstname=${lookupUser}`)
      .then(res => {
        // console.log("STATUS", res.status)
        if (res.status === 200) {
          this.setState({
            userExists: true,
            lookupUser: "",
            foundUser: res.data[0].firstname
          })
        } else {
          this.setState({
            userExists: false,
            lookupUser: "",
            foundUser: ""
          })
        }
      })
  }

  render() {


    return (
      <div>
        <h2>Add User to Session</h2>

        <div>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.firstname}
            name="firstname"
            placeholder="first name"
          />
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.lastname}
            name="lastname"
            placeholder="last name"
          />
          <button onClick={this.handleAddUser}>Add User to session</button>
        </div>

        <div>
          <h4>Does User Exist on Session?</h4>
          <input
            type="text"
            placeholder="first name"
            onChange={this.handleChange}
            value={this.state.lookupUser}
            name="lookupUser"
          />
          <button onClick={this.checkUser}>Click to see</button>

          <div>
            {this.state.userExists ?
              <h1 className="user-exists">yes, {this.state.foundUser} exists</h1> :
              <h1 className="user-no-exists">no, user does not exist</h1>
            }
          </div>

        </div>

      </div>


    )
  }

}

export default CreateUser




