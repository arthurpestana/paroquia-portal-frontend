'use client'

import { List } from "@/components/adminComp/List"
import { ListContent } from "@/components/adminComp/List/ListContent"
import { ListText } from "@/components/adminComp/List/ListText"
import { NoContent } from "@/components/adminComp/NoContent"
import { PopupAlert } from "@/components/adminComp/Popup/PopupAlert"
import { ToggleButton } from "@/components/adminComp/ToggleButton"
import { Button } from "@/components/comp/Button"
import { LoadingComp } from "@/components/comp/LoadingComp"
import { deletePastoral, setActivePastoral } from "@/lib/apiServices/Mutations"
import { PastoralCountResponse } from "@/lib/types/QueriesTypes"
import { showToast } from "@/lib/utils/showToast"
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type PastoralListProps = {
    pageValue: number;
    setPageValue: (value: number) => void;
    rowsPerPage: number;
    dataPastorals?: {
        loading: boolean;
        error: string | null;
        pastorals: PastoralCountResponse
        refetch: () => void;
    };
}

export const PastoralList = ({ pageValue, setPageValue, rowsPerPage, dataPastorals }: PastoralListProps) => {
    const searchParams = useSearchParams();
    const [isOpenPopup, setIsOpenPopup] = useState<string | boolean>('')
    const [localData, setLocalData] = useState<PastoralCountResponse["pastorals"]>([]);

    useEffect(() => {
        if (dataPastorals?.pastorals?.pastorals) {
            setLocalData(dataPastorals.pastorals?.pastorals);
        }
    }, [dataPastorals?.pastorals?.pastorals])

    const handleEditItem = (id: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('id', id)
        params.set('sub', 'edit')
        window.history.pushState({}, '', `?${params.toString()}`)
    }

    const handleDeleteItem = async (id: string) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'pastoral-error', 'top-right', 'light')
            return
        }

        try {
            await deletePastoral(id)
            dataPastorals?.refetch()
            showToast('Pastoral deletado com sucesso.', 'success', 'pastoral-error', 'top-right', 'light')
        }
        catch (error) {
            console.error('Erro ao excluir o pastoral:', error)
            showToast('Erro ao excluir o pastoral.', 'error', 'pastoral-error', 'top-right', 'light')
            return
        }
    }

    const handleActiveItem = async (id: string, newActive: boolean) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'pastoral-error', 'top-right', 'light');
            return;
        }

        try {
            await setActivePastoral(id, newActive);

            setLocalData(prev =>
                prev.map(pastoral =>
                    pastoral._id === id ? { ...pastoral, isActive: newActive } : pastoral
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar o status do pastoral:', error);
            showToast('Erro ao atualizar o status do pastoral.', 'error', 'pastoral-error', 'top-right', 'light');
        }
    };

    return (
        <div>
            <PopupAlert
                title="Atenção"
                description="Você tem certeza que deseja excluir este pastoral? Essa ação não poderá ser desfeita."
                isOpen={!!isOpenPopup}
                setOpen={setIsOpenPopup}
                onSubmit={() => handleDeleteItem(isOpenPopup as string)}
                buttonLabel={{
                    confirm: 'Confirmar',
                    cancel: 'Cancelar'
                }}
            />
            {dataPastorals?.loading ? (
                <LoadingComp />
            ) : !dataPastorals?.pastorals || dataPastorals?.pastorals?.totalCount <= 0 ? (
                <NoContent
                    text="Nenhum pastoral encontrado"
                />
            ) : (
                <List
                    pageValue={pageValue}
                    setPageValue={setPageValue}
                    totalPages={Math.ceil(dataPastorals?.pastorals?.totalCount / rowsPerPage)}
                >
                    {localData?.map((pastoral, index) => (
                        <ListContent
                            key={pastoral._id || index}
                            index={index}
                            listHeader={true}
                            columns={[
                                {
                                    header: '#',
                                    data: <ListText text={index + 1 + pageValue * rowsPerPage} />,
                                    mini: true,
                                },
                                {
                                    header: 'Pastoral',
                                    data: (
                                        <ListText text={pastoral.title} />
                                    )
                                },
                                {
                                    header: 'Descrição',
                                    data: <ListText text={pastoral?.description || 'N/A'} />,
                                },
                                {
                                    header: 'Status',
                                    data: <ToggleButton value={pastoral?.isActive} onChange={() => handleActiveItem(pastoral?._id, !pastoral?.isActive)} />,
                                },
                                {
                                    header: 'Data de Cadastro',
                                    data: <ListText text={new Date(pastoral.createdAt).toLocaleDateString('pt-br') || 'N/A'} />,
                                },
                                {
                                    header: 'Opções',
                                    data: (
                                        <>
                                            <Button
                                                icon={<EditOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => handleEditItem(pastoral._id || '')}
                                            />
                                            <Button
                                                icon={<DeleteForeverOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => setIsOpenPopup(pastoral._id || '')}
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