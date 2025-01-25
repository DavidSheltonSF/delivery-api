import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true },
  phone: {type: String, required: true},
  role: {
    type: String, 
    required: true,
    enum: ['admin', 'costumer', 'restaurant owner', 'driver']
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  bankInfo: {
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    agencyNumber: { type: String, required: true },
    accountType: { type: String, required: true },
    pixKey: {type: String, required: true}
  },
  authentication: {
    password: { type: String, required: true },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
}, {timestamps: true})

const UserModel = mongoose.model("UsersTest", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 
  "authentication.sessionToken": sessionToken,
 });
export const getUserById = (id: String) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values)
  .save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id: String, values: Record<string, any>) => UserModel.
 findByIdAndUpdate(id, values);
export const deleteAllUsers = () => UserModel.deleteMany()
