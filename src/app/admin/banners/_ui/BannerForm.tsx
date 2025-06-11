'use client'

import { PopupForm } from '@/components/adminComp/Popup/PopupForm';
import { useBannerById } from '@/hooks/useBannerById';
import { createBanner, createImage } from '@/lib/apiServices/Mutations';
import { showToast } from '@/lib/utils/showToast';
import React, { useState } from 'react';

type BannerFormProps = {
    id?: string;
    onClose?: () => void;
}

export const BannerForm = ({ id, onClose }: BannerFormProps) => {
    const { banner, loading, error } = useBannerById(id || '');
    console.log(banner, loading, error);

    const [formData, setFormData] = useState({
        title: banner?.title || '',
        description: banner?.description || '',
        imageFile: null as File | null,
        imageId: banner?.image,
        buttonInfo: {
            text: banner?.buttonInfo?.text || '',
            link: banner?.buttonInfo?.link || '',
        },
    })

    const handleCreateItem = async () => {
        const { title, description, imageFile, imageId, buttonInfo } = formData;

        if (!title || !description || (!imageFile && !imageId) || !buttonInfo.text || !buttonInfo.link) {
            showToast('Todos os campos são obrigatórios.', 'error', 'banner-error', 'top-right', 'light');
            return;
        }

        try {
            let uploadedImageId = imageId?._id;

            if (imageFile) {
                const uploaded = await createImage(imageFile, {
                    title: `${title}-banner-image`,
                });
                uploadedImageId = uploaded._id;
            }

            await createBanner({
                title: title,
                description: description,
                image: uploadedImageId,
                buttonInfo: {
                    text: buttonInfo.text,
                    link: buttonInfo.link,
                },
            });

            showToast('Banner criado com sucesso!', 'success', 'banner-success');
            if (onClose) onClose();
        } catch (error) {
            console.error('Erro ao criar o banner:', error);
            showToast('Erro ao criar o banner.', 'error', 'banner-error', 'top-right', 'light');
        }
    };


    const handleUpdateItem = async () => {
        setFormData({
            title: banner?.title || '',
            description: banner?.description || '',
            imageFile: null as File | null,
            imageId: banner?.image,
            buttonInfo: {
                text: banner?.buttonInfo?.text || '',
                link: banner?.buttonInfo?.link || '',
            }
        })
    }

    return (
        <PopupForm
            headerData={{
                title: id ? 'Editar Banner' : 'Criar Banner',
                description: `Preencha os campos abaixo para ${id ? 'editar' : 'criar'} um banner.`,
            }}
            fields={[
                // Here you would include your form fields, e.g.:
                // <TextField label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />,
                // <TextField label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />,
                // <TextField label="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />,
                // <TextField label="Button Text" value={formData.buttonInfo.text} onChange={(e) => setFormData({ ...formData, buttonInfo: { ...formData.buttonInfo, text: e.target.value } })} />,
                // <TextField label="Button Link" value={formData.buttonInfo.link} onChange={(e) => setFormData({ ...formData, buttonInfo: { ...formData.buttonInfo, link: e.target.value } })} />,
            ]}
            isOpen={true}
            setOpen={onClose || (() => null)}
            closeBtn={true}
            onSubmit={id ? handleUpdateItem : handleCreateItem}
        />
    );
}