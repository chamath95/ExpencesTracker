import express from 'express'
import userController from '../controllers/user.controller'

const router = express.Router()

router.route('/auth/signup')
  .post(userController.signup)
router.route('/auth/signin')
  .post(userController.signin)
router.route('/auth/signout')
  .get(userController.signout)

export default router