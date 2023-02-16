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
            cambioEstadoAccion: async (estado, accion) => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const info = {
                    "id_estado": estado,
                    "id_accion": accion
                };
                try {
                    const response = await fetch("http://localhost:3245/estadoAccion", {
                        method: 'PUT',
                        headers: myHeaders,
                        body: JSON.stringify(info),
                        redirect: 'follow' 
                    });
                    const data = await response.json();
                    alert(JSON.stringify(data));
                } catch (error) {
                    console.error(error);
                }
            },
            limpiarEquipos: () => {
                setStore({ equipos: [] })
            },
            revisarEquipos: (id) => {
                const store = getStore();
                const equipos = [...store.equipos];
                equipos[id]['IdEstadoEquipo'] = 2;
                setStore({ ...store, equipos });
            }
        }
    }
}
export default getState;