import Services from "../../components/Services/Services.tsx";
import {services} from "../../mocks/services.ts";

function ServicesPage() {
    return (
        <div>
            <Services services={services}>Услуги для бизнеса</Services>
        </div>
    );
}

export default ServicesPage;
