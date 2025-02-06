'use client';

import { loginSchema } from '@/types/login-schema';
import React, { useState } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircleIcon, FaceFrownIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import { loginAction } from '@/server/actions/login-action';
import { toast } from 'sonner';

const AuthForm = () => {
    const [see, setSee] = useState(false);

    const { execute, status } = useAction(loginAction, {
        onSuccess: ({ data }) => {
            if (data) {
                if (data.ok) {
                    toast.success(`${data.msg}`,
                        {
                            classNames: {
                                toast: 'text-white bg-lime-600',
                                closeButton: 'bg-lime-600 text-red-700'
                            },
                            closeButton: true,
                            position: 'top-right',
                            // duration: Infinity,
                            icon: <CheckCircleIcon className='animate-bounce' />,
                            duration: 1000,
                        },
                    );
                    window.location.replace('/dashboard');
                }
                if (!data.ok) {
                    toast.error(`${data.msg}`,
                        {
                            classNames: {
                                toast: 'text-white bg-red-500',
                                closeButton: 'bg-red-500 text-red-700'
                            },
                            closeButton: true,
                            position: 'top-right',
                            // duration: Infinity,
                            icon: <FaceFrownIcon className='animate-bounce' />,
                            duration: 2000,
                        },
                    );
                }
            }
        },
        onError: ({ error }) => {
            console.log(error);
        }
    });

    const loginUser = (data) => {
        // console.log(data);
        execute(data);
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit(loginUser)}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            {...register('email', {
                                required: { value: true, message: 'El campo es obligatorio' },
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Entered value does not match email format"
                                }
                            })}
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                        />
                        {errors.email && <p className="text-red-500 mt-2 text-sm">{errors.email?.message}</p>}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                            Password
                        </label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-lime-400 hover:text-lime-300">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div className="mt-2 relative">
                        <input
                            {...register('password', {
                                required: true,
                                minLength: {
                                    value: 5,
                                    message: "min length is 5"
                                }
                            })}
                            id="password"
                            name="password"
                            type={see ? 'text' : 'password'}
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                        />
                        {errors.password && <p className="text-red-500 mt-2 text-sm">{errors.password?.message}😥</p>}
                        {see
                            ?

                            <LockOpenIcon
                                className='absolute right-2 top-[6px] cursor-pointer size-6 text-white'
                                onClick={() => setSee(state => !state)}
                            />
                            :
                            <LockClosedIcon
                                className='absolute right-2 top-[6px] cursor-pointer size-6 text-white'
                                onClick={() => setSee(state => !state)}
                            />
                        }
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={status === 'executing'}
                        className="flex w-full justify-center rounded-md bg-lime-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </>
    )
}

export default AuthForm