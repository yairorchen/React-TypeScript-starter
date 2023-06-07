import React from 'react'
import { Item } from '../services/item-service'

interface Props {
  itemDetails: Item
}
const ItemDetails = ({ itemDetails }: Props) => {
  console.log(itemDetails)

  return <div>{itemDetails.title}</div>
}

export default ItemDetails
