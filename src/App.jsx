import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'
import Book from './pages/Book'
import Admin from './pages/Admin'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function AdminLayout({ children }) {
  return <div className="min-h-screen">{children}</div>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/reviews" element={<Layout><Reviews /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/book" element={<Layout><Book /></Layout>} />
        <Route path="/admin" element={<AdminLayout><Admin /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
