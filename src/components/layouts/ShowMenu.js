import React from 'react'
import useHelper from '../../common'

export default function ShowMenu({toTop = true, displayMenu = false}) {
    const {goToTop, showMenu} = useHelper()
    setTimeout(() => goToTop(toTop), 500)
    if (displayMenu)
        showMenu()
    return null
}