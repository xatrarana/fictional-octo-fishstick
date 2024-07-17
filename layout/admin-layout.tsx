import NavBar from '@/components/common/nav-bar'
import React from 'react'



const AdminLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <NavBar />
            <main>
                {children}
            </main>
        </>
    )
}

export default AdminLayout