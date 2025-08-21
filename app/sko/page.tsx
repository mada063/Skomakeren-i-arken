import SkoLanding from "./components/SkoLanding";
import ShoeService from "./components/ShoeService";

export default function Sko() {
    return (
        <div>
            <SkoLanding />
            <div id="services">
                <ShoeService />
            </div>
        </div>
    )
}