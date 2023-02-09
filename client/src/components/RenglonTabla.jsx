import React from 'react'

const RenglonTabla = ({texto, masClases=''}) => {
  return (
    <td className={`py-3 px-6 text-left ${masClases}`}>
            <div className="flex items-center">
                <span>{texto}</span>
            </div>
        </td>
  )
}

export default RenglonTabla