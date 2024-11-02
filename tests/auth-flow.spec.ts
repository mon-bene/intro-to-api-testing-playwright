import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'
import { OrderDto } from './dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

test('Incorrect username and password return 401', async ({ request }) => {
  const loginDto = LoginDto.createLoginWithInCorrectCredentials()
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: loginDto,
  })
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

// test before modifying

test('Successful authorization flow with correct username and password return 200', async ({
  request,
}) => {
  const loginDto = LoginDto.createLoginWithCorrectCredentials()
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: loginDto,
  })
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  console.log(await response.text())
})

//test after modifying for homework 11

test('Successful authorization flow return 200 and valid JWT ', async ({ request }) => {
  const loginDto = LoginDto.createLoginWithCorrectCredentials()
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: loginDto,
  })
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.text()
  console.log(responseBody)
  const jwtPattern = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
  expect(responseBody).toMatch(jwtPattern)
})

test('Authorization flow with incorrect HTTP method returns 405', async ({ request }) => {
  const loginDto = LoginDto.createLoginWithCorrectCredentials()
  const response = await request.get(`${serviceURL}${loginPath}`, {
    data: loginDto,
  })
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('successful authorization and creat order ', async ({ request }) => {
  const loginDto = LoginDto.createLoginWithCorrectCredentials()
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: loginDto,
  })
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.OK)

  const jwt = await response.text() // define jwt as const

  const orderDto = OrderDto.createOrderWithCorrectRandomData()
  orderDto.id = undefined

  const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
    data: orderDto,
    headers: {
      Authorization: `Bearer ${jwt}`, //use jwt with this referances
    },
  })

  const orderResponseJson = await orderResponse.json() //transformed to json body
  console.log(orderResponseJson)
  expect.soft(orderResponseJson.status).toBe('OPEN')
  expect.soft(orderResponseJson.id).toBeDefined()
})
