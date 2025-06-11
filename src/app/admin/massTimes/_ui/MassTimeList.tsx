'use client'

import { List } from "@/components/adminComp/List"
import { ListContent } from "@/components/adminComp/List/ListContent"
import { ListText } from "@/components/adminComp/List/ListText"
import { NoContent } from "@/components/adminComp/NoContent"
import { PopupAlert } from "@/components/adminComp/Popup/PopupAlert"
import { ToggleButton } from "@/components/adminComp/ToggleButton"
import { Button } from "@/components/comp/Button"
import { LoadingComp } from "@/components/comp/LoadingComp"
import { deleteMassTime, setActiveMassTime } from "@/lib/apiServices/Mutations"
import { MassTimeCountResponse } from "@/lib/types/QueriesTypes"
import { showToast } from "@/lib/utils/showToast"
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type MassTimeListProps = {
    pageValue: number;
    setPageValue: (value: number) => void;
    rowsPerPage: number;
    dataMassTimes?: {
        loading: boolean;
        error: string | null;
        massTimes: MassTimeCountResponse
        refetch: () => void;
    };
}

export const MassTimeList = ({ pageValue, setPageValue, rowsPerPage, dataMassTimes }: MassTimeListProps) => {
    const searchParams = useSearchParams();
    const [isOpenPopup, setIsOpenPopup] = useState<string | boolean>('')
    const [localData, setLocalData] = useState<MassTimeCountResponse["massTimes"]>([]);

    useEffect(() => {
        if (dataMassTimes?.massTimes?.massTimes) {
            setLocalData(dataMassTimes.massTimes?.massTimes);
        }
    }, [dataMassTimes?.massTimes?.massTimes])

    const handleEditItem = (id: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('id', id)
        params.set('sub', 'edit')
        window.history.pushState({}, '', `?${params.toString()}`)
    }

    const handleDeleteItem = async (id: string) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'massTime-error', 'top-right', 'light')
            return
        }

        try {
            await deleteMassTime(id)
            dataMassTimes?.refetch()
            showToast('MassTime deletado com sucesso.', 'success', 'massTime-error', 'top-right', 'light')
        }
        catch (error) {
            console.error('Erro ao excluir o massTime:', error)
            showToast('Erro ao excluir o massTime.', 'error', 'massTime-error', 'top-right', 'light')
            return
        }
    }

    const handleActiveItem = async (id: string, newActive: boolean) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'massTime-error', 'top-right', 'light');
            return;
        }

        try {
            await setActiveMassTime(id, newActive);

            setLocalData(prev =>
                prev.map(massTime =>
                    massTime._id === id ? { ...massTime, isActive: newActive } : massTime
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar o status do massTime:', error);
            showToast('Erro ao atualizar o status do massTime.', 'error', 'massTime-error', 'top-right', 'light');
        }
    };

    return (
        <div>
            <PopupAlert
                title="Atenção"
                description="Você tem certeza que deseja excluir este massTime? Essa ação não poderá ser desfeita."
                isOpen={!!isOpenPopup}
                setOpen={setIsOpenPopup}
                onSubmit={() => handleDeleteItem(isOpenPopup as string)}
                buttonLabel={{
                    confirm: 'Confirmar',
                    cancel: 'Cancelar'
                }}
            />
            {dataMassTimes?.loading ? (
                <LoadingComp />
            ) : !dataMassTimes?.massTimes || dataMassTimes?.massTimes?.totalCount <= 0 ? (
                <NoContent
                    text="Nenhum massTime encontrado"
                />
            ) : (
                <List
                    pageValue={pageValue}
                    setPageValue={setPageValue}
                    totalPages={Math.ceil(dataMassTimes?.massTimes?.totalCount / rowsPerPage)}
                >
                    {localData?.map((massTime, index) => (
                        <ListContent
                            key={massTime._id || index}
                            index={index}
                            listHeader={true}
                            columns={[
                                {
                                    header: '#',
                                    data: <ListText text={index + 1 + pageValue * rowsPerPage} />,
                                    mini: true,
                                },
                                {
                                    header: 'Title',
                                    data: (
                                        <ListText text={massTime?.title} />
                                    )
                                },
                                {
                                    header: 'Descrição',
                                    data: <ListText text={massTime?.description || 'N/A'} />,
                                },
                                {
                                    header: 'Dia da Semana',
                                    data: <ListText text={massTime?.weekday || 'N/A'} />,
                                },
                                {
                                    header: 'Status',
                                    data: <ToggleButton value={massTime?.isActive} onChange={() => handleActiveItem(massTime?._id, !massTime?.isActive)} />,
                                },
                                {
                                    header: 'Data de Cadastro',
                                    data: <ListText text={new Date(massTime.createdAt).toLocaleDateString('pt-br') || 'N/A'} />,
                                },
                                {
                                    header: 'Opções',
                                    data: (
                                        <>
                                            <Button
                                                icon={<EditOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => handleEditItem(massTime._id || '')}
                                            />
                                            <Button
                                                icon={<DeleteForeverOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => setIsOpenPopup(massTime._id || '')}
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