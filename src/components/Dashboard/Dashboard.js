import React from 'react'
import TravelerView from './Traveler/TravelerView'
import KidsConnexView from './KidsConnex/KidsConnexView'
import AdminView from './Admin/AdminView'
import NearestAirport from '../Trips/NearestAirport'

export default function Dashboard(props) {
    return (

        <>
            <NearestAirport />
            <TravelerView />
            <KidsConnexView />
            <AdminView />

        </>
    )
}