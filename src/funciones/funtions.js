export const formateNumber = (value) => {

    //FUNCION PARA FORMATEAR LA MONEDA

    const formatedNumber = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    }).format(value)

    return formatedNumber
}

