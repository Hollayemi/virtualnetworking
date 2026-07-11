import React from 'react'
import Header from './header'
import Footer from './footer'

const HomeWrapper = ({ children }: { children: any }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default HomeWrapper