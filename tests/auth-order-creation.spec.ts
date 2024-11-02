import { expect, test } from '@playwright/test'
import { ApiClient } from './api/api-client'

test('successful authorization and order creation', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request) //already authorized
  const orderId = await apiClient.createOrderAndReturnOrderId() //await as it async
  expect.soft(orderId).toBeDefined()
})
