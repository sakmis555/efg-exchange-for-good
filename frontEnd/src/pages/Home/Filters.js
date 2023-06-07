import React from 'react'

function Filters({
    showFilters,
    setShowFilters,
    filters,
    setfilters,
}) {
  return (
    <div className='w-72 bg-primary'>
        <div className='flex justify-between p-2'>
            <h1 className='text-secondary text-xl'>Filters</h1>
            <i className="ri-close-circle-fill text-xl cursor-pointer"
                onClick={() => setShowFilters(!showFilters)}
            ></i>
        </div>
    </div>
  )
}

export default Filters
