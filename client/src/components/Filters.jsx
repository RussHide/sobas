import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import es from 'date-fns/locale/es'
import Input from 'antd/es/input/Input'
import Select from 'antd/es/select';
const { Option } = Select;
registerLocale('es', es)


export const FiltroTexto = ({ setFiltros, label = '', placeholder = '', name }) => {
    return (
        <div className="w-full col-span-1">
            <label className="text-gray-800 font-semibold px-1">{label}</label>
            <Input placeholder={placeholder} onChange={e => setFiltros(prev => ({ ...prev, [name]: e.target.value }))} />
        </div>
    )
}