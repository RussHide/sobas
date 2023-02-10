import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import RenglonTabla from './components/RenglonTabla'
import { FiltroFecha, FiltroTexto } from './components/Filters'
import ModalAdd from './components/ModalAdd'

function App() {
  const [pedidos, setPedidos] = useState([])
  const [pedidosFiltrados, setPedidosFiltrados] = useState([])
  const [cargando, setCargando] = useState(false)
  const [filtros, setFiltros] = useState({
    cliente: '',
    modelo: '',
    fechaLlegada: null,
    fechaEntrega: null,
    falla: '',
    modelo: ''
  })
  const [modals, setModals] = useState({
    add: { open: false },
    edit: { open: false },
    delete: { open: false }
  })

  const fetchPedidos = async () => {
    setCargando(true)
    try {
      const response = await fetch('http://localhost:3000/pedidos')
      const data = await response.json()
      setPedidos(data)
      setPedidosFiltrados(data)
    } catch (error) {
      console.log(error)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    fetchPedidos()
  }, [])

  useEffect(() => {
    /* if (filtros.cliente === 'x') {
      setFiltros(filtros => ({ ...filtros, cliente: '' }))
    }
    if (filtros.abrev === 'x') {
      setFiltros(filtros => ({ ...filtros, abrev: '' }))
    }
    if (filtros.semestre === 'x') {
      setFiltros(filtros => ({ ...filtros, semestre: '' }))
    }
    if (filtros.turno === 'x') {
      setFiltros(filtros => ({ ...filtros, turno: '' }))
    } */
    setPedidosFiltrados(pedidos.filter(pedido => {
      for (const [key, value] of Object.entries(filtros)) {
        if (value !== "" && !pedido[key].toLocaleLowerCase().includes(value.toLocaleLowerCase())) return false;
      }
      return true;
    }))
  }, [filtros])


  return (
    <div className='max-w-screen-2xl p-10 mx-auto '>
      <Toaster />
      {modals.add.open && <ModalAdd openAdd={modals.add} setOpenAdd={setModals} fetchPedidos={fetchPedidos} />}
      {/* {modals.edit.open && <ModalEdit openEdit={modals.edit} setOpenEdit={setModals} fetchPedidos={fetchPedidos} />}
      {modals.delete.open && <ModalDelete openDelete={modals.delete} setOpenDelete={setModals} fetchPedidos={fetchPedidos} texto='El pedido se elimno con exito' />} */}
      <div>
        <h2 className="text-3xl font-semibold mb-2  text-gray-800 ">Todos los Pedidos</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 mx-auto mb-5 place-items-center items-end ">
        <FiltroTexto label="Nombre" placeholder='Buscar por cliente' name='cliente' setFiltros={setFiltros} />
        <FiltroFecha setFiltros={setFiltros} fecha={filtros.fechaLlegada}  name="fechaLlegada"/>
        <FiltroTexto label="Modelo" placeholder='Buscar por modelo' name='modelo' setFiltros={setFiltros} />
        <FiltroTexto label="Falla" placeholder='Buscar por falla' name='falla' setFiltros={setFiltros} />
        <div className="w-full">
          <button onClick={() => setModals(prev => ({ ...prev, add: { open: true } }))} className="w-full bg-indigo-600 px-10 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Agregar pedido</button>
        </div>
      </div>
      {
        cargando ? (<div className='text-center mt-16 font-bold text-4xl h-96'>Cargando datos...</div>) : (
          <div className="overflow-y-auto  ">
            {
              pedidosFiltrados.length === 0 ? (<div className='text-center mt-16 font-bold text-4xl h-96'>No se encontraron pedidos</div>) :
                (
                  <div className=" w-full bg-gray-100 font-sans h-full  ">
                    <div className="w-full">
                      <div className="bg-white  rounded ">
                        <table className="min-w-max w-full table-auto">
                          <thead className="">
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal mb-10">
                              <th className="py-3 px-4 text-left">ID</th>
                              <th className="py-3 px-4 text-left">Cliente</th>
                              <th className="py-3 px-4 text-left">Fecha llegada</th>
                              <th className="py-3 px-4 text-left">Fecha entrega</th>
                              <th className="py-3 px-4 text-left">Modelo</th>
                              <th className="py-3 px-4 text-left">Falla</th>
                              <th className="py-3 px-4 text-center">Opciones</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600 text-sm font-light mt-10 ">
                            {
                              pedidosFiltrados.map(pedido => (
                                <tr key={pedido.id} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                                  <RenglonTabla texto={pedido.id} />
                                  <RenglonTabla texto={pedido.cliente} />
                                  <RenglonTabla texto={pedido.fechaLlegada} />
                                  <RenglonTabla texto={pedido.fechaEntrega} />
                                  <RenglonTabla texto={pedido.modelo} />
                                  <RenglonTabla texto={pedido.falla} />
                                  <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                      <div
                                        className="w-4 mr-2 transform hover:text-blue-500 cursor-pointer hover:scale-110">
                                        <button onClick={() => setOpenEdit(prev => ({ ...prev, open: true, alumno: alumno }))} />
                                      </div>
                                      <div
                                        className="w-4 mr-2 transform hover:text-red-500 cursor-pointer hover:scale-110">
                                        <button onClick={() => setOpenDelete(prev => ({ ...prev, open: true, claveBorrar: alumno.matricula }))} />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
          </div>
        )
      }
    </div>
  )
}

export default App
