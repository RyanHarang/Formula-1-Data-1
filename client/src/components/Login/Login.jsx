import logo from '../../assets/svg/profile/logo.svg';
import eye from '../../assets/svg/profile/eye.svg';
import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

// Zod schema for validation
const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema)
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <div className="relative w-full h-screen flex justify-center items-center">
            {/* background img */}
            <img className="absolute inset-0 w-full h-full object-cover" src="https://placehold.co/1593x1038" alt="Background" />
            {/* back button */}
            <button className="absolute top-4 left-4 text-white bg-black p-2 rounded hover:bg-gray-800" onClick={() => navigate('/')}>
                Back
            </button>
            {/* overlay */}
            <div className="relative z-10 w-[402px] h-[529px] p-6 bg-white/80 rounded-2xl border border-white backdrop-blur-sm flex-col justify-center items-center gap-[42px] inline-flex">
                {/* logo */}
                <img src={logo} alt="Logo" className="w-16 h-16" />

                <div className="self-stretch h-[69px] flex-col justify-start items-center gap-1 flex text-center">
                    <div className="text-center text-black text-[34px] font-bold font-['DM Sans']">Sign In</div>
                    <div className="self-stretch text-center text-[#110c2a] text-base font-normal font-['DM Sans']">Login or Create an Account</div>
                </div>
                <div className="self-stretch h-[188px] flex-col justify-start items-start gap-4 flex">
                    <div className="self-stretch h-[74px] flex-col justify-start items-start flex">
                        <div className="self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                            <label className="text-[#344053] text-sm font-medium font-['Inter'] leading-tight">Email</label>
                            <div className="self-stretch px-4 py-3 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#cfd4dc] justify-start items-center gap-2 inline-flex overflow-hidden">
                                <input type="email" className="grow shrink basis-0 text-[#667084] text-base font-normal font-['Inter'] leading-normal" placeholder="Email" {...register("email")} />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                    </div>
                    <form className="self-stretch h-[98px] flex-col justify-start items-end gap-2 flex" onSubmit={handleSubmit(onSubmit)}>
                        <div className="self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                            <label className="text-[#344053] text-sm font-medium font-['Inter'] leading-tight">Password</label>
                            <div className="self-stretch px-4 py-3 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#cfd4dc] justify-start items-center gap-2 inline-flex overflow-hidden">
                                <input type={showPassword ? "text" : "password"} className="grow shrink basis-0 text-[#667084] text-base font-normal font-['Inter'] leading-normal" placeholder="Password" {...register("password")} />
                                <div data-svg-wrapper className="relative cursor-pointer" onClick={togglePasswordVisibility}>
                                    <img src={eye} alt="eye" className='' />
                                </div>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>
                        <Link className="text-black text-xs font-normal font-['DM Sans']" to="/signup">Forget password ?</Link>
                        <div className="self-stretch justify-start items-start gap-3 inline-flex">
                            <button className="grow shrink basis-0 h-12 px-4 py-3 rounded-xl border border-black justify-center items-center gap-3 flex hover:cursor-pointer hover:bg-color" onClick={() => navigate('/signup')}>
                                <div className="text-black text-base font-medium font-['DM Sans']">Create Account</div>
                            </button>
                            <button type="submit" className="grow shrink basis-0 h-12 px-4 py-3 bg-black rounded-xl justify-center items-center gap-3 flex hover:cursor-pointer hover:bg-opacity-80">
                                <div className="text-white text-base font-medium font-['DM Sans']">Login</div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
