import React, { useState, useEffect, useRef } from 'react'
import ItemPreview from './ItemPreview'
import { itemService, Item } from '../services/item-service'
import ItemDetailsModal from './ItemDetailsModal'
import useClickOutside from '../costumHooks/useClickOutside'

const ItemList = () => {
  const [itemDetails, setItem] = useState<Item | null>(null)
  const [detailsIsOpen, setDetailsIsOpen] = useState<boolean>(false)
  const detailsModalRef = useRef<HTMLDivElement>(null)

  const items: Item[] = itemService.query()
  console.log(items)
  const openDetails = () => {
    setDetailsIsOpen(true)
  }
  const selectItem = async (itemId: string | null) => {
    console.log(itemId)

    if (itemId === null) {
      setItem(null)
      setDetailsIsOpen(false)
      console.log('closed')
    } else {
      const item: Item = await itemService.getById(itemId)
      console.log('selected')
      setItem(item)
      setDetailsIsOpen(true)
    }
  }

  useClickOutside(detailsModalRef, () => {
    setItem(null)
    setDetailsIsOpen(false)
  })
  return (
    <section className='main-layout'>
      {items && (
        <section className='item-card-list'>
          {/* // <section className='item-list'> */}
          {items.map((item) => (
            <li
              key={item._id}
              onClick={() => {
                selectItem(item._id)
              }}
            >
              {<ItemPreview item={item} />}
            </li>
          ))}
        </section>
      )}
      {detailsIsOpen && (
        <section ref={detailsModalRef}>
          <ItemDetailsModal item={itemDetails} selectItem={selectItem} />
        </section>
      )}
    </section>
  )
}

export default ItemList
