'use client'

import { Row } from '@/components/adminComp/Row';
import { PopupForm } from '@/components/adminComp/Popup/PopupForm';
import { TextInput } from '@/components/comp/TextInput';
import { createEvent, createImage, updateEvent } from '@/lib/apiServices/Mutations';
import { showToast, showToastPromise } from '@/lib/utils/showToast';
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/adminComp/Textarea';
import { FileUpload } from '@/components/adminComp/FileUpload';
import { useEventById } from '@/hooks/useEventById';
import { hhmmToMs, msToHHMM } from '@/lib/utils/stringUtils';

type EventFormProps = {
    id?: string;
    onClose?: () => void;
    refetch?: () => void;
}

export const EventForm = ({ id, onClose, refetch }: EventFormProps) => {
    const { event, loading, error } = useEventById(id || '');
    console.log(event, loading, error);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: null as number | null,
        startTime: null as number | null,
        endTime: null as number | null,
        isActive: true,
        imageFile: null as File | null,
        imageId: event?.image,
    });

    useEffect(() => {
        setFormData({
            title: event?.title || '',
            description: event?.description || '',
            location: event?.location || '',
            date: event?.date ? new Date(event.date).getTime() : null,
            startTime: event?.startTime ? event?.startTime : null,
            endTime: event?.endTime ? event?.startTime : null,
            isActive: event?.isActive ?? true,
            imageFile: null,
            imageId: event?.image,
        });
    }, [event])

    const validateForm = () => {
        const {
            title, description, location, date,
            startTime, endTime, imageFile, imageId
        } = formData;

        if (!title || !description || !location || !date || !startTime || !endTime || (!imageFile && !imageId)) {
            showToast('Todos os campos são obrigatórios.', 'error', 'event-error', 'top-right', 'light');
            return false;
        }

        return true;
    };

    const handleCreateItem = async () => {
        if (!validateForm()) return;

        const {
            title, description, location, date,
            startTime, endTime, isActive,
            imageFile, imageId
        } = formData;

        try {
            const createEventPromise = async () => {
                let uploadedImageId = imageId?._id;

                if (imageFile) {
                    const uploaded = await createImage(imageFile, {
                        title: `${title}-event-image`,
                    });
                    uploadedImageId = uploaded._id;
                }

                await createEvent({
                    title,
                    description,
                    location,
                    date: date ? new Date(date).getTime() : new Date().getTime(),
                    startTime: startTime ? startTime : undefined,
                    endTime: endTime ? endTime : undefined,
                    isActive,
                    image: uploadedImageId,
                });
            };

            await showToastPromise({
                promise: createEventPromise(),
                messages: {
                    pending: 'Criando evento...',
                    success: 'Evento criado com sucesso!',
                    error: 'Erro ao criar o evento.',
                }
            });

            refetch?.();
            onClose?.();
        } catch (error) {
            console.error('Erro ao criar o event:', error);
            showToast('Erro ao criar o event.', 'error', 'event-error', 'top-right', 'light');
        }
    };


    const handleUpdateItem = async () => {
        if (!validateForm()) return;

        const {
            title, description, location, date,
            startTime, endTime, isActive,
            imageFile, imageId
        } = formData;

        if (!id) {
            showToast('ID do event não encontrado.', 'error', 'event-error', 'top-right', 'light');
            return;
        }

        try {
            const updateEventPromise = async () => {
                let uploadedImageId = imageId?._id;

                if (imageFile) {
                    const uploaded = await createImage(imageFile, {
                        title: `${title}-event-image`,
                    });
                    uploadedImageId = uploaded._id;
                }

                await updateEvent(id, {
                    title,
                    description,
                    location,
                    date: new Date(date ?? '').getTime(),
                    startTime: startTime ? startTime : undefined,
                    endTime: endTime ? endTime : undefined,
                    isActive,
                    image: uploadedImageId,
                });
            };

            await showToastPromise({
                promise: updateEventPromise(),
                messages: {
                    pending: 'Atualizando event...',
                    success: 'Event atualizado com sucesso!',
                    error: 'Erro ao atualizar o event.',
                }
            });

            refetch?.();
            onClose?.();
        } catch (error) {
            console.error('Erro ao atualizar o event:', error);
            showToast('Erro ao atualizar o event.', 'error', 'event-error', 'top-right', 'light');
        }
    }

    return (
        <PopupForm
            headerData={{
                title: id ? 'Editar Event' : 'Criar Event',
                description: `Preencha os campos abaixo para ${id ? 'editar' : 'criar'} um evento.`,
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
                    placeholder="Digite a descrição do evento"
                    value={formData.description}
                    onChange={(value) => setFormData({ ...formData, description: value })}
                    tableInput={false}
                />,
                <TextInput
                    key="location"
                    label="Local"
                    name="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    variant="floating"
                />,
                <TextInput
                    key="date"
                    label="Data do Evento"
                    type="date"
                    value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                        const date = new Date(e.target.value);
                        date.setHours(0, 0, 0, 0);
                        setFormData({ ...formData, date: date.getTime() });
                    }}
                    variant="outlined"
                    name="date"
                />,
                <Row key="datetime">
                    <TextInput
                        label="Início"
                        type="time"
                        value={msToHHMM(formData.startTime ?? 0)}
                        onChange={(e) =>
                            setFormData({ ...formData, startTime: hhmmToMs(e.target.value) })
                        }
                        variant="outlined"
                        name="startTime"
                    />
                    <TextInput
                        label="Término"
                        type="time"
                        value={msToHHMM(formData.endTime ?? 0)}
                        onChange={(e) =>
                            setFormData({ ...formData, endTime: hhmmToMs(e.target.value) })
                        }
                        variant="outlined"
                        name="endTime"
                    />
                </Row>,
                <FileUpload
                    key="imageFile"
                    label="Imagem do Event"
                    accept="image/*"
                    value={formData.imageFile}
                    onChange={(file) => setFormData({ ...formData, imageFile: file as File })}
                />
            ]}
            isOpen={true}
            setOpen={onClose || (() => null)}
            closeBtn={true}
            onSubmit={id ? handleUpdateItem : handleCreateItem}
        />
    );
}