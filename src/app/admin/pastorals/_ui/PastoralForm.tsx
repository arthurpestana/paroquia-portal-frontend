'use client'

import { PopupForm } from '@/components/adminComp/Popup/PopupForm';
import { TextInput } from '@/components/comp/TextInput';
import { createPastoral, createImage, updatePastoral } from '@/lib/apiServices/Mutations';
import { showToast, showToastPromise } from '@/lib/utils/showToast';
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/adminComp/Textarea';
import { FileUpload } from '@/components/adminComp/FileUpload';
import { usePastoralById } from '@/hooks/usePastoralById';

type PastoralFormProps = {
    id?: string;
    onClose?: () => void;
    refetch?: () => void;
}

export const PastoralForm = ({ id, onClose, refetch }: PastoralFormProps) => {
    const { pastoral, loading, error } = usePastoralById(id || '');
    console.log(pastoral, loading, error);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        isActive: true,
        imageFile: null as File | null,
        imageId: pastoral?.image,
    });

    useEffect(() => {
        setFormData({
            title: pastoral?.title || '',
            description: pastoral?.description || '',
            isActive: pastoral?.isActive ?? true,
            imageFile: null,
            imageId: pastoral?.image,
        });
    }, [pastoral])

    const validateForm = () => {
        const { title, description, imageFile, imageId } = formData;

        if (!title || !description || (!imageFile && !imageId)) {
            showToast('Título, descrição e imagem são obrigatórios.', 'error', 'pastoral-error', 'top-right', 'light');
            return false;
        }

        return true;
    };

    const handleCreateItem = async () => {
        if (!validateForm()) return;

        const {
            title, description, isActive,
            imageFile, imageId
        } = formData;

        try {
            const createPastoralPromise = async () => {
                let uploadedImageId = imageId?._id;

                if (imageFile) {
                    const uploaded = await createImage(imageFile, {
                        title: `${title}-pastoral-image`,
                    });
                    uploadedImageId = uploaded._id;
                }

                await createPastoral({
                    title,
                    description,
                    isActive,
                    image: uploadedImageId,
                });
            };

            await showToastPromise({
                promise: createPastoralPromise(),
                messages: {
                    pending: 'Criando pastoralo...',
                    success: 'Pastoralo criado com sucesso!',
                    error: 'Erro ao criar o pastoralo.',
                }
            });

            refetch?.();
            onClose?.();
        } catch (error) {
            console.error('Erro ao criar o pastoral:', error);
            showToast('Erro ao criar o pastoral.', 'error', 'pastoral-error', 'top-right', 'light');
        }
    };


    const handleUpdateItem = async () => {
        if (!validateForm()) return;

        const {
            title, description, isActive,
            imageFile, imageId
        } = formData;

        if (!id) {
            showToast('ID do pastoral não encontrado.', 'error', 'pastoral-error', 'top-right', 'light');
            return;
        }

        try {
            const updatePastoralPromise = async () => {
                let uploadedImageId = imageId?._id;

                if (imageFile) {
                    const uploaded = await createImage(imageFile, {
                        title: `${title}-pastoral-image`,
                    });
                    uploadedImageId = uploaded._id;
                }

                await updatePastoral(id, {
                    title,
                    description,
                    isActive,
                    image: uploadedImageId,
                });
            };

            await showToastPromise({
                promise: updatePastoralPromise(),
                messages: {
                    pending: 'Atualizando pastoral...',
                    success: 'Pastoral atualizado com sucesso!',
                    error: 'Erro ao atualizar o pastoral.',
                }
            });

            refetch?.();
            onClose?.();
        } catch (error) {
            console.error('Erro ao atualizar o pastoral:', error);
            showToast('Erro ao atualizar o pastoral.', 'error', 'pastoral-error', 'top-right', 'light');
        }
    }

    return (
        <PopupForm
            headerData={{
                title: id ? 'Editar Pastoral' : 'Criar Pastoral',
                description: `Preencha os campos abaixo para ${id ? 'editar' : 'criar'} um pastoralo.`,
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
                    placeholder="Digite a descrição do pastoralo"
                    value={formData.description}
                    onChange={(value) => setFormData({ ...formData, description: value })}
                    tableInput={false}
                />,
                <FileUpload
                    key="imageFile"
                    label="Imagem do Pastoral"
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