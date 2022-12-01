export interface IPaymentResponse {
  id: string,
  category: string,
  payment: string,
  tag: string,
  price: Number,
  date: string
  '@collectionId': string,
  '@collectionName': string,
  created: string,
  updated: string,
  action?: string,
}
