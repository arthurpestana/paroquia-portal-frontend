'use client'

import { List } from "@/components/adminComp/List"
import { ListContent } from "@/components/adminComp/List/ListContent"
import { ListText } from "@/components/adminComp/List/ListText"
import { NoContent } from "@/components/adminComp/NoContent"
import { PopupAlert } from "@/components/adminComp/Popup/PopupAlert"
import { ToggleButton } from "@/components/adminComp/ToggleButton"
import { Button } from "@/components/comp/Button"
import { LoadingComp } from "@/components/comp/LoadingComp"
import { deleteEvent, setActiveEvent } from "@/lib/apiServices/Mutations"
import { EventCountResponse } from "@/lib/types/QueriesTypes"
import { showToast } from "@/lib/utils/showToast"
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type EventListProps = {
    pageValue: number;
    setPageValue: (value: number) => void;
    rowsPerPage: number;
    dataEvents?: {
        loading: boolean;
        error: string | null;
        events: EventCountResponse
        refetch: () => void;
    };
}

export const EventList = ({ pageValue, setPageValue, rowsPerPage, dataEvents }: EventListProps) => {
    const searchParams = useSearchParams();
    const [isOpenPopup, setIsOpenPopup] = useState<string | boolean>('')
    const [localData, setLocalData] = useState<EventCountResponse["events"]>([]);

    useEffect(() => {
        if (dataEvents?.events?.events) {
            setLocalData(dataEvents.events?.events);
        }
    }, [dataEvents?.events?.events])

    const handleEditItem = (id: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('id', id)
        params.set('sub', 'edit')
        window.history.pushState({}, '', `?${params.toString()}`)
    }

    const handleDeleteItem = async (id: string) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'event-error', 'top-right', 'light')
            return
        }

        try {
            await deleteEvent(id)
            dataEvents?.refetch()
            showToast('Event deletado com sucesso.', 'success', 'event-error', 'top-right', 'light')
        }
        catch (error) {
            console.error('Erro ao excluir o event:', error)
            showToast('Erro ao excluir o event.', 'error', 'event-error', 'top-right', 'light')
            return
        }
    }

    const handleActiveItem = async (id: string, newActive: boolean) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'event-error', 'top-right', 'light');
            return;
        }

        try {
            await setActiveEvent(id, newActive);

            setLocalData(prev =>
                prev.map(event =>
                    event._id === id ? { ...event, isActive: newActive } : event
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar o status do event:', error);
            showToast('Erro ao atualizar o status do event.', 'error', 'event-error', 'top-right', 'light');
        }
    };

    return (
        <div>
            <PopupAlert
                title="Atenção"
                description="Você tem certeza que deseja excluir este event? Essa ação não poderá ser desfeita."
                isOpen={!!isOpenPopup}
                setOpen={setIsOpenPopup}
                onSubmit={() => handleDeleteItem(isOpenPopup as string)}
                buttonLabel={{
                    confirm: 'Confirmar',
                    cancel: 'Cancelar'
                }}
            />
            {dataEvents?.loading ? (
                <LoadingComp />
            ) : !dataEvents?.events || dataEvents?.events?.totalCount <= 0 ? (
                <NoContent
                    text="Nenhum event encontrado"
                />
            ) : (
                <List
                    pageValue={pageValue}
                    setPageValue={setPageValue}
                    totalPages={Math.ceil(dataEvents?.events?.totalCount / rowsPerPage)}
                >
                    {localData?.map((event, index) => (
                        <ListContent
                            key={event._id || index}
                            index={index}
                            listHeader={true}
                            columns={[
                                {
                                    header: '#',
                                    data: <ListText text={index + 1 + pageValue * rowsPerPage} />,
                                    mini: true,
                                },
                                {
                                    header: 'Evento',
                                    data: (
                                        <ListText text={event.title} />
                                    )
                                },
                                {
                                    header: 'Descrição',
                                    data: <ListText text={event?.description || 'N/A'} />,
                                },
                                {
                                    header: 'Localização',
                                    data: <ListText text={event?.location || 'N/A'} />,
                                },
                                {
                                    header: 'Data do Evento',
                                    data: <ListText text={new Date(event.date).toLocaleDateString('pt-br') || 'N/A'} />,
                                },
                                {
                                    header: 'Status',
                                    data: <ToggleButton value={event?.isActive} onChange={() => handleActiveItem(event?._id, !event?.isActive)} />,
                                },
                                {
                                    header: 'Data de Cadastro',
                                    data: <ListText text={new Date(event.createdAt).toLocaleDateString('pt-br') || 'N/A'} />,
                                },
                                {
                                    header: 'Opções',
                                    data: (
                                        <>
                                            <Button
                                                icon={<EditOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => handleEditItem(event._id || '')}
                                            />
                                            <Button
                                                icon={<DeleteForeverOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => setIsOpenPopup(event._id || '')}
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