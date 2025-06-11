'use client';

import { loginUser } from "@/lib/apiServices/Mutations";
import { LoginRequest } from "@/lib/types/MutationsTypes";
import { isAdminToken } from "@/lib/utils/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { showToast } from "@/lib/utils/showToast";
import { MainContent } from "@/components/structure/MainContent";
import { Form } from "@/components/comp/Form";
import styles from './styles.module.scss'
import { Button } from "@/components/comp/Button";
import { TextInput } from "@/components/comp/TextInput";
import { LabelIcon } from "@/components/comp/LabelIcon";
import { AlternateEmailOutlined, LockOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

export default function AuthPage() {
    const router = useRouter();
    const [formState, setFormState] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const checkAuth = (): boolean => {
        if (!formState.email || !formState.password) {
            showToast(
                'Por favor, preencha todos os campos.',
                'error',
                'LoginError',
                'top-right',
                'light'
            );
            return true;
        }

        if (!formState.email.includes('@')) {
            showToast(
                'Por favor, insira um email válido.',
                'error',
                'LoginError',
                'top-right',
                'light'
            );
            return true;
        }

        if (formState.password.length < 6) {
            showToast(
                'A senha deve ter pelo menos 6 caracteres.',
                'error',
                'LoginError',
                'top-right',
                'light'
            );
            return true;
        }

        return false;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const check = checkAuth();
        if (check) return;

        try {
            const { token, user } = await loginUser({
                email: formState.email,
                password: formState.password,
            });

            Cookies.set('user', JSON.stringify(user), { expires: 1 });
            Cookies.set('auth_token', token, { expires: 1 });

            const isAdmin = isAdminToken();
            if (isAdmin) {
                router.push('/admin');
            }
            else {
                router.push('/dashboard');
            }

        } catch {
            showToast(
                'Erro ao fazer login. Verifique suas credenciais e tente novamente.',
                'error',
                'LoginError',
                'top-right',
                'light'
            )
        }
    };
    

    return (
        <MainContent>
            <div className={styles.auth__container}>
                <Form className={styles.auth__container__form} onSubmit={handleLogin}>
                    <Link className={styles.auth__container__form__header} href={"/home"}>
                        <Image width={100} height={100} src={"/images/paroquia-logo.png"} alt="Logo - Paroquia" />
                    </Link>
                    <div className={styles.auth__container__form__body}>
                        <div className={styles.auth__container__form__body__title}>
                            <h1>Login</h1>
                            <p>Faça login para acessar sua conta administrativa da plataforma</p>
                        </div>
                        <div className={styles.auth__container__form__body__inputs}>
                            <TextInput
                                name="email"
                                label={<LabelIcon
                                    label="Email"
                                    icon={<AlternateEmailOutlined />}
                                    iconPosition="left"
                                />}
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                variant="floating"
                                type="email"
                            />
                            <TextInput
                                name="password"
                                label={<LabelIcon
                                    label="Senha"
                                    icon={<LockOutlined />}
                                    iconPosition="left"
                                />}
                                value={formState.password}
                                onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                                variant="floating"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className={styles.auth__container__form__footer}>
                        <Button
                            type="submit"
                            label="Login"
                            variant="contained"
                        />
                    </div>
                </Form>
            </div>
        </MainContent>
    );
}