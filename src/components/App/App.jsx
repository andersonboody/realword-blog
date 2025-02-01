import { Route, Routes, Navigate } from 'react-router-dom'

import './App.scss'
import AppHeader from '../AppHeader/AppHeader'
import AppList from '../AppList/AppList'
import AppBlogDetails from '../AppBlogDetails/AppBlogDetails'
import AppRegistration from '../AppRegistration/AppRegistration'
import AppAuthorization from '../AppAuthorization/AppAuthorization'
import AppProfile from '../AppProfile/AppProfile'
import { AppNotification } from '../AppNotification/AppNotification'
import AppCreateArticle from '../AppCreateArticle/AppCreateArticle'
import AppBlogEdit from '../AppBlogEdit/AppBlogEdit'

function App() {
  return (
    <>
      <header className="header">
        <div className="container">
          <AppHeader />
        </div>
      </header>
      <main className="main">
        <AppNotification />
        <div className="container">
          <section className="section">
            <Routes>
              <Route path="/" element={<Navigate to="/articles" />} />
              <Route path="/articles" element={<AppList />} />
              <Route path="/articles/:slug" element={<AppBlogDetails />} />
              <Route path="/sign-in" element={<AppAuthorization />} />
              <Route path="/sign-up" element={<AppRegistration />} />
              <Route path="/profile" element={<AppProfile />} />
              <Route path="/new-article" element={<AppCreateArticle />} />
              <Route path="/articles/:slug/edit" element={<AppBlogEdit />} />
            </Routes>
          </section>
        </div>
      </main>
    </>
  )
}

export default App
