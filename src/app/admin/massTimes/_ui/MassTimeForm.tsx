'use client'

import { PopupForm } from '@/components/adminComp/Popup/PopupForm';
import { TextInput } from '@/components/comp/TextInput';
import { createMassTime, updateMassTime } from '@/lib/apiServices/Mutations';
import { showToast, showToastPromise } from '@/lib/utils/showToast';
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/adminComp/Textarea';
import { hhmmToMs, msToHHMM } from '@/lib/utils/stringUtils';
import { useMassTimeById } from '@/hooks/useMassTimeById';
import { Weekday } from '@/lib/types/enums';
import { SelectDropdown } from '@/components/adminComp/SelectDropdown';

type MassTimeFormProps = {
    id?: string;
    onClose?: () => void;
    refetch?: () => void;
}

export const MassTimeForm = ({ id, onClose, refetch }: MassTimeFormProps) => {
    const { massTime, loading, error } = useMassTimeById(id || '');
    console.log(massTime, loading, error);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startTime: null as number | null,
        weekday: Weekday.SEGUNDA as Weekday,
        isActive: true,
    });

    useEffect(() => {
        setFormData({
            title: massTime?.title || '',
            description: massTime?.description || '',
            weekday: massTime?.weekday || Weekday.SEGUNDA,
            startTime: massTime?.startTime ? massTime?.startTime : null,
            isActive: massTime?.isActive ?? true,
        });
    }, [massTime])

    const validateForm = () => {
        const {
            title, description, weekday, isActive, startTime,
        } = formData;

        if (!title || !description || !location || !weekday || !startTime || !isActive) {
            showToast('Todos os campos são obrigatórios.', 'error', 'massTime-error', 'top-right', 'light');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const { title, description, weekday, isActive, startTime, } = formData;

        const mutationMassTime = async () => {
            const request = {
                title: title,
                description: description,
                startTime: startTime ? startTime : 0,
                weekday: weekday,
                isActive: isActive,
            }

            if (id) {
                return await updateMassTime(id, request);
            }

            return await createMassTime(request);

        }

        await showToastPromise({
            promise: mutationMassTime(),
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
                title: id ? 'Editar MassTime' : 'Criar MassTime',
                description: `Preencha os campos abaixo para ${id ? 'editar' : 'criar'} um massTimeo.`,
            }}
            fields={[
                <TextInput
                    key="title"
                    label="Título"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    variant="floating"
                />,
                <Textarea
                    key="description"
                    label="Descrição"
                    placeholder="Digite a descrição do massTimeo"
                    value={formData.description}
                    onChange={(value) => setFormData({ ...formData, description: value })}
                    tableInput={false}
                />,
                <SelectDropdown
                    key="type"
                    label="Tipo de Contato"
                    data={Object.values(Weekday)}
                    activeOption={formData.weekday}
                    setActiveOption={(val) => setFormData({ ...formData, weekday: val })}
                />,
                <TextInput
                    key="datetime"
                    label="Início"
                    type="time"
                    value={msToHHMM(formData.startTime ?? 0)}
                    onChange={(e) =>
                        setFormData({ ...formData, startTime: hhmmToMs(e.target.value) })
                    }
                    variant="outlined"
                    name="startTime"
                />
            ]}
            isOpen={true}
            setOpen={onClose || (() => null)}
            closeBtn={true}
            onSubmit={handleSubmit}
        />
    );
}