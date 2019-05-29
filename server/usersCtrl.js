module.exports = {
  getUser: (req, res) => {
    const { firstname } = req.query

    const lookupName = firstname.toLowerCase()

    const { users } = req.session

    const exists = users.filter((val) => {
      return (val.firstname.toLowerCase().includes(lookupName))
    })

    if (exists.length > 0) {
      res.status(200).send(exists)
    } else {
      res.sendStatus(204)
    }
  },

  addUser: (req, res) => {
    const { firstname, lastname } = req.body

    let newName = { firstname, lastname }

    req.session.users.push(newName)

    console.log(req.session.users)
    res.sendStatus(200)
  }
}