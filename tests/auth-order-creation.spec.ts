import { expect, test } from '@playwright/test'
import { ApiClient } from './api/api-client'

test('successful authorization and order creation', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request) //already authorized
  const orderId = await apiClient.createOrderAndReturnOrderId() //await as it async
  expect.soft(orderId).toBeDefined()
})

//homework12

test('successful authorization and get order by ID ', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  await apiClient.retrieveOrderById(orderId)
  expect.soft(orderId).toBeDefined()
})

test('successful authorization and delete order by ID ', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  await apiClient.deleteOrderId(orderId)
})
