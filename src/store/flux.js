const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            acciones: [],
            equipos: []
        },
        actions: {
            getAcciones: async () => {
                setStore({ acciones: [] })
                try {
                    const responseAcciones = await fetch("http://10.14.11.20:3245/acciones");
                    const jsonAcciones = await responseAcciones.json();
                    setStore({ acciones: jsonAcciones });
                } catch (error) {
                    console.error(error);
                    setStore({ acciones: [] })
                }
            },
            getEquipos: async (numAccion) => {
                setStore({ equipos: [] })
                try {
                    const responseEquipos = await fetch(`http://10.14.11.20:3245/equipos/${numAccion}`);
                    const jsonEquipos = await responseEquipos.json();
                    setStore({ equipos: jsonEquipos });
                } catch (error) {
                    console.error(error);
                    setStore({ equipos: [] })
                }
            },
            limpiarEquipos: () =>
                setStore({ equipos: [] })
        }
    }
}
export default getState;