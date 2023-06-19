import { useState, useRef } from "react";
import {
    Container,
    Row,
    Col,
    InputGroup,
    Form,
    Button,
    Image,
    Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ContenedorProductos } from "./style/index";

const prod = {
    name: "Salchichas Ahumadas",
    price: 5,
    barCode: "1234567890987654",
    sku: "ADJADN22",
    image: "https://previews.123rf.com/images/vectoraa/vectoraa1609/vectoraa160901043/62453081-icono-de-carrito-de-compras-icono-de-vector-de-mejor-diseño-plano.jpg",
};

export default function Index() {
    const inputRef = useRef(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [producto, setProducto] = useState(null);

    function buscar() {
        if (input.length < 9)
            alert("POR FAVOR INGRESE UN CÓDIGO DE BARRAS VÁLIDO");
        else {
            setLoading(true);
            inputRef.current.focus();
            setTimeout(() => {
                setInput("");
                setLoading(false);
                setProducto(prod);
                // Vaciar el estado después de 8 segundos
                setTimeout(() => {
                    setProducto(null);
                }, 8000);
            }, 2000);
        }
    }

    function action(e) {
        if ((e.keyCode === 13 || e.keyCode === 9) && !loading) buscar();
    }

    return (
        <div className='contenido'>
            <ContenedorProductos>
                <Container>
                    <Row>
                        {producto ? (
                            <>
                                <Col
                                    xs={12}
                                    lg={4}
                                    xl={3}
                                    className='text-center'
                                >
                                    <Image
                                        src={producto.image}
                                        width={200}
                                        height={200}
                                    />
                                </Col>
                                <Col>
                                    <h3>{producto.name}</h3>
                                    <h4>
                                        <strong>Codigo de Barras:</strong>{" "}
                                        {producto.barCode}
                                    </h4>
                                    <h4>
                                        <strong>SKU:</strong> {producto.sku}
                                    </h4>

                                    <h4>
                                        <strong>Precio:</strong>{" "}
                                        {producto.price}$
                                    </h4>
                                    <h4>
                                        <strong>Precio + IVA:</strong>{" "}
                                        {producto.price * 1.6}$
                                    </h4>
                                </Col>
                            </>
                        ) : (
                            <div className='empty'>
                                {loading && (
                                    <Col className='d-flex justify-content-center'>
                                        <Spinner
                                            animation='grow'
                                            size='xl'
                                            style={{ color: "#7367f0" }}
                                        />
                                    </Col>
                                )}
                            </div>
                        )}
                    </Row>
                    <Row className='pt-3'>
                        <Col>
                            <InputGroup className='mb-3' size='lg'>
                                {/* <input name="q" value="" placeholder="Buscar APK" required="" aria-label="Name" className="ainput awesomplete" type="search" autocomplete="off" autocapitalize="none" aria-expanded="false" aria-owns="awesomplete_list_2" role="combobox" /> */}
                                <Form.Control
                                    autoFocus
                                    placeholder='Código de Barras'
                                    aria-label='Código de Barras'
                                    aria-describedby='basic-addon2'
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => action(e)}
                                    ref={inputRef}
                                />
                                <Button
                                    variant='outline-secondary'
                                    id='button-addon2'
                                    onClick={buscar}
                                    disabled={loading}
                                >
                                    Busca
                                    {loading ? (
                                        <>
                                            ndo{" "}
                                            <Spinner
                                                animation='border'
                                                size='sm'
                                            />
                                        </>
                                    ) : (
                                        <>
                                            r{" "}
                                            <FontAwesomeIcon
                                                icon={faMagnifyingGlass}
                                            />
                                        </>
                                    )}
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
            </ContenedorProductos>
        </div>
    );
}
