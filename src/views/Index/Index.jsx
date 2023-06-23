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
import axios from 'axios';
import { ContenedorProductos } from "./style/index";
// import { fetchBarcodeData } from "./barcodeReader.js";

/*const prod = {
    name: "Salchichas Ahumadas",
    price: 5,
    barCode: "1234567890987654",
    sku: "ADJADN22",
    image: "https://previews.123rf.com/images/vectoraa/vectoraa1609/vectoraa160901043/62453081-icono-de-carrito-de-compras-icono-de-vector-de-mejor-diseño-plano.jpg",
};*/

export default function Index() {
    const inputRef = useRef(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState("")

    async function buscar() {
        setError("");

        if (input.length < 9)
            alert("POR FAVOR INGRESE UN CÓDIGO DE BARRAS VÁLIDO");
        else {
            setLoading(true);
            setInput("");
            inputRef.current.focus();

            const headers = {
                "x-api-key": "9fzdtoY1qmnpytkexVh.-QMNhpnOrjwR",
                "x-access-token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhZnRlcmFjYWRlbXkuY29tIiwiYXVkIjoiYWZ0ZXJhY2FkZW15X3VzZXJzIiwic3ViIjoiNWYwZWFlN2E5OGMzZjQxMzc4MmRlZmIyIiwiaWF0IjoxNjg2NzgwNjg0LCJleHAiOjE2ODkzNzI2ODQsInBybSI6IjcwMTc2N2FjNzYzMzBmN2FkMDJiN2JlNzZiMTM4YWI0YjUwZTljZjJjMmI0MjUzN2MyZTQ2YTgxMjIzNGM0ZDM4NjA2MGM0OWQ5NmJlMGU0YWE2YTU4NDY2NTY2NDY1YmJmMDQ0NzgwNDAzYzlmZDQ1ZjMxNjVhZjQzZGE2MTEwIn0.Q6O7JLjgoIbOUAoDjNkSV4dyqrw8tYkakroBO9P5eKEHn1j03_4QNlm3yY8G2Mew9qbOCFRO8HTS811nxmXesQ",
                "x-user-id": "5f0eae7a98c3f413782defb2"
            };

            const url = `https://192.168.1.9:4005/v1/product/${input}/5f1378dcef2f752aeda16673`;
            // 00086876140910
            axios.get(url,
                { headers: headers })
                .then(res => {
                    setLoading(false);
                    if (res.status === 200) {
                        const resprod = res.data?.data?.prod;
                        if (resprod.length !== 1){
                            setProducto(resprod[0]);
                        } else {
                            setError('Producto no encontrado');
                        }
                    } else {
                        setError('Error al consultar el producto');
                    }
                }).catch(err => {
                    setError(err.message);
                    console.error(err)
                });
            setLoading(false);
            // Vaciar el estado después de 10 segundos
            setTimeout(() => {
                setError("");
                setProducto(null);
            }, 10000);
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
                                    <h3>{producto.title}</h3>
                                    <h4>
                                        <strong>Codigo de Barras:</strong>{" "}
                                        {producto.attrib?.barCode}
                                    </h4>
                                    <h4>
                                        <strong>SKU:</strong> {producto.attrib?.ref_int}
                                    </h4>

                                    <h4>
                                        <strong>Precio:</strong>{" "}
                                        {producto.price}$
                                    </h4>
                                    {/* <h4>
                                        <strong>Precio + IVA:</strong>{" "}
                                        {producto.price * 1.6}$
                                    </h4> */}
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
                                <p className="text-danger">
                                    <strong>
                                        {error}
                                    </strong>
                                </p>
                            </div>
                        )}
                    </Row>
                    <Row className='pt-3'>
                        <Col>
                            <InputGroup className='mb-3' size='lg'>
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
