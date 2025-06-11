'use client'

import { List } from "@/components/adminComp/List"
import { ListContent } from "@/components/adminComp/List/ListContent"
import { ListText } from "@/components/adminComp/List/ListText"
import { NoContent } from "@/components/adminComp/NoContent"
import { PopupAlert } from "@/components/adminComp/Popup/PopupAlert"
import { ToggleButton } from "@/components/adminComp/ToggleButton"
import { Button } from "@/components/comp/Button"
import { LoadingComp } from "@/components/comp/LoadingComp"
import { useBanners } from "@/hooks/useBanners"
import { useUpdatePageInUrl } from "@/hooks/useUpdatePageInUrl"
import { deleteBanner } from "@/lib/apiServices/Mutations"
import { showToast } from "@/lib/utils/showToast"
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const BannerList = () => {
    const rowsPerPage = 10
    const searchParams = useSearchParams()
    const updatePageInUrl = useUpdatePageInUrl()

    const initialPage = Math.max(0, Number(searchParams.get('page')))
    const [pageValue, setPageValue] = useState<number>(initialPage)

    const [isOpenPopup, setIsOpenPopup] = useState<string | boolean>('')

    const { banners, loading, error } = useBanners()
    console.log(banners, loading, error)

    useEffect(() => {
        if (pageValue < 0) {
            setPageValue(0)
        } else {
            updatePageInUrl(pageValue)
        }
    }, [pageValue, updatePageInUrl])

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
            showToast('Banner deletado com sucesso.', 'error', 'banner-error', 'top-right', 'light')
        }
        catch (error) {
            console.error('Erro ao excluir o banner:', error)
            showToast('Erro ao excluir o banner.', 'error', 'banner-error', 'top-right', 'light')
            return
        }
    }

    return (
        <div>
            <PopupAlert
                title="Atenção"
                description="Você tem certeza que deseja excluir este banner?"
                message="Essa ação não poderá ser desfeita."
                isOpen={!!isOpenPopup}
                setOpen={setIsOpenPopup}
                onSubmit={() => handleDeleteItem(isOpenPopup as string)}
                buttonLabel="Confirmar Exclusão"
            />
            {loading ? (
                <LoadingComp />
            ) : !banners || banners?.totalCount <= 0 ? (
                <NoContent
                    text="Nenhum banner encontrado"
                />
            ) : (
                <List
                    pageValue={pageValue}
                    setPageValue={setPageValue}
                    totalPages={Math.ceil(banners?.totalCount / rowsPerPage)}
                >
                    {banners?.banners?.map((banner, index) => (
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
                                    data: <ToggleButton value={banner?.isActive} onChange={() => {}} />,
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