import express from 'express'
import * as jose from 'jose'
import cookieParser from 'cookie-parser'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(cookieParser())

app.use(express.static('public'))

app.use(async (req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }
  try {
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(SECRET_JWT_KEY))
    req.session.user = payload
  } catch {}

  next()
})

app.get('/', async (req, res) => {
  const user = req.session.user || null
  const message = ''
  res.render('index', { user, message })
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    const token = await new jose.SignJWT({ id: user._id, username: user.username })
      .setExpirationTime('24h')
      .setProtectedHeader({ alg: 'HS256' })
      .sign(new TextEncoder().encode(SECRET_JWT_KEY))

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
      })
      .json({ user, message: 'Login successful!', success: true })
  } catch (error) {
    res.status(401).json({ message: 'Login failed! Please try again.', success: false })
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const id = await UserRepository.create({ username, password })
    res.json({ id, message: 'Registration successful! Please login.', success: true })
  } catch (error) {
    res.status(400).json({ message: 'Registration failed! Please try again.', success: false })
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('access_token')
  res.json({ message: 'Logout successful!' })
})

app.get('/protected', async (req, res) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(403).send('Access not authorized')
  }

  try {
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(SECRET_JWT_KEY))
    res.render('protected', { user: payload })
  } catch (error) {
    res.status(401).send('Access not authorized')
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
