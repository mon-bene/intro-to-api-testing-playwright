import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/order-dto'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(StatusCodes.OK)
})

test('get order with incorrect id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('post order with correct data should receive code 200', async ({ request }) => {
  // prepare request body
  const orderDto = OrderDto.createOrderWithCorrectRandomData()
  orderDto.customerName = 'Luke'
  //const orderDto = new OrderDto("OPEN", 4, "Tom", "Jonny", "testing", 0)
  // const requestBody = {
  //   status: 'OPEN',
  //   courierId: 0,
  //   customerName: 'string',
  //   customerPhone: 'string',
  //   comment: 'string',
  //   id: 0,
  //}
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: orderDto,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.status).toBe('OPEN')
  expect.soft(responseBody.customerName).toBe('Luke')
})

test('post order with incorrect data should receive code 400', async ({ request }) => {
  // prepare request body
  //const orderDto = new OrderDto("CLOSED", 4, "Tom", "Jerry", "new", 1)
  // const requestBody = {
  //   status: 'CLOSED',
  //   courierId: 0,
  //   customerName: 'string',
  //   customerPhone: 'string',
  //   comment: 'string',
  //   id: 0,
  // }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: OrderDto.createOrderWithIncorrectRandomData(),
  })
  // Log the response status and body
  console.log('response status:', response.status())
  //console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('put order with valid data should receive code 200', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'TOM',
    customerPhone: '+37777777777',
    comment: 'order',
    id: 5,
  }
  const requestHeaders = { api_key: '1234567890123456' }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/5', {
    headers: requestHeaders,
    data: requestBody,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

// 9 homework

test('put order with invalid data should receive code 400', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 3,
    customerName: 'Jon',
    customerPhone: 'string',
    comment: 'Order',
    id: 'fail',
  }
  const requestHeaders = { api_key: '1234567890123456' }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/5', {
    headers: requestHeaders,
    data: requestBody,
  })
  console.log('response headers:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Delete order by providing valid data should receive code 204', async ({ request }) => {
  const requestHeaders = { api_key: '1234567890123456' }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('Delete order by providing invalid id should receive code 400', async ({ request }) => {
  const requestHeaders = { api_key: '1234567890123456' }
  const response = await request.delete(
    'https://backend.tallinn-learning.ee/test-orders/invalid-id',
    {
      headers: requestHeaders,
    },
  )
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Authenticate a user by providing valid username and password should receive code 200', async ({
  request,
}) => {
  const requestHeaders = { api_key: '1234567890123456' }
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders?username=mo&password=something',
    {
      headers: requestHeaders,
    },
  )
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Authenticate a user by providing just username should receive code 500', async ({
  request,
}) => {
  const requestHeaders = { api_key: '1234567890123456' }

  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders?username=invalidUser',
    {
      headers: requestHeaders,
    },
  )

  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})
