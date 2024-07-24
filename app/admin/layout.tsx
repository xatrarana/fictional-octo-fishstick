import DefaultLayout from '@/components/common/dashboard-navbar'
import React from 'react'



const AdminLayout = ({ children }: LayoutProps) => {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    )
}

export default AdminLayout