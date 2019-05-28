module.exports = {
  getUsers: (req, res) => {
    const { users } = req.session
    try {
      if (users) {
        res.status(200).send(users)
      } else {
        throw new Error(401)
      }
    } catch (err) {
      res.sendStatus(404)
    }
  },

  addUser: (req, res) => {
    const { firstname, lastname } = req.body

    let newName = { firstname, lastname }

    req.session.users.push(newName)
    res.sendStatus(200)

    console.log(req.session.users)

  },

  getUser: (req, res) => {

  }
}