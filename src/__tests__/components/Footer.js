import Footer from '../../components/Footer';
import { shallow } from 'enzyme';

describe("Cuando se inicia la aplicación", ()=>{
    it("Debería cargar los derechos reservados", ()=>{
        const wrapper = shallow( <Footer /> )
        const derechos = wrapper.find("p").props().children
        const textoEsperado = "© Todos los derechos reservados - Brian Vanegas 2021."
        expect(derechos).toEqual(textoEsperado)
    })
})