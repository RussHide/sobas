import DatePicker, { registerLocale } from "react-datepicker"
import { CalendarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import "react-datepicker/dist/react-datepicker.css"
import es from 'date-fns/locale/es'
import Input from 'antd/es/input/Input'
import Select from 'antd/es/select'
import { forwardRef } from "react"
import Radio from 'antd/es/radio'
const { Option } = Select
registerLocale('es', es)


export const FiltroTexto = ({ setFiltros, label = '', placeholder = '', name }) => {
    return (
        <div className="w-full col-span-1">
            <label className="text-gray-800 font-semibold px-1">{label}</label>
            <Input placeholder={placeholder} onChange={e => setFiltros(prev => ({ ...prev, [name]: e.target.value }))} />
        </div>
    )
}

const CustomDatePicker = forwardRef(({ value, onClick, placeholer = '', label = '' }, ref) => (
    <div>
        <div>
            <label htmlFor="" className="text-gray-800 font-semibold px-1 mr-4">{label}</label>
            <Radio.Group >
                <Radio value={0}>Llegada</Radio>
                <Radio value={1}>Entrega</Radio>
            </Radio.Group>
        </div>
        <button className='inline-flex w-full justify-between p-1 px-2  rounded-lg bg-white border border-gray-300 hover:border-blue-200 transition-colors duration-150 items-center ' onClick={onClick} ref={ref}>
            <p className="flex justify-end text-gray-300 font-thin">
                {!value ? placeholer : value}
            </p>
            <CalendarIcon className='h-5 ml-6  text-gray-300' />
        </button>
    </div>
))

export const FiltroFecha = ({ setFiltros, fecha, name }) => {
    return (
        <div className='col-span-1 w-full'>
            <DatePicker
                className='max-w-20'
                selected={Date.parse(fecha)}
                dateFormat="dd-MM-yyyy"
                locale="es"
                onChange={(date) => setFiltros(prev => ({ ...prev, [name]: date.toLocaleDateString('sv') }))}
                customInput={<CustomDatePicker placeholer='Seleccionar fecha' label="Fecha" />}
            />
        </div>
    )
}