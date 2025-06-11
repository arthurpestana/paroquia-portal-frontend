'use client'

import { PopupForm } from '@/components/adminComp/Popup/PopupForm';
import { TextInput } from '@/components/comp/TextInput';
import { createPriest, createImage, updatePriest } from '@/lib/apiServices/Mutations';
import { showToast, showToastPromise } from '@/lib/utils/showToast';
import React, { useEffect, useState } from 'react';
import { FileUpload } from '@/components/adminComp/FileUpload';
import { usePriestById } from '@/hooks/usePriestById';

type PriestFormProps = {
    id?: string;
    onClose?: () => void;
    refetch?: () => void;
}

export const PriestForm = ({ id, onClose, refetch }: PriestFormProps) => {
    const { priest, loading, error } = usePriestById(id || '');
    console.log(priest, loading, error);

    const [formData, setFormData] = useState({
        name: '',
        origin: '',
        functions: [''],
        isActive: true,
        imageFile: null as File | null,
        imageId: priest?.image,
    });

    useEffect(() => {
        setFormData({
            name: priest?.name || '',
            origin: priest?.origin || '',
            functions: priest?.function || [''],
            isActive: priest?.isActive ?? true,
            imageFile: null,
            imageId: priest?.image,
        });
    }, [priest])

    const validateForm = () => {
        const {
            name, origin, imageFile, imageId
        } = formData;

        if (!name || !origin || (!imageFile && !imageId)) {
            showToast('Todos os campos são obrigatórios.', 'error', 'priest-error', 'top-right', 'light');
            return false;
        }

        return true;
    };

    const handleCreateItem = async () => {
        if (!validateForm()) return;

        const {
            name, origin, isActive,
            imageFile, imageId, functions
        } = formData;

        try {
            const createPriestPromise = async () => {
                let uploadedImageId = imageId?._id;

                if (imageFile) {
                    const uploaded = await createImage(imageFile, {
                        title: `${name}-priest-image`,
                    });
                    uploadedImageId = uploaded._id;
                }

                await createPriest({
                    name,
                    origin,
                    function: functions,
                    isActive,
                    image: uploadedImageId,
                });
            };

            await showToastPromise({
                promise: createPriestPromise(),
                messages: {
                    pending: 'Criando priesto...',
                    success: 'Priesto criado com sucesso!',
                    error: 'Erro ao criar o priesto.',
                }
            });

            refetch?.();
            onClose?.();
        } catch (error) {
            console.error('Erro ao criar o priest:', error);
            showToast('Erro ao criar o priest.', 'error', 'priest-error', 'top-right', 'light');
        }
    };


    const handleUpdateItem = async () => {
        if (!validateForm()) return;

        const {
            name, origin, functions, isActive,
            imageFile, imageId
        } = formData;

        if (!id) {
            showToast('ID do priest não encontrado.', 'error', 'priest-error', 'top-right', 'light');
            return;
        }

        try {
            const updatePriestPromise = async () => {
                let uploadedImageId = imageId?._id;

                if (imageFile) {
                    const uploaded = await createImage(imageFile, {
                        title: `${name}-priest-image`,
                    });
                    uploadedImageId = uploaded._id;
                }

                await updatePriest(id, {
                    name,
                    origin,
                    function: functions,
                    isActive,
                    image: uploadedImageId,
                });
            };

            await showToastPromise({
                promise: updatePriestPromise(),
                messages: {
                    pending: 'Atualizando priest...',
                    success: 'Priest atualizado com sucesso!',
                    error: 'Erro ao atualizar o priest.',
                }
            });

            refetch?.();
            onClose?.();
        } catch (error) {
            console.error('Erro ao atualizar o priest:', error);
            showToast('Erro ao atualizar o priest.', 'error', 'priest-error', 'top-right', 'light');
        }
    }

    return (
        <PopupForm
            headerData={{
                title: id ? 'Editar Priest' : 'Criar Priest',
                description: `Preencha os campos abaixo para ${id ? 'editar' : 'criar'} um priesto.`,
            }}
            fields={[
                <TextInput
                    key="name"
                    label="Nome do Fréi"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    variant="floating"
                />,
                <TextInput
                    key="origin"
                    label="Origem do Fréi"
                    name="orgin"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    required
                    variant="floating"
                />,
                <FileUpload
                    key="imageFile"
                    label="Imagem do Priest"
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