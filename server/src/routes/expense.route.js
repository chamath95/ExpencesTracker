import express from 'express'

import expenseCtrl from '../controllers/expense.controller'
import userController from '../controllers/user.controller'

const router = express.Router()

router.route('/api/expenses/current/preview')
  .get(userController.requireSignin, expenseCtrl.currentMonthPreview)

router.route('/api/expenses/by/category')
  .get(userController.requireSignin, expenseCtrl.expenseByCategory)

router.route('/api/expenses/plot')
  .get(userController.requireSignin, expenseCtrl.plotExpenses)

router.route('/api/expenses/category/averages')
  .get(userController.requireSignin, expenseCtrl.averageCategories)

router.route('/api/expenses/yearly')
  .get(userController.requireSignin, expenseCtrl.yearlyExpenses)

router.route('/api/expenses')
  .post(userController.requireSignin, expenseCtrl.create)
  .get(userController.requireSignin, expenseCtrl.listByUser)

router.route('/api/expenses/:expenseId')
  // .get(userController.requireSignin, expenseCtrl.read)
  .put(userController.requireSignin, expenseCtrl.hasAuthorization, expenseCtrl.update)
  .delete(userController.requireSignin, expenseCtrl.hasAuthorization, expenseCtrl.remove)

router.param('expenseId', expenseCtrl.expenseByID)

export default router