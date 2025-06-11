'use client'

import { PopupForm } from '@/components/adminComp/Popup/PopupForm';
import { TextInput } from '@/components/comp/TextInput';
import { createImage, updateImage } from '@/lib/apiServices/Mutations';
import { showToast, showToastPromise } from '@/lib/utils/showToast';
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/adminComp/Textarea';
import { FileUpload } from '@/components/adminComp/FileUpload';
import { useImageById } from '@/hooks/useImageById';

type ImageFormProps = {
    id?: string;
    onClose?: () => void;
    refetch?: () => void;
}

export const ImageForm = ({ id, onClose, refetch }: ImageFormProps) => {
    const { image, loading, error } = useImageById(id || '');
    console.log(image, loading, error);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        folder: '',
        imageFile: null as File | null,
    });

    useEffect(() => {
        setFormData({
            title: image?.title || '',
            description: image?.description || '',
            folder: image?.folder || '',
            imageFile: null,
        });
    }, [image])

    const validateForm = () => {
        const { title, imageFile } = formData;

        if (!title || (!imageFile && !id)) {
            showToast('Título e imagem são obrigatórios.', 'error', 'image-error', 'top-right', 'light');
            return false;
        }

        return true;
    };

    const handleCreateItem = async () => {
        if (!validateForm()) return;
        try {
            const createImagePromise = async () => {
                if (!formData.imageFile) throw new Error('Arquivo de imagem é obrigatório');

                await createImage(formData.imageFile, {
                    title: formData.title,
                });
            };

            await showToastPromise({
                promise: createImagePromise(),
                messages: {
                    pending: 'Enviando imagem...',
                    success: 'Imagem criada com sucesso!',
                    error: 'Erro ao criar imagem.',
                },
            });

            refetch?.();
            onClose?.();
        } catch (error) {
            console.error('Erro ao criar imagem:', error);
            showToast('Erro ao criar imagem.', 'error', 'image-error', 'top-right', 'light');
        }
    };


    const handleUpdateItem = async () => {
        if (!validateForm() || !id) return;

        try {
            const updateImagePromise = async () => {
                await updateImage(id, formData?.imageFile || null, {
                    title: formData.title,
                    description: formData.description,
                });
            };

            await showToastPromise({
                promise: updateImagePromise(),
                messages: {
                    pending: 'Atualizando imagem...',
                    success: 'Imagem atualizada com sucesso!',
                    error: 'Erro ao atualizar imagem.',
                },
            });

            refetch?.();
            onClose?.();
        } catch (error) {
            console.error('Erro ao atualizar imagem:', error);
            showToast('Erro ao atualizar imagem.', 'error', 'image-error', 'top-right', 'light');
        }
    };

    return (
        <PopupForm
            headerData={{
                title: id ? 'Editar Image' : 'Criar Image',
                description: `Preencha os campos abaixo para ${id ? 'editar' : 'criar'} um imageo.`,
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
                    placeholder="Digite a descrição da imagem"
                    value={formData.description}
                    onChange={(value) => setFormData({ ...formData, description: value })}
                    tableInput={false}
                />,
                <FileUpload
                    key="imageFile"
                    label="Imagem do Image"
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