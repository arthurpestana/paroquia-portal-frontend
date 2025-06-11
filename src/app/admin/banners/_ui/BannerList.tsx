'use client'

import { List } from "@/components/adminComp/List"
import { ListContent } from "@/components/adminComp/List/ListContent"
import { ListText } from "@/components/adminComp/List/ListText"
import { NoContent } from "@/components/adminComp/NoContent"
import { PopupAlert } from "@/components/adminComp/Popup/PopupAlert"
import { ToggleButton } from "@/components/adminComp/ToggleButton"
import { Button } from "@/components/comp/Button"
import { LoadingComp } from "@/components/comp/LoadingComp"
import { deleteBanner, setActiveBanner } from "@/lib/apiServices/Mutations"
import { BannerCountResponse } from "@/lib/types/QueriesTypes"
import { showToast } from "@/lib/utils/showToast"
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type BannerListProps = {
    pageValue: number;
    setPageValue: (value: number) => void;
    rowsPerPage: number;
    dataBanners?: {
        loading: boolean;
        error: string | null;
        banners: BannerCountResponse
        refetch: () => void;
    };
}

export const BannerList = ({ pageValue, setPageValue, rowsPerPage, dataBanners }: BannerListProps) => {
    const searchParams = useSearchParams();
    const [isOpenPopup, setIsOpenPopup] = useState<string | boolean>('')
    const [localData, setLocalData] = useState<BannerCountResponse["banners"]>([]);

    useEffect(() => {
        if (dataBanners?.banners?.banners) {
            setLocalData(dataBanners.banners.banners);
        }
    }, [dataBanners?.banners?.banners])

    const handleEditItem = (id: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('id', id)
        params.set('sub', 'edit')
        window.history.pushState({}, '', `?${params.toString()}`)
    }

    const handleDeleteItem = async (id: string) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'banner-error', 'top-right', 'light')
            return
        }

        try {
            await deleteBanner(id)
            dataBanners?.refetch()
            showToast('Banner deletado com sucesso.', 'success', 'banner-error', 'top-right', 'light')
        }
        catch (error) {
            console.error('Erro ao excluir o banner:', error)
            showToast('Erro ao excluir o banner.', 'error', 'banner-error', 'top-right', 'light')
            return
        }
    }

    const handleActiveItem = async (id: string, newActive: boolean) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'banner-error', 'top-right', 'light');
            return;
        }

        try {
            await setActiveBanner(id, newActive);

            setLocalData(prev =>
                prev.map(banner =>
                    banner._id === id ? { ...banner, isActive: newActive } : banner
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar o status do banner:', error);
            showToast('Erro ao atualizar o status do banner.', 'error', 'banner-error', 'top-right', 'light');
        }
    };

    return (
        <div>
            <PopupAlert
                title="Atenção"
                description="Você tem certeza que deseja excluir este banner? Essa ação não poderá ser desfeita."
                isOpen={!!isOpenPopup}
                setOpen={setIsOpenPopup}
                onSubmit={() => handleDeleteItem(isOpenPopup as string)}
                buttonLabel={{
                    confirm: 'Confirmar',
                    cancel: 'Cancelar'
                }}
            />
            {dataBanners?.loading ? (
                <LoadingComp />
            ) : !dataBanners?.banners || dataBanners?.banners?.totalCount <= 0 ? (
                <NoContent
                    text="Nenhum banner encontrado"
                />
            ) : (
                <List
                    pageValue={pageValue}
                    setPageValue={setPageValue}
                    totalPages={Math.ceil(dataBanners?.banners?.totalCount / rowsPerPage)}
                >
                    {localData?.map((banner, index) => (
                        <ListContent
                            key={banner._id || index}
                            index={index}
                            listHeader={true}
                            columns={[
                                {
                                    header: '#',
                                    data: <ListText text={index + 1 + pageValue * rowsPerPage} />,
                                    mini: true,
                                },
                                {
                                    header: 'Título do Banner',
                                    data: (
                                        <ListText text={banner.title} />
                                    )
                                },
                                {
                                    header: 'Descrição',
                                    data: <ListText text={banner?.description || 'N/A'} />,
                                },
                                {
                                    header: 'Ordem',
                                    data: (
                                        <ListText text={banner.order || 0} />
                                    ),
                                },
                                {
                                    header: 'Status',
                                    data: <ToggleButton value={banner?.isActive} onChange={() => handleActiveItem(banner?._id, !banner?.isActive)} />,
                                },
                                {
                                    header: 'Data de Cadastro',
                                    data: <ListText text={new Date(banner.createdAt).toLocaleDateString('pt-br') || 'N/A'} />,
                                },
                                {
                                    header: 'Opções',
                                    data: (
                                        <>
                                            <Button
                                                icon={<EditOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => handleEditItem(banner._id || '')}
                                            />
                                            <Button
                                                icon={<DeleteForeverOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => setIsOpenPopup(banner._id || '')}
                                            />
                                        </>
                                    ),
                                    mini: true,
                                },
                            ]}
                        />
                    ))}
                </List>
            )}
        </div>
    )
}