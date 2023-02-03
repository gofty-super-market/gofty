import React from 'react'
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyIcon from '@mui/icons-material/Key';
export default function EmailCode() {
    return (
        <div className='mt-12 h-[90vh] md:h-[70vh] flex flex-col gap-8 justify-center items-center'>
            <KeyIcon sx={{ fontSize: 150 }} className='text-3xl text-gray-700'/>
            <h3>enter the code in your email</h3>
            <div className='flex flex-row'>
                
                <PinInput  manageFocus={true} type='alphanumeric' className="flex gap-5 ">
                    <PinInputField className='mx-2 w-16 border rounded-xl h-16 p-3 flex items-center justify-center text-center text-xl ' />
                    <PinInputField className='mx-2 w-16 border rounded-xl h-16 p-3 flex items-center justify-center text-center text-xl ' />
                    <PinInputField className='mx-2 w-16 border rounded-xl h-16 p-3 flex items-center justify-center text-center text-xl ' />
                    <PinInputField className='mx-2 w-16 border rounded-xl h-16 p-3 flex items-center justify-center text-center text-xl ' />
                </PinInput>
            </div>
                <button className="button bg-prime text-white py-2 px-4 flex gap-2 justify-center items-center">check it <ArrowForwardIcon/></button>
        </div>
    )
}
