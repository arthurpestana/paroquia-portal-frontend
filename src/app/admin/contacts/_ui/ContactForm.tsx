'use client'

import { PopupForm } from '@/components/adminComp/Popup/PopupForm';
import { TextInput } from '@/components/comp/TextInput';
import { createContact, updateContact } from '@/lib/apiServices/Mutations';
import { showToast, showToastPromise } from '@/lib/utils/showToast';
import React, { useEffect, useState } from 'react';
import { ContactType } from '@/lib/types/enums';
import { SelectDropdown } from '@/components/adminComp/SelectDropdown';
import { useContactById } from '@/hooks/useContactById';

type ContactFormProps = {
    id?: string;
    onClose?: () => void;
    refetch?: () => void;
}

export const ContactForm = ({ id, onClose, refetch }: ContactFormProps) => {
    const { contact, loading, error } = useContactById(id || '');
    console.log(contact, loading, error);

    const [formData, setFormData] = useState({
        value: '',
        isActive: true,
        type: ContactType.EMAIL as ContactType,
    });

    useEffect(() => {
        if (contact) {
            setFormData({
                value: contact.value || '',
                isActive: contact.isActive ?? true,
                type: contact.type || ContactType.EMAIL,
            });
        }
    }, [contact]);

    const handleSubmit = async () => {
        const { value, isActive, type } = formData;

        if (!value || !type) {
            showToast('Todos os campos são obrigatórios.', 'error', 'contact-error', 'top-right', 'light');
            return;
        }

        const mutationContact = async () => {
            const request = {
                value: value,
                isActive: isActive,
                type: type,
            }

            if (id) {
                return await updateContact(id, request);
            }

            return await createContact(request);

        }

        await showToastPromise({
            promise: mutationContact(),
            messages: {
                pending: id ? 'Atualizando contato...' : 'Criando contato...',
                success: id ? 'Contato atualizado com sucesso!' : 'Contato criado com sucesso!',
                error: 'Erro ao salvar o contato.',
            },
        });

        if (refetch) refetch();
        if (onClose) onClose();
    };

    return (
        <PopupForm
            headerData={{
                title: id ? 'Editar Contato' : 'Criar Contato',
                description: `Preencha os campos abaixo para ${id ? 'editar' : 'criar'} um contato.`,
            }}
            fields={[
                <TextInput
                    key="value"
                    label="Valor (e-mail, telefone etc)"
                    name="value"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    variant="floating"
                />,
                <SelectDropdown
                    key="type"
                    label="Tipo de Contato"
                    data={Object.values(ContactType)}
                    activeOption={formData.type}
                    setActiveOption={(val) => setFormData({ ...formData, type: val })}
                />
            ]}
            isOpen={true}
            setOpen={onClose || (() => null)}
            closeBtn={true}
            onSubmit={handleSubmit}
        />
    );
}