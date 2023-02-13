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

const ModalEdit = ({ fetchPedidos, openEdit, setModals }) => {
  const btnEdit = async () => {
    const validarCampos = Object.values(openEdit.alumno).every(
      value => value !== ''
    )
    if (!validarCampos) {
      toast.error('Debes llenar todos los datos', { position: 'top-right', duration: 2500 })
    } else {
      try {
        await axios.put('http://localhost:3000/' + openEdit.key)
        fetchPedidos()
        setModals(prev => ({ ...prev, edit: { open: false, pedido: {} } }))
        toast.success('El pedido fue actualizado con exito', { position: 'top-right', duration: 2500 })
      } catch (error) {
        toast.error('Hubo un error interno', { position: 'top-right', duration: 2500 })
      }
    }
  }

  return (
    <Modal footer={[
      <div key={2} className="flex justify-around items-center my-2 p-4">
        <button
          onClick={() => setModals(prev => ({ ...prev, edit: {open: false, pedido: {}} }))}
          className="mr-1 bg-red-400 hover:bg-red-600 text-white px-8 md:px-14 py-1 rounded-xl ">
          <span>Cancelar</span>
        </button>
        <button className='bg-green-400 hover:bg-green-600 text-white px-8 md:px-14 py-1 rounded-xl ' onClick={btnEdit}>
          <span>Confirmar</span>
        </button>
      </div>
    ]} className="md:min-w-fit" open={openEdit.open} onOk={btnEdit} onCancel={() => setModals(prev => ({ ...prev, edit: {open:false , pedido: {}} }))}>
     <div className="flex flex-col items-center " >
        <h2 className="text-3xl font-semibold mb-2 text-center text-gray-800 ">Editar pedido</h2>
        <div className="h-1 w-40 bg-blue-400 rounded  mb-4"></div>
      </div>
      <div>
        <div className="flex  justify-around items-center  w-full ">
          <div className="grid  grid-cols-1 md:grid-cols-3 gap-6 w-full  p-2">
            <div className="w-full col-span-1">
              <label className="text-gray-800 font-semibold px-1">Cliente</label>
              <Input placeholder="" value={openEdit.pedido.cliente} onChange={e => setModals({ ...prev, edit: {...prev.edit, pedido: {...prev.edit.pedido, cliente: e.target.value}} })} />
            </div>
            <div className="flex col-span-1">
              <DatePicker
                className='max-w-20'
                selected={Date.parse(openEdit.pedido.fechaLlegada)}
                dateFormat="dd-MM-yyyy"
                locale="es"
                onChange={(date) => setModals({ ...prev, edit: {...prev.edit, pedido: {...prev.edit.pedido, fechaLlegada: date}} })}
                customInput={<CustomDatePicker placeholer='Seleccionar fecha' label="Fecha" />}
              />
            </div>
            <div className="flex col-span-1">
              <DatePicker
                className='max-w-20'
                selected={Date.parse(openEdit.pedido.fechaEntrega)}
                dateFormat="dd-MM-yyyy"
                locale="es"
                onChange={(date) => setModals({ ...prev, edit: {...prev.edit, pedido: {...prev.edit.pedido, fechaEntrega: date}} })}
                customInput={<CustomDatePicker placeholer='Seleccionar fecha' label="Fecha" />}
              />
            </div>
            <div className="w-full col-span-1">
              <label className="text-gray-800 font-semibold px-1">Precio piezas</label>
              <Input placeholder="" value={openEdit.pedido.piezas} onChange={e => setModals(prev => ({ ...prev, edit: {...prev.edit, pedido: {...prev.edit.pedido, piezas: e.target.value}} }))} />
            </div>
            <div className="w-full col-span-1">
              <label className="text-gray-800 font-semibold px-1">Precio reparacion</label>
              <Input placeholder="" value={openEdit.pedido.reparacion} onChange={e => setModals({ ...prev, edit: {...prev.edit, pedido: {...prev.edit.pedido, piezas: e.reparacion.value}} })}/>
            </div>
            <div className="w-full col-span-1">
              <label className="text-gray-800 font-semibold px-1">Modelo</label>
              <Input placeholder="" value={openEdit.pedido.modelo} onChange={e => setModals({ ...prev, edit: {...prev.edit, pedido: {...prev.edit.pedido, piezas: e.modelo.value}} })} />
            </div>
            <div className="w-full col-span-1">
              <label className="text-gray-800 font-semibold px-1">Falla</label>
              <Input placeholder="" value={openEdit.pedido.falla} onChange={e => setModals({ ...prev, edit: {...prev.edit, pedido: {...prev.edit.pedido, piezas: e.falla.value}} })} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalEdit


