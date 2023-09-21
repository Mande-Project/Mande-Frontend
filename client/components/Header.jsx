import React from 'react';

const Header = () => {

    const { nombre } = { nombre: "Nombre de Prueba" }

    return (
        <div className="flex justify-end mb-6">
            <p className="mr-2">Hola: {nombre}</p>
        </div>
    );
};

export default Header;
