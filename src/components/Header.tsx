import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const [menuOpen, setCurrMenuOpen] = useState(false)

  const openMenu = () => {
    setCurrMenuOpen(!menuOpen)
  }
  return (
    <div className='app-header'>
      <NavLink to='/'>
        <h1>LOGO</h1>
      </NavLink>
      <nav className='nav-bar'>
        <NavLink to='/items'>ITEM LIST</NavLink>
      </nav>
      <section className={`menu-modal ${!menuOpen ? ' open' : ''}`}>
        <article className='sidebar-btn new-case-btn flex  align-center'>
          <NavLink to='/items'>ITEM LIST</NavLink>
        </article>
      </section>

      <div
        className={`menu-icon ${menuOpen ? ' change' : ''}`}
        onClick={openMenu}
      >
        <div className='bar1'></div>
        <div className='bar2'></div>
        <div className='bar3'></div>
      </div>
    </div>
  )
}

export default Header
