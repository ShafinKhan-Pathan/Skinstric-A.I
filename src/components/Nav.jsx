import React from 'react'
import LocationLogo from '/icons/location.png'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <nav>
        <div className="nav__wrapper">
            <div className="nav__left">
              <Link to="/" className='nav__link'>
                <p>SKINSTRIC</p>
                <img className='nav__logo' src={LocationLogo} alt="" />
                </Link>
            </div>
            <div className="nav__right">
                <button className='nav__btn'>Enter Code</button>
            </div>
        </div>
    </nav>
  )
}

export default Nav