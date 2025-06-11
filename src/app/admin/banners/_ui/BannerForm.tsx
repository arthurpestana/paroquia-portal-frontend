'use client'

import { Row } from '@/components/adminComp/Row';
import { PopupForm } from '@/components/adminComp/Popup/PopupForm';
import { TextInput } from '@/components/comp/TextInput';
import { useBannerById } from '@/hooks/useBannerById';
import { createBanner, createImage, updateBanner } from '@/lib/apiServices/Mutations';
import { showToast, showToastPromise } from '@/lib/utils/showToast';
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/adminComp/Textarea';
import { FileUpload } from '@/components/adminComp/FileUpload';

type BannerFormProps = {
    id?: string;
    onClose?: () => void;
    refetch?: () => void;
}

export const BannerForm = ({ id, onClose, refetch }: BannerFormProps) => {
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

    useEffect(() => {
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
    }, [banner])

    console.log('Form Data:', formData);

    const handleCreateItem = async () => {
        const { title, description, imageFile, imageId, buttonInfo } = formData;

        if (!title || !description || (!imageFile && !imageId) || !buttonInfo.text || !buttonInfo.link) {
            showToast('Todos os campos são obrigatórios.', 'error', 'banner-error', 'top-right', 'light');
            return;
        }

        try {
            const createBannerPromise = async () => {
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
                })
            }

            await showToastPromise({
                promise: createBannerPromise(),
                messages: {
                    pending: 'Criando banner...',
                    success: 'Banner criado com sucesso!',
                    error: 'Erro ao criar o banner.',
                }
            })

            if (refetch) refetch();
            if (onClose) onClose();
        } catch (error) {
            console.error('Erro ao criar o banner:', error);
            showToast('Erro ao criar o banner.', 'error', 'banner-error', 'top-right', 'light');
        }
    };


    const handleUpdateItem = async () => {
        const { title, description, imageFile, imageId, buttonInfo } = formData;

        if (!id) {
            showToast('ID do banner não encontrado.', 'error', 'banner-error', 'top-right', 'light');
            return;
        }

        if (!title || !description || (!imageFile && !imageId) || !buttonInfo.text || !buttonInfo.link) {
            showToast('Todos os campos são obrigatórios.', 'error', 'banner-error', 'top-right', 'light');
            return;
        }

        try {
            const updateBannerPromise = async () => {
                let uploadedImageId = imageId?._id;

                if (imageFile) {
                    const uploaded = await createImage(imageFile, {
                        title: `${title}-banner-image`,
                    });
                    uploadedImageId = uploaded._id;
                }

                await updateBanner(id, {
                    title: title,
                    description: description,
                    image: uploadedImageId,
                    buttonInfo: {
                        text: buttonInfo.text,
                        link: buttonInfo.link,
                    },
                })
            }

            await showToastPromise({
                promise: updateBannerPromise(),
                messages: {
                    pending: 'Atualizando banner...',
                    success: 'Banner atualizado com sucesso!',
                    error: 'Erro ao atualizar o banner.',
                }
            })

            if (refetch) refetch();
            if (onClose) onClose();
        } catch (error) {
            console.error('Erro ao criar o banner:', error);
            showToast('Erro ao criar o banner.', 'error', 'banner-error', 'top-right', 'light');
        }
    }

    return (
        <PopupForm
            headerData={{
                title: id ? 'Editar Banner' : 'Criar Banner',
                description: `Preencha os campos abaixo para ${id ? 'editar' : 'criar'} um banner.`,
            }}
            fields={[
                <TextInput
                    key={'title'}
                    label="Título"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    variant='floating'
                />,
                <Textarea
                    key={'description'}
                    label="Descrição"
                    placeholder="Digite a descrição do banner"
                    value={formData.description}
                    onChange={(value) => setFormData({ ...formData, description: value })}
                    tableInput={false}
                />,
                <Row key={'buttonInfo'}>
                    <TextInput
                        key={'buttonText'}
                        label="Texto do Botão"
                        name="buttonText"
                        value={formData.buttonInfo.text}
                        onChange={(e) => setFormData({
                            ...formData, buttonInfo: {
                                ...formData.buttonInfo,
                                text: e.target.value
                            }
                        })}
                        required
                        variant='floating'
                    />
                    <TextInput
                        key={'buttonLink'}
                        label="Link do Botão"
                        name="buttonLink"
                        value={formData.buttonInfo.link}
                        onChange={(e) => setFormData({
                            ...formData, buttonInfo: {
                                ...formData.buttonInfo,
                                link: e.target.value
                            }
                        })}
                        required
                        variant='floating'
                    />
                </Row>,
                <FileUpload
                    key="imageFile"
                    label="Imagem do Banner"
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