import { forwardRef, useEffect, useState } from "react"
import Modal from 'antd/es/modal'
import Input from 'antd/es/input/Input'
import toast from "react-hot-toast";
import axios from 'axios';

import DatePicker, { registerLocale } from "react-datepicker"
import { CalendarIcon } from '@heroicons/react/24/solid'
import "react-datepicker/dist/react-datepicker.css"
import es from 'date-fns/locale/es'
registerLocale('es', es)



const CustomDatePicker = forwardRef(({ value, onClick, placeholer = '', label = '' }, ref) => (
  <div>
    <label htmlFor="" className="text-gray-800 font-semibold px-1 mr-4">{label}</label>

    <button className='inline-flex w-full justify-between p-1 px-2  rounded-lg bg-white border border-gray-300 hover:border-blue-200 transition-colors duration-150 items-center ' onClick={onClick} ref={ref}>
      <p className="flex justify-end text-gray-900">
        {!value ? placeholer : value}
      </p>
      <CalendarIcon className='h-5 ml-6  text-gray-300' />
    </button>
  </div>
))

const ModalAdd = ({ setOpenAdd, openAdd, fetchPedidos }) => {
  const [nuevoPedido, setNuevoPedido] = useState({
    cliente: '',
    fechaLlegada: '',
    fechaEntrega: '',
    modelo: '',
    piezas: 0,
    reparacion: 0,
    falla: ''
  })

  const btnAgregarPedido = async () => {
    try {
      nuevoPedido.fechaLlegada = nuevoPedido.fechaLlegada.toLocaleDateString('sv')
      nuevoPedido.fechaEntrega = nuevoPedido.fechaEntrega.toLocaleDateString('sv')
      const response = await axios.post('http://localhost:3000/pedidos', nuevoPedido)
      if (response.statusText === 201) {
          toast.success('Se creo un nuevo registro con exito', { position: 'top-right', duration: 2500 })
      }
    } catch (error) {
      toast.error('Hubo un error al crear el registro', { position: 'top-right', duration: 2500 })
    }finally{
      setOpenAdd(prev => ({ ...prev, add: { open: false } }))
      fetchPedidos()
    }
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
    ]} className="md:min-w-fit" open={openAdd.open} onOk={btnAgregarPedido} onCancel={() => setOpenAdd(prev => ({ ...prev, add: { open: false } }))}>
      <div className="flex flex-col items-center " >
        <h2 className="text-3xl font-semibold mb-2 text-center text-gray-800 ">Agregar pedido</h2>
        <div className="h-1 w-40 bg-blue-400 rounded  mb-4"></div>
      </div>
      <div>
        <div className="flex  justify-around items-center  w-full ">
          <div className="grid  grid-cols-1 md:grid-cols-3 gap-6 w-full  p-2">
            <div className="w-full col-span-1">
              <label className="text-gray-800 font-semibold px-1">Cliente</label>
              <Input placeholder="" onChange={e => setNuevoPedido(prev => ({ ...prev, cliente: e.target.value }))} />
            </div>
            <div className="flex col-span-1">
              <DatePicker
                className='max-w-20'
                selected={nuevoPedido.fechaLlegada}
                dateFormat="dd-MM-yyyy"
                locale="es"
                onChange={(date) => setNuevoPedido(prev => ({ ...prev, fechaLlegada: date }))}
                customInput={<CustomDatePicker placeholer='Seleccionar fecha' label="Fecha" />}
              />
            </div>
            <div className="flex col-span-1">
              <DatePicker
                className='max-w-20'
                selected={nuevoPedido.fechaEntrega}
                dateFormat="dd-MM-yyyy"
                locale="es"
                onChange={(date) => setNuevoPedido(prev => ({ ...prev, fechaEntrega: date }))}
                customInput={<CustomDatePicker placeholer='Seleccionar fecha' label="Fecha" />}
              />
            </div>
            <div className="w-full col-span-1">
              <label className="text-gray-800 font-semibold px-1">Precio piezas</label>
              <Input placeholder="" onChange={e => setNuevoPedido(prev => ({ ...prev, piezas: e.target.value }))} />
            </div>
            <div className="w-full col-span-1">
              <label className="text-gray-800 font-semibold px-1">Precio reparacion</label>
              <Input placeholder="" onChange={e => setNuevoPedido(prev => ({ ...prev, reparacion: e.target.value }))} />
            </div>
            <div className="w-full col-span-1">
              <label className="text-gray-800 font-semibold px-1">Modelo</label>
              <Input placeholder="" onChange={e => setNuevoPedido(prev => ({ ...prev, modelo: e.target.value }))} />
            </div>
            <div className="w-full col-span-1">
              <label className="text-gray-800 font-semibold px-1">Falla</label>
              <Input placeholder="" onChange={e => setNuevoPedido(prev => ({ ...prev, falla: e.target.value }))} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalAdd