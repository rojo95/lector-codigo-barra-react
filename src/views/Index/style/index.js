import styled from "styled-components";

const ContenedorProductos = styled.div`
    padding: 130px;
    transition: 0.3s;
    h3,
    h4 > strong {
        color: #7367f0;
    }
    h4 {
        color: #5e5873;
    }
    button {
        background: #7367f0;
        color: white;
    }
    button:hover {
        background: #867cec;
    }

    button:active {
        background: #6558f1 !important;
    }

    img {
        border-radius: 3px;
        border: solid 1px #ccc;
    }
    .empty {
        height: 200px;
    }

    @media screen and (max-width: 576px) {
        /* Estilos para pantallas de al menos 576px de ancho */
        padding: 0px;
        padding-top: 100px
      }
`;

export { ContenedorProductos };
