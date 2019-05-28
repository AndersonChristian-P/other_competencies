import React, { Component } from "react"
import axios from "axios";

class CreateUser extends Component {
  state = {
    firstname: "",
    lastname: "",
    lookupUser: "",
    userExists: false
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleAddUser = () => {
    const { firstname, lastname } = this.state
    axios.post("/api/adduser", { firstname, lastname })
    this.setState({
      user: ""
    })
  }

  checkUser = () => {
    const { lookupUser } = this.state
    const result = axios.get(`/api/getuser?firstname=${lookupUser}`)
    if (result) {
      this.setState({
        userExists: true
      })
    }
  }

  render() {


    return (
      <div>
        <h2>Hello!</h2>

        <div>
          <input type="text" onChange={this.handleChange} value={this.state.firstname} name="firstname" />
          <input type="text" onChange={this.handleChange} value={this.state.lastname} name="lastname" />
          <button onClick={this.handleAddUser}>Add User to session</button>
        </div>

        <div>
          <h4>Does User Exist on Session?</h4>
          <input type="text" placeholder="first name" onChange={this.handleChange} value={this.state.userInQues} name="lookupUser" />
          <button onClick={this.checkUser}>Click to see</button>
        </div>

        {/* <div>
          {this.state.userExists ?
            <h1 style={{ color: "green" }}>Yes, user exits</h1> :
            <h1 style={{ color: "red" }}>No, user does not exist</h1>
          }
        </div> */}

      </div>


    )
  }

}

export default CreateUser




