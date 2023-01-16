const getState = ({ getStore, getActions, setStore }) => {
    return {
        store:{
            saludo : "buenos dias"
        },
        actions:{
            changeSaludo : ()=>{
                setStore({saludo:"Adios"})
            }
        }
    }
}
export default getState;