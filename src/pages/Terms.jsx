import React from 'react'
import terms from "../imgs/terms.png"


function Terms() {
  return (
    <div className='mt-32 w-full max-w-[1000px] mx-auto px-5 flex flex-col gap-5 '>
        <img src={terms} className="w-40"/>
        <h1 className='text-3xl font-medium'>Terms</h1>
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates blanditiis quae consectetur eaque nisi reiciendis, id deleniti porro optio consequuntur numquam fuga perferendis tenetur temporibus reprehenderit nobis dicta doloremque explicabo.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates blanditiis quae consectetur eaque nisi reiciendis, id deleniti porro optio consequuntur numquam fuga perferendis tenetur temporibus reprehenderit nobis dicta doloremque explicabo.
    </p>
    </div>
  )
}

export default Terms