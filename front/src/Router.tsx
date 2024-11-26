import { Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { History } from './pages/History'
import { DefaultLayout } from './layouts/DefaultLayout'
import { RideOptions } from './pages/RideOptions'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/ride-options" element={<RideOptions />} />
                <Route path="/history" element={<History />} />
            </Route>
        </Routes>
    )
}
