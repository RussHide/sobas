import { useState } from "react"
import Modal from 'antd/es/modal'
import { Input, Option, Select } from '@material-tailwind/react'
import toast from "react-hot-toast";


const ModalAdd = ({ setOpenAdd, openAdd, fetchPedidos }) => {
  const [nuevoPedido, setNuevoPedido] = useState({
    cliente: '',
    fechaLlegada: '',
    fechaEntrega: '',
    modelo: '',
    falla: ''
  })

  const btnAgregarPedido = () => {

  }



  return (
    <Modal footer={[
      <div key={1} className="flex justify-around items-center p-3">
        <button
          onClick={() => setOpenAdd(prev => ({ ...prev, add: { open: false } }))}
          className="mr-1 bg-red-400 hover:bg-red-600 text-white px-8 md:px-14 py-2 rounded-xl ">
          <span>Cancelar</span>
        </button>
        <button className=" bg-green-400 hover:bg-green-600 text-white px-8 md:px-14 py-2 rounded-xl " onClick={btnAgregarPedido}>
          <span>Confirmar</span>
        </button>
      </div>
    ]} className="md:min-w-fit" open={openAdd.open} onOk={btnAgregarPedido} onCancel={() => setOpenAdd(prev = ({ ...prev, add: { open: false } }))}>
      <div className="flex flex-col items-center " >
        <h2 className="text-3xl font-semibold mb-2 text-center text-gray-800 ">Agregar pedido</h2>
        <div className="h-1 w-40 bg-blue-400 rounded  mb-4"></div>
      </div>
      <div>
        <div className="flex  justify-around items-center  w-full ">
          <div className="grid  grid-cols-1 md:grid-cols-3 gap-6 w-full  p-2">
            <div className="flex col-span-1 ">
              <Input label="Cliente" variant="outlined"  />
            </div>
            <div className="flex col-span-1">
              <Input label="" variant="outlined"  />
            </div>
            <div className="flex col-span-1">
              <Input label="Apellido materno" variant="outlined"  />
            </div>
            <div className="flex col-span-1">
              <Input label="modelo" variant="outlined"  />
            </div>
            <div className="flex col-span-1">
              <Input label="Falla" variant="outlined"  />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalAdd