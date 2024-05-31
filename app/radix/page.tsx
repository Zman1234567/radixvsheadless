'use client'
import * as Dialog from '@radix-ui/react-dialog'
import React, { FormEvent, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Spinner } from './spinner'

let user = { name: '', location: '' }
const Radix = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>
                    <button className='bg-green-500 text-white cursor-pointer rounded px-4 py-2 outline-none hover:bg-green-600/80'>Dialog</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className='fixed inset-0 bg-black/50' />
                    <Dialog.Content className='bg-white fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-screen max-w-md rounded p-8'>
                        <div className="flex justify-between">
                            <Dialog.Title>
                                This is a test for a dialog
                            </Dialog.Title>
                            <Dialog.Close>
                                <Cross2Icon className='text-gray-500 hover:text-gray-700' />
                            </Dialog.Close>
                        </div>
                        <div className='mt-8'><UserForm onSubmit={() => setOpen(false)} /></div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}
function delay(t: number) {
    return new Promise(resolve => setTimeout(resolve, t));
}
const UserForm: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
    const [submitting, setSubmitting] = useState(false)
    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const obj = Object.fromEntries(new FormData(e.currentTarget))
        user.name = obj.name as string
        user.location = obj.location as string
        setSubmitting(true)
        await delay(1000)
        onSubmit()
    }
    return (
        <form onSubmit={(e) => submitHandler(e)}>
            <fieldset disabled={submitting} className='flex flex-col space-y-4 group' >
                <div className='flex flex-col space-y-2'>
                    <label htmlFor='name'>Name: </label>
                    <input name='name' id="name" defaultValue={user.name} className='border-gray-300 group-disabled:hover:border-gray-300 shadow border focus:border-2 hover:border-gray-400 focus:border-blue-400 outline-none rounded-md px-2 py-1' />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor='location'>Location: </label>
                    <input name='location' id="location" defaultValue={user.location} className='border-gray-300 group-disabled:hover:border-gray-300 shadow border focus:border-2 hover:border-gray-400 focus:border-blue-400 outline-none rounded-md px-2 py-1' />
                </div>
                <div className='w-full flex justify-end'>
                    <Dialog.Close>
                        <button className='group-disabled:pointer-events-none text-gray-500 cursor-pointer rounded px-4 py-2 outline-none hover:text-gray-600'>Close</button>
                    </Dialog.Close>
                    <button type="submit" className='bg-green-500 group-disabled:pointer-events-none text-white cursor-pointer rounded px-4 py-2 outline-none hover:bg-green-600/80'>
                        <Spinner className='group-enabled:hidden' />
                        <span className='group-disabled:hidden'>Save</span>
                    </button>
                </div>
            </fieldset>
        </form>
    )
}

export default Radix