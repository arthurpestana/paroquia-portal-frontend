'use client'

import { List } from "@/components/adminComp/List"
import { ListContent } from "@/components/adminComp/List/ListContent"
import { ListText } from "@/components/adminComp/List/ListText"
import { NoContent } from "@/components/adminComp/NoContent"
import { PopupAlert } from "@/components/adminComp/Popup/PopupAlert"
import { Button } from "@/components/comp/Button"
import { LoadingComp } from "@/components/comp/LoadingComp"
import { deleteImage } from "@/lib/apiServices/Mutations"
import { ImageCountResponse } from "@/lib/types/QueriesTypes"
import { showToast } from "@/lib/utils/showToast"
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type ImageListProps = {
    pageValue: number;
    setPageValue: (value: number) => void;
    rowsPerPage: number;
    dataImages?: {
        loading: boolean;
        error: string | null;
        images: ImageCountResponse
        refetch: () => void;
    };
}

export const ImageList = ({ pageValue, setPageValue, rowsPerPage, dataImages }: ImageListProps) => {
    const searchParams = useSearchParams();
    const [isOpenPopup, setIsOpenPopup] = useState<string | boolean>('')
    const [localData, setLocalData] = useState<ImageCountResponse["images"]>([]);

    useEffect(() => {
        if (dataImages?.images?.images) {
            setLocalData(dataImages.images?.images);
        }
    }, [dataImages?.images?.images])

    const handleEditItem = (id: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('id', id)
        params.set('sub', 'edit')
        window.history.pushState({}, '', `?${params.toString()}`)
    }

    const handleDeleteItem = async (id: string) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'image-error', 'top-right', 'light')
            return
        }

        try {
            await deleteImage(id)
            dataImages?.refetch()
            showToast('Image deletado com sucesso.', 'success', 'image-error', 'top-right', 'light')
        }
        catch (error) {
            console.error('Erro ao excluir o image:', error)
            showToast('Erro ao excluir o image.', 'error', 'image-error', 'top-right', 'light')
            return
        }
    }

    return (
        <div>
            <PopupAlert
                title="Atenção"
                description="Você tem certeza que deseja excluir este image? Essa ação não poderá ser desfeita."
                isOpen={!!isOpenPopup}
                setOpen={setIsOpenPopup}
                onSubmit={() => handleDeleteItem(isOpenPopup as string)}
                buttonLabel={{
                    confirm: 'Confirmar',
                    cancel: 'Cancelar'
                }}
            />
            {dataImages?.loading ? (
                <LoadingComp />
            ) : !dataImages?.images || dataImages?.images?.totalCount <= 0 ? (
                <NoContent
                    text="Nenhum image encontrado"
                />
            ) : (
                <List
                    pageValue={pageValue}
                    setPageValue={setPageValue}
                    totalPages={Math.ceil(dataImages?.images?.totalCount / rowsPerPage)}
                >
                    {localData?.map((image, index) => (
                        <ListContent
                            key={image._id || index}
                            index={index}
                            listHeader={true}
                            columns={[
                                {
                                    header: '#',
                                    data: <ListText text={index + 1 + pageValue * rowsPerPage} />,
                                    mini: true,
                                },
                                {
                                    header: 'Imagem',
                                    data: (
                                        <ListText text={image.title} />
                                    )
                                },
                                {
                                    header: 'Descrição',
                                    data: <ListText text={image?.description || 'N/A'} />,
                                },
                                {
                                    header: 'URL',
                                    data: (
                                        <ListText text={image.title} />
                                    )
                                },
                                {
                                    header: 'Data de Cadastro',
                                    data: <ListText text={new Date(image.createdAt).toLocaleDateString('pt-br') || 'N/A'} />,
                                },
                                {
                                    header: 'Opções',
                                    data: (
                                        <>
                                            <Button
                                                icon={<EditOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => handleEditItem(image._id || '')}
                                            />
                                            <Button
                                                icon={<DeleteForeverOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => setIsOpenPopup(image._id || '')}
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