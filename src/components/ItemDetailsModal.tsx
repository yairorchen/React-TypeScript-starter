import React, { useState, useEffect } from 'react'
import ItemDetails from './ItemDetails'
import { Item, itemService } from '../services/item-service'

interface Props {
  item: Item
  selectItem: any
}
const ItemDetailsModal = ({ item, selectItem }: Props) => {
  const [itemDetails, setItem] = useState<Item | null>(null)
  useEffect(() => {
    loadItem()
  }, [])
  const loadItem = async () => {
    const itemDetails: any = await itemService.getById(item._id)
    console.log(itemDetails)
    setItem(itemDetails)
  }
  return (
    <section className='item-details-modal'>
      <button
        className='x-btn'
        onClick={() => {
          selectItem(null)
        }}
      >
        X
      </button>
      {item && <p>{item._id}</p>}
      <ItemDetails itemDetails={item} />
    </section>
  )
}

export default ItemDetailsModal
