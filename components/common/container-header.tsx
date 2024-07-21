import React from 'react'

type ContainerHeaderProps = {
    children: React.ReactNode,
    title: string,
    showTitle: boolean
}
const ContainerHeader = ({ children, title, showTitle }: ContainerHeaderProps) => {
    return (
        <div>
            {
                showTitle && (
                    <div>
                        <h3>{title}</h3>
                    </div>
                )
            }
            <div>{children}</div>
        </div>
    )
}

export default ContainerHeader