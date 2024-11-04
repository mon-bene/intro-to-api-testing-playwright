import { APIRequestContext } from 'playwright'
import { LoginDto } from '../dto/login-dto'
import { StatusCodes } from 'http-status-codes'
import { expect } from '@playwright/test'
import { OrderDto } from '../dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'
const orderByIdPath = (id: string) => `orders/${id}`

export class ApiClient {
  static instance: ApiClient
  private request: APIRequestContext
  private jwt: string = ''

  private constructor(request: APIRequestContext) {
    this.request = request
  }

  public static async getInstance(request: APIRequestContext): Promise<ApiClient> {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(request)
      await this.instance.requestJwt()
    }
    return ApiClient.instance
  }

  private async requestJwt(): Promise<void> {
    console.log('Requesting JWT...')
    const authResponse = await this.request.post(`${serviceURL}${loginPath}`, {
      data: LoginDto.createLoginWithCorrectCredentials(),
    })
    // Check response status for negative cases
    if (authResponse.status() !== StatusCodes.OK) {
      console.log('Authorization failed')
      throw new Error(`Request failed with status ${authResponse.status()}`)
    }

    // Save the JWT token as a client property
    this.jwt = await authResponse.text()
    console.log('jwt received:')
    console.log(this.jwt)
  }

  async createOrderAndReturnOrderId(): Promise<number> {
    console.log('Creating order...')
    const response = await this.request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithUndefinedOrderId(),
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
    console.log('Order response: ', response)

    expect(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    console.log('Order created: ')
    console.log(responseBody)

    return responseBody.id
  }

  //homework12

  async createOrderAndRetrieveOrderId(): Promise<number> {
    console.log('Creating order...')
    const response = await this.request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithUndefinedOrderId(),
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
    console.log('Order response: ', response)

    expect(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()

    const orderId = responseBody.id
    expect.soft(orderId).toBeDefined()

    console.log('Order retrieval with ID :${id}')
    const getOrderResponse = await this.request.get(`${serviceURL}${orderByIdPath(orderId)}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
    console.log('Order retrieval response: ', getOrderResponse)
    expect(getOrderResponse.status()).toBe(StatusCodes.OK)

    const getOrderResponseBody = await getOrderResponse.json()
    console.log('Order retrieved: ', getOrderResponseBody)

    return getOrderResponseBody
  }

  async createOrderAndDeleteOrderId(): Promise<number> {
    console.log('Creating order...')
    const response = await this.request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithUndefinedOrderId(),
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
    console.log('Order response: ', response)

    expect(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()

    const orderId = responseBody.id
    expect.soft(orderId).toBeDefined()

    console.log('Order retrieval with ID :${id}')
    const getOrderResponse = await this.request.get(`${serviceURL}${orderByIdPath(orderId)}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
    console.log('Order retrieval response: ', getOrderResponse)
    expect(getOrderResponse.status()).toBe(StatusCodes.OK)

    const getOrderResponseBody = await getOrderResponse.json()
    console.log('Order retrieved: ', getOrderResponseBody)

    console.log('Deleting order with ID: ${Id}')
    const deleteOrderResponse = await this.request.delete(
      `${serviceURL}${orderByIdPath(orderId)}`,
      {
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
      },
    )

    console.log('Order deletion response: ', deleteOrderResponse)
    expect(deleteOrderResponse.status()).toBe(StatusCodes.OK)

    return getOrderResponseBody
  }
}
