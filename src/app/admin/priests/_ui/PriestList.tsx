'use client'

import { List } from "@/components/adminComp/List"
import { ListContent } from "@/components/adminComp/List/ListContent"
import { ListText } from "@/components/adminComp/List/ListText"
import { NoContent } from "@/components/adminComp/NoContent"
import { PopupAlert } from "@/components/adminComp/Popup/PopupAlert"
import { ToggleButton } from "@/components/adminComp/ToggleButton"
import { Button } from "@/components/comp/Button"
import { LoadingComp } from "@/components/comp/LoadingComp"
import { deletePriest, setActivePriest } from "@/lib/apiServices/Mutations"
import { PriestCountResponse } from "@/lib/types/QueriesTypes"
import { showToast } from "@/lib/utils/showToast"
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type PriestListProps = {
    pageValue: number;
    setPageValue: (value: number) => void;
    rowsPerPage: number;
    dataPriests?: {
        loading: boolean;
        error: string | null;
        priests: PriestCountResponse
        refetch: () => void;
    };
}

export const PriestList = ({ pageValue, setPageValue, rowsPerPage, dataPriests }: PriestListProps) => {
    const searchParams = useSearchParams();
    const [isOpenPopup, setIsOpenPopup] = useState<string | boolean>('')
    const [localData, setLocalData] = useState<PriestCountResponse["priests"]>([]);

    useEffect(() => {
        if (dataPriests?.priests?.priests) {
            setLocalData(dataPriests.priests?.priests);
        }
    }, [dataPriests?.priests?.priests])

    const handleEditItem = (id: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('id', id)
        params.set('sub', 'edit')
        window.history.pushState({}, '', `?${params.toString()}`)
    }

    const handleDeleteItem = async (id: string) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'priest-error', 'top-right', 'light')
            return
        }

        try {
            await deletePriest(id)
            dataPriests?.refetch()
            showToast('Priest deletado com sucesso.', 'success', 'priest-error', 'top-right', 'light')
        }
        catch (error) {
            console.error('Erro ao excluir o priest:', error)
            showToast('Erro ao excluir o priest.', 'error', 'priest-error', 'top-right', 'light')
            return
        }
    }

    const handleActiveItem = async (id: string, newActive: boolean) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'priest-error', 'top-right', 'light');
            return;
        }

        try {
            await setActivePriest(id, newActive);

            setLocalData(prev =>
                prev.map(priest =>
                    priest._id === id ? { ...priest, isActive: newActive } : priest
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar o status do priest:', error);
            showToast('Erro ao atualizar o status do priest.', 'error', 'priest-error', 'top-right', 'light');
        }
    };

    return (
        <div>
            <PopupAlert
                title="Atenção"
                description="Você tem certeza que deseja excluir este fréi? Essa ação não poderá ser desfeita."
                isOpen={!!isOpenPopup}
                setOpen={setIsOpenPopup}
                onSubmit={() => handleDeleteItem(isOpenPopup as string)}
                buttonLabel={{
                    confirm: 'Confirmar',
                    cancel: 'Cancelar'
                }}
            />
            {dataPriests?.loading ? (
                <LoadingComp />
            ) : !dataPriests?.priests || dataPriests?.priests?.totalCount <= 0 ? (
                <NoContent
                    text="Nenhum priest encontrado"
                />
            ) : (
                <List
                    pageValue={pageValue}
                    setPageValue={setPageValue}
                    totalPages={Math.ceil(dataPriests?.priests?.totalCount / rowsPerPage)}
                >
                    {localData?.map((priest, index) => (
                        <ListContent
                            key={priest._id || index}
                            index={index}
                            listHeader={true}
                            columns={[
                                {
                                    header: '#',
                                    data: <ListText text={index + 1 + pageValue * rowsPerPage} />,
                                    mini: true,
                                },
                                {
                                    header: 'Priesto',
                                    data: (
                                        <ListText text={priest?.name} />
                                    )
                                },
                                {
                                    header: 'Origem',
                                    data: <ListText text={priest?.origin || 'N/A'} />,
                                },
                                {
                                    header: 'Funções',
                                    data: <ListText text={priest?.function?.length >= 1 ? priest?.function?.map((func) => `${func}, `) : 'N/A'} />,
                                },
                                {
                                    header: 'Ordem',
                                    data: <ListText text={priest?.order || 0} />,
                                },
                                {
                                    header: 'Status',
                                    data: <ToggleButton value={priest?.isActive} onChange={() => handleActiveItem(priest?._id, !priest?.isActive)} />,
                                },
                                {
                                    header: 'Data de Cadastro',
                                    data: <ListText text={new Date(priest.createdAt).toLocaleDateString('pt-br') || 'N/A'} />,
                                },
                                {
                                    header: 'Opções',
                                    data: (
                                        <>
                                            <Button
                                                icon={<EditOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => handleEditItem(priest._id || '')}
                                            />
                                            <Button
                                                icon={<DeleteForeverOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => setIsOpenPopup(priest._id || '')}
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