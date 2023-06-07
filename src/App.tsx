import {
  NavLink,
  NavLinkProps,
  Link,
  LinkProps,
  Routes,
  HashRouter as Router,
  Route,
} from 'react-router-dom'

import Header from '../src/components/Header'
import ItemList from './components/ItemList'
import HomePage from './views/HomePage'

const App = () => {
  return (
    <Router>
      <section className='app-container main-layout'>
        <Header />
        <Routes>
          <Route path='/items' element={<ItemList />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </section>
    </Router>
  )
}

export default App
