import BilNoklerLanding from "./components/BilNoklerLanding";
import CarKeyService from "./components/CarKeyService";

export default function BilNokler() {
    return (
        <div>
            <BilNoklerLanding />
            <div id="services">
                <CarKeyService />
            </div>
        </div>
    )
}