import BilNoklerLanding from "./components/BilNoklerLanding";
import CarKeySearch from "./components/CarKeySearch";

export default function BilNokler() {
    return (
        <div>
            <BilNoklerLanding />
            <div id="services">
                <CarKeySearch />
            </div>
        </div>
    )
}