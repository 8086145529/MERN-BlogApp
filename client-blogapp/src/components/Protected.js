import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Protected({ Component }) {
    const navigate = useNavigate()
    useEffect(() => {
        let token = document.cookie.split('=')[1];
        if (!token) {
            navigate('/login')
        }
    }, [])
    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected