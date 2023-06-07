import React from 'react'
import { Item } from '../services/item-service'
interface Props {
  item: Item
}
const ItemPreview = ({ item }: Props) => {
  return (
    <section>
      {item && (
        // <section className='item-list'>
        <section className='item-card'>
          <p>{item._id}</p>
          <p>{item.title}</p>
        </section>
      )}
    </section>
  )
}

export default ItemPreview
