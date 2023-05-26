import { useState, useEffect, createContext } from "react";
import axios from "axios";

const BebidasContext = createContext()

const BebidasProvider = ({children}) => {

    const [bebidaId, setBebidaId] = useState(null)
    const [bebidas, setBebidas] = useState([])
    const [modal, useModal] = useState(false)
    const [receta, setReceta] = useState({})
    const [cargando, setCargando] = useState(false)

    useEffect( () => {
        setCargando(true)
        const obtenerReceta = async () => {
            if(!bebidaId) {return}

            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
                const {data} = await axios(url)
                setReceta(data.drinks[0])
            } catch (error) {
                console.log(error)
            }finally{
                setCargando(false)
            }
        }
        obtenerReceta()
    }, [bebidaId])



    const consultarBebida =async datos =>{
        try {
           const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`
           const {data} = await axios(url) 
           setBebidas(data.drinks)

        } catch (error) {
            console.log(error);
        }
    }


    const handleModalClick = () => {
        useModal(!modal)
    }


    const handleBebidaIdClick = id => {
        setBebidaId(id)
    }


    return(
        <BebidasContext.Provider
            value={{
                consultarBebida,
                bebidas,
                handleModalClick,
                handleBebidaIdClick,
                modal,
                receta,
                cargando
            }}
        >
            {children}
        </BebidasContext.Provider>
    )

}

export {
    BebidasProvider
}

export default BebidasContext