import React from 'react'
import { Link } from 'react-router-dom'

const PublicNavbar = () => {
  return (
    <nav>
    <ul>
        <li>
            <Link to='/'>
              Home
            </Link>
        </li>
        <li>
            <Link to='/create-post'>
              create-post
            </Link>
        </li>
        <li>
            <Link to='/list-posts'>
              list posts
            </Link>
        </li>
    </ul>
    </nav>
  )
}

export default PublicNavbar
