import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.static('login', async function (name, password) {
  try {
    // Search for the user in the database
    const user = await this.findOne({ name: name.toLowerCase() })

    // If the user is not found, throw an error
    if (!user) throw new Error()

    // Check the password
    // const isPasswordCorrect = await user.comparePassword(password)

    // // If the password is incorrect, throw an error
    // if (!isPasswordCorrect) throw new Error()

    const userWithoutPassword = { ...user }
    delete userWithoutPassword._doc.password

    return userWithoutPassword._doc
  } catch (error) {
    // Error handling
    throw new Error(`Invalid credentials`)
  }
})

UserSchema.static('register', async function (name, password) {
  try {
    // Search for the user in the database
    const user = await this.create({ name: name.toLowerCase(), password: password })

    // If the user is not found, throw an error

    // Check the password
    // const isPasswordCorrect = await user.comparePassword(password)

    // // If the password is incorrect, throw an error
    // if (!isPasswordCorrect) throw new Error()

    const userWithoutPassword = { ...user }
    delete userWithoutPassword._doc.password

    return userWithoutPassword._doc
  } catch (error) {
    // Error handling
    throw new Error(`Invalid credentials`)
  }
})

UserSchema.static('refresh', async function (id) {
  try {
    // Search for the user in the database
    const user = await this.findById(id)

    // If the user is not found, throw an error

    // Check the password
    // const isPasswordCorrect = await user.comparePassword(password)

    // // If the password is incorrect, throw an error
    // if (!isPasswordCorrect) throw new Error()

    const userWithoutPassword = { ...user }
    delete userWithoutPassword._doc.password

    return userWithoutPassword._doc
  } catch (error) {
    // Error handling
    throw new Error(`Invalid credentials`)
  }
})

export default mongoose.model('User', UserSchema)
