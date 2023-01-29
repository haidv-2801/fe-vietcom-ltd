import React, { useEffect } from 'react'

export default function File() {
    useEffect(() => {
        const script = document.createElement("script");
        script.innerHTML = `CKFinder.widget('ckfinder-widget', {width: '100%', height: 700});`;
        script.async = true;
        document.body.appendChild(script);
    }, [])
    
    return (
        <div id="ckfinder-widget"></div>
    )
}