module.exports = (req, res, next) => {
  const { email, name, password } = req.body

  function validName(username) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)
  }

  if (req.path === '/register') {
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials')
    } else if (!validName(email)) {
      return res.status(401).json('Invalid email')
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials')
    } else if (!validName(email)) {
      return res.status(401).json('Invalid Email')
    }
  }

  next()
}
